import React from "react";
import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router } from "react-router-dom";
import { ModalSwitch } from "./widgets/ModalSwitch";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Toaster position="top-center" />
        <ModalSwitch />
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
