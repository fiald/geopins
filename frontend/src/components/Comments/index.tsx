import React from "react";
//  libs
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
//  components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

interface IProps extends WithStyles<typeof styles> {
  comments: any[];
}

const Comments: React.FC<IProps> = ({ comments, classes }) => {
  return (
    <List className={classes.root}>
      {comments.map((comment, i) => (
        <ListItem key={i} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={comment.author.picture} alt={comment.author.name} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.text}
            secondary={
              <>
                <Typography
                  className={classes.inline}
                  component="span"
                  color="textPrimary"
                >
                  {comment.author.name}
                </Typography>
                . {formatDistanceToNow(Number(comment.createdAt))} ago
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: "inline"
    }
  });

export default withStyles(styles)(Comments);
