import React, { memo } from "react";
//  libs
import { Marker as MapMarker } from "react-map-gl";
import { withStyles, createStyles } from "@material-ui/core/styles";
//  components
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";
import { PinColors } from "../../pages/Map";

interface IProps {
  classes: any;
  color: PinColors;
  latitude: number;
  longitude: number;
  offsetLeft: number;
  offsetTop: number;
  onMarkerClick?: any;
  pin?: any;
}

const Marker: React.FC<IProps> = ({
  classes,
  color,
  pin,
  latitude,
  longitude,
  offsetLeft,
  offsetTop,
  onMarkerClick
}) => {
  const onClick = pin ? () => onMarkerClick(pin) : null;

  return (
    <MapMarker
      latitude={latitude}
      longitude={longitude}
      offsetLeft={offsetLeft}
      offsetTop={offsetTop}
    >
      <PlaceTwoTone
        className={pin && classes.pinIcon}
        style={{ color, fontSize: "40px" }}
        onClick={onClick}
      />
    </MapMarker>
  );
};

const styles = createStyles({
  pinIcon: {
    cursor: "pointer"
  }
});

export default withStyles(styles)(memo(Marker));
