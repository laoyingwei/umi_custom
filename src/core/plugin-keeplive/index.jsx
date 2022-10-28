
import React from 'react'
import { KeepAliveContext } from './context';
export const keepAliveProvider = (props) => { 
  const { keepalive, ...other } = props
const keepElements = React.useRef({}) 

  function dropByCacheKey(path) { 
    keepElements.current[path] = null
  } 
return <KeepAliveContext.Provider 
    value={{ keepalive, keepElements, dropByCacheKey }}
    {...other}
      >
        {
            props.children
        }
      </KeepAliveContext.Provider>
}