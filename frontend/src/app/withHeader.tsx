import React from "react";
import Header from "components/Header";

const withHeader = Component => props => (
  <>
    <Header />
    <Component {...props} />
  </>
);

export default withHeader;
