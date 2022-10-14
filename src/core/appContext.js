
import React from "react";
export const AppContext = /*#__PURE__*/React.createContext({});
export function useAppData() {
  return React.useContext(AppContext);
}