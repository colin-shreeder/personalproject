import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import Post_Form from "./Components/Post_Form.js/Post_Form";
import Community_Form from "./Components/Post_Form.js/Post_Form";
import Post from "./Components/Post/Post"


export default (
    <Switch>
      <Route component={Auth} exact path="/" />
      <Route component={Dashboard} path="/dashboard" />
      <Route component={Post_Form} path="/submit" />
      <Route component={Post} path="/post/:postid" />
      <Route component={Community_Form} path="/post/:postid" />
    </Switch>
  );