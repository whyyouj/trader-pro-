import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(7) + 1,
  },
  paper: {
    color: (props) => (props.selected ? blue[50] : blue[200]),
  },
}));

function SideMenuItem({ name, link, icon, subMenu, open }) {
  const [expand, setExpand] = useState(false);
  const { location } = useHistory();
  const classes = useStyles();

  const handleClick = () => setExpand((prevExpand) => !prevExpand);

  return (
    <>
      <MenuItemLink
        name={name}
        Icon={icon}
        to={link}
        expand={subMenu ? expand : null}
        selected={
          (!subMenu && link === location.pathname) ||
          (subMenu &&
            subMenu.some((item) => item.link === location.pathname) &&
            !expand)
        }
        onClick={subMenu && handleClick}
      />
      {subMenu && (
        <Collapse
          component="li"
          in={open && expand}
          timeout="auto"
          unmountOnExit
        >
          <MenuList>
            {subMenu.map(({ id, name, link }) => (
              <MenuItemLink
                name={name}
                to={link}
                key={id}
                className={classes.nested}
                selected={link === location.pathname}
              />
            ))}
          </MenuList>
        </Collapse>
      )}
    </>
  );
}

export default SideMenuItem;

function MenuItemLink({ to, expand, name, Icon, selected, ...other }) {
  const classes = useStyles({ selected });
  return (
    // <li>
    <MenuItem component={to && Link} selected={selected} to={to} {...other}>
      {Icon && (
        <ListItemIcon>
          <Icon className={classes.paper} />
        </ListItemIcon>
      )}
      <ListItemText
        selected={selected}
        className={classes.paper}
        primary={name}
      />
      {expand != null ? (
        expand ? (
          <ExpandLess className={classes.paper} />
        ) : (
          <ExpandMore className={classes.paper} />
        )
      ) : null}
    </MenuItem>
    // </li>
  );
}
