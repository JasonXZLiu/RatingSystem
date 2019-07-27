import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import reducers from "./reducers";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

render(
  <div>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById("root")
);
