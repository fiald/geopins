import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
//  store
import { Store } from "redux";
import { IAppState } from "./reducers";
import store from "./store";
//  helpers
import initApollo from "./helpers/initApollo";

import { ME_QUERY } from "./graphql/queries";
import { login } from "./actions";

import App from "./app";

interface IProps {
  store: Store<IAppState>;
}

const client = initApollo();

const Root: React.FC<IProps> = ({ store }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      client
        .query({ query: ME_QUERY })
        .then(res => {
          // @ts-ignore
          store.dispatch(login(res.data.me));
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
