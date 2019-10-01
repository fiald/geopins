import React from "react";
//  libs
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
//  helpers
import isEmpty from "lodash/isEmpty";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const { path } = rest;
  const isAuth = !isEmpty(user);

  const render = props => {
    if (path === "/login" && isAuth) {
      return <Redirect to="/" />;
    }
    if (path !== "/login" && !isAuth) {
      return <Redirect to="/login" />;
    }
    return <Component {...props} />;
  };

  return <Route render={render} {...rest} />;
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(PrivateRoute);
