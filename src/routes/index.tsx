import React from "react";
import Editor from "../pages/Editor";
import { Home } from "../pages/Home";

export interface RoutesItem {
  title: string;
  component: typeof React.Component | React.FC;
  path: string;
  search?: any;
  meta?: {
    modal: boolean;
  };
}

export const routes: RoutesItem[] = [
  {
    title: "编辑器",
    component: Editor,
    path: "/editor",
  },
  {
    title: "首页",
    component: Home,
    path: "/",
  },
];
