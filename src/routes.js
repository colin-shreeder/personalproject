import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard/Dashboard";
import PostForm from "./Components/PostForm/PostForm";
import Auth from "./Components/Auth/Auth";
import CommunityForm from "./Components/CommunityForm/CommunityForm";
import Post from "./Components/Post/Post"
import PostEdit from "./Components/Post/PostEdit/PostEdit"


export default (
    <Switch>
      <Route component={Auth} exact path="/"/>
      <Route component={Dashboard} path="/dashboard" />
      <Route component={PostForm} path="/submit" />
      <Route component={Post} path="/post/:postid" />
      <Route component={CommunityForm} path="/submit_community" />
      <Route component={PostEdit} path="/post/edit/:postid"/>
    </Switch>
  );