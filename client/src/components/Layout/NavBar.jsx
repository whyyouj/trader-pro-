import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import blueGrey from "@material-ui/core/colors/blueGrey";

import UserAccountMenu from "./UserAccountMenu";

import { toggleSideMenu } from "../../actions/uiActions";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    marginLeft: 100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
  appBar: {
    boxShadow: "none",
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: blueGrey[900],
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default function NavBar({ navItems }) {
  const classes = useStyles();
  const { userAccountMenuItems, navLinks } = navItems;
  const dispatch = useDispatch();
  const sideMenuCollapsed = useSelector(
    (state) => state.uiState.sideMenuCollapsed
  );
  const handleDrawer = () => {
    dispatch(toggleSideMenu(sideMenuCollapsed));
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.title}>
        <div className={classes.nav}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={handleDrawer}
            color="inherit"
            aria-label="menu"
          >
            {sideMenuCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </div>
        <div className={classes.nav}>
          {navLinks.map((item) => (
            <Link key={item.name} className="navItem" to={item.link}>
              {item.name}
            </Link>
          ))}
          <UserAccountMenu data={userAccountMenuItems} />
        </div>
      </Toolbar>
    </AppBar>
  );
}
