import React from "react";
import { Switch, Route } from "react-router-dom";
import SettingOne from "./SettingOne";
import SettingTwo from "./SettingTwo";

function Settings() {
  return (
    <>
      <h1>Settings</h1>
      <Switch>
        <Route path="/user/settings/setting1" component={SettingOne} />
        <Route path="/user/settings/setting2" component={SettingTwo} />
      </Switch>
    </>
  );
}

export default Settings;
