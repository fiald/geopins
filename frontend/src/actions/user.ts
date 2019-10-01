//  libs
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
//  state
import { UserState } from "../reducers/user";

export enum UserActionTypes {
  LOGIN = "LOGIN"
}

export interface ILoginAction {
  type: UserActionTypes.LOGIN;
  payload: any;
}

export type UserActions = ILoginAction;

export const login: ActionCreator<
  ThunkAction<void, UserState, void, ILoginAction>
> = user => async (dispatch: Dispatch) => {
  try {
    dispatch({
      payload: user,
      type: UserActionTypes.LOGIN
    });
  } catch (err) {
    // @ts-ignore
    onFailureLogin(err)(dispatch);
  }
};

// export const onSuccessLogin: ActionCreator<
//   ThunkAction<void, UserState, void, ILoginAction>
// > = googleUser => async (dispatch: Dispatch) => {
//   try {
//     const idToken = googleUser.getAuthResponse().id_token;
//     const client = new GraphQLClient(BASE_URL, {
//       headers: { authorization: idToken }
//     });
//     const { me } = await client.request(ME_QUERY);
//     dispatch({
//       payload: { ...me, isAuth: googleUser.isSignedIn() },
//       type: UserActionTypes.LOGIN
//     });
//   } catch (err) {
//     // @ts-ignore
//     onFailureLogin(err)(dispatch);
//   }
// };

export const onFailureLogin: ActionCreator<
  ThunkAction<void, UserState, void, ILoginAction>
> = err => (dispatch: Dispatch) => {
  console.error("Error logging in", err);
  dispatch({
    payload: {},
    type: UserActionTypes.LOGIN
  });
};

export const signout: ActionCreator<
  ThunkAction<void, UserState, void, ILoginAction>
> = () => (dispatch: Dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    payload: {},
    type: UserActionTypes.LOGIN
  });
};
