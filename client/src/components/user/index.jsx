import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import toastify from "../../utils/toastNotification";

// Components
import Dashboard from "./Dashboard";
import Options from "./options";
import Settings from "./settings";

// Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Dehaze from "@material-ui/icons/Dehaze";
import SettingsIcon from "@material-ui/icons/Settings";

// Layout
import Layout from "../Layout";

const navItems = {
  userAccountMenuItems: [
    {
      name: "Profile",
      link: "/user/profile",
    },
    {
      name: "Account",
      link: "/user/account",
    },
  ],
  navLinks: [
    {
      name: "Link One",
      link: "/user/link1",
    },
    {
      name: "Link Two",
      link: "/user/link2",
    },
  ],
};

const sideMenuItems = [
  { id: 1, name: "Dashboard", icon: DashboardIcon, link: "/user/dashboard" },
  {
    id: 2,
    name: "Options",
    icon: Dehaze,
    subMenu: [
      { id: 1, name: "Option One", link: "/user/options/option1" },
      { id: 2, name: "Option Two", link: "/user/options/option2" },
    ],
  },
  {
    id: 3,
    name: "Settings",
    icon: SettingsIcon,
    subMenu: [
      { id: 1, name: "Setting 1", link: "/user/settings/setting1" },
      { id: 2, name: "Setting 2", link: "/user/settings/setting2" },
      { id: 3, name: "Setting 3", link: "/user/settings/setting3" },
    ],
  },
];

export default function () {
  const emailConfirmationMessage = localStorage.getItem("email"); // It was set in ConfirmEmail component while confirming email through link
  useEffect(
    () => {
      if (emailConfirmationMessage) {
        toastify(emailConfirmationMessage, "success");
        localStorage.removeItem("email");
      }
    },
    // eslint-disable-next-line
    []
  );
  return (
    <Layout navItems={navItems} menuItems={sideMenuItems}>
      <Switch>
        <Route path="/user/dashboard" component={Dashboard} />
        <Route path="/user/options" component={Options} />
        <Route path="/user/settings" component={Settings} />
        <Redirect from="/user" to="/user/dashboard" />
      </Switch>
    </Layout>
  );
}
