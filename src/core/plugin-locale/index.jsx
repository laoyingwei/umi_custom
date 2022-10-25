


import  { _LocaleContainer } from './locale';

import React from 'react';
export function i18nProvider (container) {
    // return <LocaleContainer>{ container } </LocaleContainer>
   return  React.createElement(_LocaleContainer,null,container)

}
