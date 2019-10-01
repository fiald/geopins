import React from "react";
//  libs
import { connect } from "react-redux";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
//  components
import { Paper } from "@material-ui/core";
import NoContent from "./NoContent";
import CreatePin from "./CreatePin";
import PinContent from "./PinContent";
//  types
import { Pin } from "../../types";

interface IProps extends WithStyles<typeof styles> {
  currentPin: Pin;
}

const Blog: React.FC<IProps> = ({ currentPin, classes }) => {
  const mobileSize = useMediaQuery("(max-width: 650px)");

  let BlogContent;
  if (!currentPin) {
    BlogContent = NoContent;
  } else if (currentPin.isNewPin) {
    BlogContent = CreatePin;
  } else {
    BlogContent = PinContent;
  }

  return (
    <Paper className={mobileSize ? classes.rootMobile : classes.root}>
      <BlogContent pin={currentPin} />
    </Paper>
  );
};

const styles = createStyles({
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center"
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
});

const mapStateToProps = ({ currentPin }) => ({
  currentPin
});

export default connect(mapStateToProps)(withStyles(styles)(Blog));
