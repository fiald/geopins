import React, { useState } from "react";
//  libs
import axios from "axios";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useMutation } from "@apollo/react-hooks";
//  components
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
//  graphql
import { CREATE_PIN_MUTATION } from "../../graphql/mutations";
//  types
import { Pin } from "../../types";

interface IProps extends WithStyles<typeof styles> {
  pin: Pin;
}

const CreatePin: React.FC<IProps> = ({ pin, classes }) => {
  const mobileSize = useMediaQuery("max-width: 650px");
  const [createPin, { error }] = useMutation(CREATE_PIN_MUTATION);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const url = await handleImageUpload();
    const { latitude, longitude } = pin;
    const variables = { title, content, latitude, longitude, image: url };
    createPin({ variables });
    setSubmitting(false);
    handleDeleteDraft();
  };

  const handleDeleteDraft = () => {
    setTitle("");
    setImage("");
    setContent("");
    // dispatch({ type: 'DELETE_DRAFT' });
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "geopins");
    data.append("cloud_name", "dy1xqx0vf");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dy1xqx0vf/image/upload",
      data
    );
    return res.data.url;
  };

  const handleSetTitle = e => setTitle(e.target.value);
  const handleSetImage = e => setImage(e.target.files[0]);
  const handleSetContent = e => setContent(e.target.value);

  if (error) {
    console.error("Error creating pin", error);
  }

  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
        <LandscapeIcon className={classes.iconLarge} /> Pin location
      </Typography>
      <div>
        <TextField
          value={title}
          name="title"
          label="Title"
          placeholder="Insert pin title"
          onChange={handleSetTitle}
        />
        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={handleSetImage}
        />
        <label htmlFor="image">
          <Button
            style={{ color: image && "green" }}
            component="span"
            size="small"
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField
          value={content}
          name="content"
          label="Content"
          multiline={true}
          rows={mobileSize ? "3" : "6"}
          margin="normal"
          fullWidth={true}
          variant="outlined"
          onChange={handleSetContent}
        />
      </div>
      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleDeleteDraft}
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="secondary"
          disabled={!title.trim() || !content.trim() || !image || submitting}
          onClick={handleSubmit}
        >
          Submit
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingBottom: theme.spacing(1)
    },
    contentField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "95%"
    },
    input: {
      display: "none"
    },
    alignCenter: {
      display: "flex",
      alignItems: "center"
    },
    iconLarge: {
      fontSize: 40,
      marginRight: theme.spacing(1)
    },
    leftIcon: {
      fontSize: 20,
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      fontSize: 20,
      marginLeft: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(1),
      marginLeft: 0
    }
  });

export default withStyles(styles)(CreatePin);
