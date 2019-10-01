import React from "react";
//  libs
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import format from "date-fns/format";
//  components
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
import Face from "@material-ui/icons/Face";
import Comments from "../Comments";
import CreateCommentForm from "../CreateCommentForm";
//  types
import { Pin } from "../../types";

interface IProps extends WithStyles<typeof styles> {
  pin: Pin;
}

const PinContent: React.FC<IProps> = ({ pin, classes }) => {
  const { title, content, author, createdAt, comments } = pin;
  return (
    <div className={classes.root}>
      <Typography
        component="h2"
        variant="h4"
        color="primary"
        gutterBottom={true}
      >
        {title}
      </Typography>
      <Typography
        component="h3"
        variant="h6"
        color="inherit"
        gutterBottom={true}
        className={classes.text}
      >
        <Face className={classes.icon} /> {author.name}
      </Typography>
      <Typography
        className={classes.text}
        variant="subtitle2"
        color="inherit"
        gutterBottom={true}
      >
        <AccessTime className={classes.icon} />
        {format(Number(createdAt), "MMM Do, yyyy")}
      </Typography>
      <Typography variant="subtitle1" gutterBottom={true}>
        {content}
      </Typography>

      <CreateCommentForm />
      <Comments comments={comments} />
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: "1em 0.5em",
      textAlign: "center",
      width: "100%"
    },
    icon: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    text: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  });

export default withStyles(styles)(PinContent);
