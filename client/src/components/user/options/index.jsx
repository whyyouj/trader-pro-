import React from "react";
import { Switch, Route } from "react-router-dom";
import OptionOne from "./OptionOne";
import OptionTwo from "./OprionTwo";

function ManageUsers() {
  return (
    <>
      <h1>Options</h1>
      <Switch>
        <Route path="/user/options/option1" component={OptionOne} />
        <Route path="/user/options/option2" component={OptionTwo} />
      </Switch>
    </>
  );
}

export default ManageUsers;
