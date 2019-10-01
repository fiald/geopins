import { combineReducers } from "redux";
//  reducers
import user, { UserState } from "./user";
import currentPin, { CurrentPinState } from "./pin";

export interface IAppState {
  user: UserState;
  currentPin: CurrentPinState;
}

export default combineReducers<IAppState, any>({
  user,
  currentPin
});
