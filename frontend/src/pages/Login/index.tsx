import React from "react";
//  libs
import { connect } from "react-redux";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import { useLazyQuery } from "@apollo/react-hooks";
//  components
import Typography from "@material-ui/core/Typography";
import { GoogleLogin } from "react-google-login";
//  graphql
import { ME_QUERY } from "../../graphql/queries";
//  actions
import { login, signout } from "../../actions";

interface IProps extends WithStyles<typeof styles> {
  login: typeof login;
  signout: typeof signout;
}

const Login: React.FC<IProps> = ({ classes, login, signout }) => {
  const [getUserInfo, { error }] = useLazyQuery(ME_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: ({ me }) => {
      login(me);
    }
  });

  const onSuccess = async googleUser => {
    const token = await googleUser.getAuthResponse().id_token;
    localStorage.setItem("token", token);
    getUserInfo();
  };

  const onFailure = err => {
    console.error("Error logging in", err);
    signout();
  };

  if (error) {
    onFailure(error);
  }

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom={true}
        noWrap={true}
        style={{ color: "rgb(66, 133, 244)" }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId="447122502888-qval3e3m90d6htigfe441ugsg7j42htg.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Login with Google"
        theme="dark"
      />
    </div>
  );
};

const styles = createStyles({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
});

export default connect(
  null,
  { login, signout }
)(withStyles(styles)(Login));
