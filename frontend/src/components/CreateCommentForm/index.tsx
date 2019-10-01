import React, { useState, ChangeEvent } from "react";
//  libs
import { connect } from "react-redux";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
//  components
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import Divider from "@material-ui/core/Divider";
//  types
import { Pin } from "../../types";

interface IProps extends WithStyles<typeof styles> {
  currentPin: Pin;
}

const CreateCommentForm: React.FC<IProps> = ({ currentPin, classes }) => {
  const [value, setValue] = useState("");

  const handleClearCommentValue = () => setValue("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <>
      <form className={classes.form}>
        <IconButton
          onClick={handleClearCommentValue}
          disabled={!value.trim()}
          className={classes.clearButton}
        >
          <ClearIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          multiline={true}
          placeholder="Add comment"
          value={value}
          onChange={handleChange}
        />
        <IconButton
          // onClick={handleSubmitComment}
          className={classes.sendButton}
          disabled={!value.trim()}
        >
          <SendIcon />
        </IconButton>
      </form>
      <Divider />
    </>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      alignItems: "center"
    },
    input: {
      marginLeft: 8,
      flex: 1
    },
    clearButton: {
      padding: 0,
      color: "red"
    },
    sendButton: {
      padding: 0,
      color: theme.palette.secondary.dark
    }
  });

const mapStateToProps = ({ currentPin }) => ({
  currentPin
});

export default connect(mapStateToProps)(withStyles(styles)(CreateCommentForm));
