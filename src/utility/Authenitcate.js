import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../service/token-service";

const Authenticate = ({ component, ...props }) => {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: componentProps.location },
            }}
          />
        )
      }
    />
  );
};

export default Authenticate;
