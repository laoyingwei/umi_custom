import React from "react";

export const RouteContext = /*#__PURE__*/React.createContext({});

export function useRouteData() {
    return React.useContext(RouteContext);
}