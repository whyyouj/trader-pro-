import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuList from "@material-ui/core/MenuList";
import SideMenuItem from "./SideMenuItem";

const CustomizedDrawer = withStyles({
  paper: {
    position: "relative",
    backgroundColor: "#222943",
  },
})(Drawer);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 2,
    [theme.breakpoints.down("sm")]: {
      width: 0,
    },
  },
}));

function SideMenu({ menuItems }) {
  const classes = useStyles();
  const collapsed = useSelector((state) => state.uiState.sideMenuCollapsed);

  return (
    <CustomizedDrawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: !collapsed,
        [classes.drawerClose]: collapsed,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: !collapsed,
          [classes.drawerClose]: collapsed,
        }),
      }}
    >
      <MenuList>
        {menuItems.map(({ id, ...rest }) => (
          <SideMenuItem key={id} open={!collapsed} {...rest} />
        ))}
      </MenuList>
    </CustomizedDrawer>
  );
}

export default SideMenu;
