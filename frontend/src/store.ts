import { createStore, applyMiddleware, compose, Store } from "redux";

import thunk from "redux-thunk";

import rootReducer, { IAppState } from "./reducers";

const middleware = [thunk];

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const actionSanitizer = (action: any) =>
  action.type === "FILE_DOWNLOAD_SUCCESS" && action.data
    ? { ...action, data: "<<LONG_BLOB>>" }
    : action;

const devExtension =
  window.navigator.userAgent.includes("Chrome") &&
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({
        actionSanitizer,
        stateSanitizer: (state: any) =>
          state.data ? { ...state, data: "<<LONG_BLOB>>" } : state,
        serialize: {
          options: {
            undefined: true
          }
        }
      })
    : compose;

const createGlobalStore = (): Store<IAppState> => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(...middleware),
      devExtension
    )
  );
};

export default createGlobalStore();
