import React from "react";
import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./index.scss";
import Editor from "./pages/Editor";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" />
      <Editor />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
