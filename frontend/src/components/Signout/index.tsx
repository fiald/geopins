import React from "react";
//  libs
import { connect } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogout } from "react-google-login";
//  components
import Typography from "@material-ui/core/Typography";
import ExitToApp from "@material-ui/icons/ExitToApp";
//  actions
import { signout } from "../../actions";

const Signout = ({ signout, classes }) => {
  const mobileSize = useMediaQuery("(max-width: 650px)");

  const onSignout = () => signout();

  const googleLoginComponent = ({ onClick }) => (
    <span onClick={onClick} className={classes.root}>
      <Typography
        variant="body1"
        className={classes.buttonText}
        style={{ display: mobileSize ? "none" : "block" }}
      >
        Signout
      </Typography>
      <ExitToApp className={classes.buttonIcon} />
    </span>
  );

  return (
    <GoogleLogout
      clientId="447122502888-qval3e3m90d6htigfe441ugsg7j42htg.apps.googleusercontent.com"
      onLogoutSuccess={onSignout}
      render={googleLoginComponent}
    />
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
};

export default connect(
  null,
  { signout }
)(withStyles(styles)(Signout));
