import React from "react";
import { Route, useLocation } from "react-router";
import { Redirect, Switch } from "react-router-dom";
import { routes } from "../routes";
import { withModal } from "./withModal";

export const ModalSwitch = () => {
  // ModalSwitch 实现原理：https://reactrouter.com/web/example/modal-gallery
  const location = useLocation<{ background?: Location }>();
  const background = location.state?.background;

  return (
    <>
      <Switch location={(background as any) || location}>
        {routes.map((item, index) => (
          <Route
            exact={true}
            path={item.path}
            component={item.component}
            key={index}
          />
        ))}

        <Redirect from="/" to={routes[0].path} />
      </Switch>
      {background && (
        <>
          {routes
            .filter((r) => r.meta?.modal)
            .map((r, i) => (
              <Route
                exact={true}
                path={r.path}
                component={withModal(r.component)}
                key={`${i}-modal-route`}
              />
            ))}
        </>
      )}
    </>
  );
};
