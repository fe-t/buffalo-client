import { Breadcrumb } from "antd";
import React, { FC, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { ComponentPlaceholder } from "./ComponentPlaceholder";

interface Props {
  routesJson: string;
}

function itemRender(route: any, params: any, routes: any, paths: any) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type RoutesBreadcrumbProps = Props & NativeAttrs;

export const RoutesBreadcrumb: FC<RoutesBreadcrumbProps> = ({
  routesJson,
  ...props
}) => {
  if (!routesJson) {
    return <ComponentPlaceholder />;
  }
  const routes = routesJson ? JSON.parse(routesJson) : undefined;
  return <Breadcrumb itemRender={itemRender} routes={routes} {...props} />;
};
