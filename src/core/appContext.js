
import React from "react";
export const AppContext = /*#__PURE__*/React.createContext({});
import { useRouteData } from './routeContext'
export function useAppData() {
  return React.useContext(AppContext);
}

export function useClientLoaderData () {
   const appData = useAppData()
   const route = useRouteData()
   return { data: appData.clientLoaderData[route.route.id] }
}



