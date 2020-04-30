import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import StoreContext from "./store/context";
import store from "./store/store";
import userLocale, { translations } from "./locale/userLocale";
const messages = translations[userLocale];

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <IntlProvider locale={userLocale} messages={messages}>
      <App />
    </IntlProvider>
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
