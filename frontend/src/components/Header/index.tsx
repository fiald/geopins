import React from "react";
//  libs
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
//  components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Map from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";
import Signout from "../Signout";

const Header = ({ user, classes }) => {
  const mobileSize = useMediaQuery("(max-width: 650px)");

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow}>
            <Map className={classes.icon} />
            <Typography
              className={mobileSize ? classes.mobile : ""}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap={true}
            >
              GeoPin
            </Typography>
          </div>
          {user && (
            <div className={classes.grow}>
              <img
                className={classes.picture}
                src={user.picture}
                alt={user.name}
              />
              <Typography
                className={mobileSize ? classes.mobile : ""}
                variant="h5"
                color="inherit"
                noWrap={true}
              >
                {user.name}
              </Typography>
            </div>
          )}
          <Signout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(1),
    color: "green",
    fontSize: 45
  },
  mobile: {
    display: "none"
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing(2)
  }
});

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(withStyles(styles)(Header));
