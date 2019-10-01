//  libs
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
//  state
import pin, { CurrentPinState } from "../reducers/pin";

export enum PinActionTypes {
  SET_CURRENT_PIN = "SET_CURRENT_PIN",
  UPDATE_PIN_LOCATION = "UPDATE_PIN_LOCATION"
  // DELETE_PIN = "DELETE_PIN"
}

export interface ISetCurrentPinAction {
  type: PinActionTypes.SET_CURRENT_PIN;
  payload: any;
}

export interface IUpdatePinLocationAction {
  type: PinActionTypes.UPDATE_PIN_LOCATION;
  payload: {
    longitude: number;
    latitude: number;
  };
}

export type PinActions = ISetCurrentPinAction | IUpdatePinLocationAction;

export const setCurrentPin: ActionCreator<
  ThunkAction<void, CurrentPinState, void, ISetCurrentPinAction>
> = pin => async (dispatch: Dispatch) => {
  dispatch({
    payload: pin,
    type: PinActionTypes.SET_CURRENT_PIN
  });
};

export const updatePinLocation: ActionCreator<
  ThunkAction<void, CurrentPinState, void, ISetCurrentPinAction>
> = location => async (dispatch: Dispatch) => {
  dispatch({
    payload: location,
    type: PinActionTypes.UPDATE_PIN_LOCATION
  });
};

// export const deletePin: ActionCreator<
//   ThunkAction<void, CurrentPinState, void, ISetCurrentPinAction>
// > = pin => async (dispatch: Dispatch) => {
//   dispatch({
//     payload: pin.id,
//     type: PinActionTypes.DELETE_PIN
//   });
// };
