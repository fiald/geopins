import React from "react";
//  libs
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
//  components
import Explore from "@material-ui/icons/Explore";
import Typography from "@material-ui/core/Typography";

interface IProps extends WithStyles<typeof styles> {}

const NoContent: React.FC<IProps> = ({ classes }) => (
  <div className={classes.root}>
    <Explore className={classes.icon} />
    <Typography
      noWrap={true}
      component="h2"
      variant="h6"
      align="center"
      color="textPrimary"
      gutterBottom={true}
    >
      Click on the map to add a pin.
    </Typography>
  </div>
);

const styles = theme =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center"
    },
    icon: {
      margin: theme.spacing(1),
      fontSize: "80px"
    }
  });

export default withStyles(styles)(NoContent);
