
import React from 'react';
// export const AccessContext = React.createContext({});
export const LocaleContext = /*#__PURE__*/React.createContext({});


export const useLocalData = () => {
    return React.useContext(LocaleContext)
}


