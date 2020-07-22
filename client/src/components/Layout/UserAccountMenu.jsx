import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MaterialLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    textDecoration: "none",
    color: "#263238",
    fontWeight: "bold",
  },
});

function UserAccountMenu({ data }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {data.map((item) => (
          <MenuItem key={item.name} onClick={handleClose}>
            <Link className={classes.root} to={item.link}>
              {item.name}
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleClose}>
          <MaterialLink
            className={classes.root}
            underline="none"
            href="/logout"
          >
            Logout
          </MaterialLink>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserAccountMenu;
