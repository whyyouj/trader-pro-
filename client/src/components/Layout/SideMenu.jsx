import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuList from "@material-ui/core/MenuList";
import SideMenuItem from "./SideMenuItem";
import blueGrey from "@material-ui/core/colors/blueGrey";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { toggleSideMenu } from "../../actions/uiActions";

const CustomizedDrawer = withStyles((theme) => ({
  paper: {
    [theme.breakpoints.up("sm")]: {
      position: "relative",
    },
    backgroundColor: blueGrey[50],
    border: "none",
  },
  paperAnchorLeft: {
    boxShadow: [[0, 2, 10, "#0000004d"]],
  },
}))(Drawer);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    zIndex: theme.zIndex.appBar + 1,
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
    // overflowX: "hidden",
    width: theme.spacing(8) + 2,
  },
}));

function SideMenu({ menuItems }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.uiState.sideMenuCollapsed);

  const closeDrawer = () => (event) => {
    if (event.key === "Tab" || event.key === "Shift") {
      return;
    }

    dispatch(toggleSideMenu(collapsed));
  };

  return (
    <CustomizedDrawer
      variant={matches ? "temporary" : "permanent"}
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
      open={!collapsed}
      onClose={closeDrawer(true)}
    >
      <MenuList>
        {menuItems.map(({ id, ...rest }) => (
          <SideMenuItem
            key={id}
            open={!collapsed}
            isSmallScreen={matches}
            {...rest}
          />
        ))}
      </MenuList>
    </CustomizedDrawer>
  );
}

export default SideMenu;
