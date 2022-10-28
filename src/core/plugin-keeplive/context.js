
 import React, { useRef, createContext, useContext } from 'react'
 import { useOutlet, useLocation, matchPath } from 'react-router-dom'
//在组件外部建立一个Context
export const KeepAliveContext = createContext({ keepalive: ['/home'], keepElements: {} })
//判断当前页面是否已缓存，是则控制hidden开关显示 ，不是则正常渲染


//给予页面缓存设置条件判断
const isKeepPath = (aliveList, path) => {
    let isKeep = false
    aliveList.map(item => {
      if (item === path) {
        isKeep = true
      }
      if (item instanceof RegExp && item.test(path)) {
        isKeep = true
      } 
    })
    return isKeep
  }
  

export function useKeepOutlets() {
    const location = useLocation()
    const element = useOutlet()
    const { keepElements, keepalive } = useContext(KeepAliveContext)
    const isKeep = isKeepPath(keepalive, location.pathname)
    if (isKeep) {
        if(keepElements.current[location.pathname]) {
           console.log('使用缓存')
           console.log(keepElements.current[location.pathname] === element )
        }else {
            keepElements.current[location.pathname] = element
        }
        
        return  <>{ keepElements.current[location.pathname] }</>
      
    }
    //标签的显示与隐藏
  //   return <> {
  //     Object.entries(keepElements.current).map(([pathname, element]) => (
  //       <div key={pathname} 
  //       style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' }}   className="rumtime-keep-alive-layout"
  //       hidden={!matchPath(location.pathname, pathname)}>
  //         {element}
  //       </div>
  //     ))
  //   }
  //     <div hidden={isKeep} style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' }} className="rumtime-keep-alive-layout-no">
  //       {!isKeep && element}
  //     </div>
  //   </>
    return <>
    {
        element
    }
    </>
  }





 
