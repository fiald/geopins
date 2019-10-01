import React from "react";
//  libs
import { Switch } from "react-router-dom";
//  pages
import Login from "../pages/Login";
import Map from "../pages/Map";
//  components
import PrivateRoute from "../components/PrivateRoute";
//  HOCS
import withRootTheme from "./withRootTheme";
import withHeader from "./withHeader";
const MapPage = withHeader(Map);

const App = () => {
  return (
    <Switch>
      <PrivateRoute path="/login" component={Login} />
      <PrivateRoute exact={true} path="/" component={MapPage} />
    </Switch>
  );
};

export default withRootTheme(App);
