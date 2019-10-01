import { Reducer } from "redux";
//  types
import { PinActions, PinActionTypes } from "../actions";
import { Pin } from "../types";

export type CurrentPinState = Pin | null;

const initialState: CurrentPinState = null;

const currentPin: Reducer<CurrentPinState, PinActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PinActionTypes.SET_CURRENT_PIN:
      if (action.payload && action.payload.isNewPin) {
        return {
          ...state,
          isNewPin: true,
          latitude: 0,
          longitude: 0
        };
      }
      return action.payload;
    case PinActionTypes.UPDATE_PIN_LOCATION:
      return { ...action.payload, isNewPin: true };
    default:
      return state;
  }
};

export default currentPin;
