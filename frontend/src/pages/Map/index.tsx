import React, { useState, useEffect, useCallback } from "react";
//  libs
import { connect } from "react-redux";
import ReactMapGL, { NavigationControl, Popup } from "react-map-gl";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import differenceInMinutes from "date-fns/differenceInMinutes";
//  components
import Blog from "../../components/Blog";
import Marker from "../../components/Marker";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
//  graphql
import { GET_PINS_QUERY } from "../../graphql/queries";
import { DELETE_PIN_MUTATION } from "../../graphql/mutations";
import {
  PIN_ADDED_SUBSCRIPTION,
  PIN_UPDATED_SUBSCRIPTION,
  PIN_DELETED_SUBSCRIPTION
} from "../../graphql/subscriptions";
//  actions
import { setCurrentPin, updatePinLocation } from "../../actions";
//  utils
import get from "lodash/get";
//  types
import { Pin, User } from "../../types";

import "mapbox-gl/dist/mapbox-gl.css";

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
};

export enum PinColors {
  limegreen = "limegreen",
  darkblue = "darkblue",
  red = "red",
  hotpink = "hotpink"
}

interface IProps extends WithStyles<typeof styles> {
  user: User;
  currentPin: Pin;
  setCurrentPin: typeof setCurrentPin;
  updatePinLocation: typeof updatePinLocation;
}

const Map: React.FC<IProps> = ({
  user,
  currentPin,
  setCurrentPin,
  updatePinLocation,
  classes
}) => {
  const mobileSize = useMediaQuery("(max-width: 650px)");
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);
  const [isPopupOpen, setPopupState] = useState(false);

  const [deletePin] = useMutation(DELETE_PIN_MUTATION);
  const { loading, data, refetch } = useQuery(GET_PINS_QUERY);

  useSubscription(PIN_DELETED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { pinDeleted } = subscriptionData.data;
      console.log("pinDeleted", pinDeleted);
      refetch();
    }
  });

  useSubscription(PIN_ADDED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { pinAdded } = subscriptionData.data;
      console.log("pinAdded", pinAdded);
      refetch();
    }
  });

  const isNewPin = get(currentPin, "isNewPin", false);

  useEffect(() => {
    getUserPosition();
  }, []);

  const highlightNewPin = pin => {
    const isNewPin =
      differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;
    return isNewPin ? PinColors.limegreen : PinColors.darkblue;
  };

  const handleSelectPin = useCallback(pin => {
    setCurrentPin(pin);
    setPopupState(true);
  }, []);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const handleMapClick = ({ lngLat, leftButton }) => {
    handleClosePopup();

    if (!leftButton) return;
    if (!isNewPin) {
      setCurrentPin({ isNewPin: true });
    }
    const [longitude, latitude] = lngLat;
    updatePinLocation({ longitude, latitude });
  };

  const handleDeletePin = () => {
    const variables = { pinId: currentPin._id };
    deletePin({ variables });
    handleClosePopup();
    setCurrentPin(null);
    console.log("delete", currentPin);
  };

  const handleClosePopup = () => {
    setPopupState(false);
  };

  const isAuthorCurrentUser = () => user._id === currentPin.author._id;

  const onViewportChange = newViewport => setViewport(newViewport);
  const pins = get(data, "getPins", []);
  console.log("Map render");

  return (
    <div className={mobileSize ? classes.rootMobile : classes.root}>
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiZmlhbGQiLCJhIjoiY2p6aTkyNnZvMDZsMzNtbzhjeXFpanB1dSJ9.jWmEzVGtQAB24YaZ_YFpbg"
        onViewportChange={onViewportChange}
        onClick={handleMapClick}
        scrollZoom={!mobileSize}
      >
        <div className={classes.navigationControl}>
          <NavigationControl onViewportChange={onViewportChange} />
        </div>
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
            color={PinColors.red}
          />
        )}
        {isNewPin && (
          <Marker
            latitude={currentPin.latitude}
            longitude={currentPin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
            color={PinColors.hotpink}
          />
        )}
        {/* Created pin */}
        {!loading &&
          pins.map(pin => (
            <Marker
              key={pin._id}
              pin={pin}
              latitude={pin.latitude}
              longitude={pin.longitude}
              offsetLeft={-19}
              offsetTop={-37}
              color={highlightNewPin(pin)}
              onMarkerClick={handleSelectPin}
            />
          ))}
        {isPopupOpen && (
          <Popup
            anchor="top"
            latitude={currentPin.latitude}
            longitude={currentPin.longitude}
            closeOnClick={false}
            onClose={handleClosePopup}
          >
            <img
              className={classes.popupImage}
              src={currentPin.image}
              alt={currentPin.title}
            />
            <div className={classes.popupTab}>
              <Typography>
                {currentPin.latitude.toFixed(6)},{" "}
                {currentPin.longitude.toFixed(6)}
              </Typography>
              {isAuthorCurrentUser() && (
                <Button onClick={handleDeletePin}>
                  <DeleteIcon className={classes.deleteIcon} />
                </Button>
              )}
            </div>
          </Popup>
        )}
      </ReactMapGL>

      <Blog />
    </div>
  );
};

const styles = createStyles({
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});

const mapStateToProps = ({ user, currentPin }) => ({
  user,
  currentPin
});

export default connect(
  mapStateToProps,
  { setCurrentPin, updatePinLocation }
)(withStyles(styles)(Map));
