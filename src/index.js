import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducers from "./reducers";

import Root from "./view";
import LoadInitialFileSystem from "./utils/initalFileSystem";

let loadData = {
  FileSystem:
    localStorage.getItem("FileSystem") &&
    Object.keys(localStorage.getItem("FileSystem")).length > 0
      ? JSON.parse(localStorage.getItem("FileSystem"))
      : LoadInitialFileSystem()
};

ReactDOM.render(
  <Provider store={createStore(Reducers, loadData)}>
    <BrowserRouter>
      <Route path="/" component={Root} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
