import { Breadcrumb, Typography } from "antd";
import React, { FC, HTMLAttributes } from "react";
import { ComponentPlaceholder } from "./ComponentPlaceholder";

interface Props {
  routesJson: string;
}

const Link = Typography.Link;

function itemRender(route: any, params: any, routes: any, paths: any) {
  const last = routes.indexOf(route) === routes.length - 1;

  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link
      onClick={(e) => {
        e.preventDefault();
        window.location.href = route.path;
        window.location.reload();
      }}
    >
      {route.breadcrumbName}
    </Link>
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
