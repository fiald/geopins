import { Reducer } from "redux";
import { UserActions, UserActionTypes } from "../actions";

export type UserState = {};

const initialState: UserState = {};

const user: Reducer<UserState, UserActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return action.payload;
    default:
      return state;
  }
};

export default user;
