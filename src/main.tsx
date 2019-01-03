import React from "react";
import RDom from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/App";
import { reducer } from "./redux/state";

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");
  const store = createStore(reducer);

  RDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root,
  );
});
