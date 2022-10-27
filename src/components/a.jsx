import KeepAliveLayout, { useKeepOutlets, KeepAliveContext }from'@/components/KeepAliveLayout'
import { useLocation } from 'react-router-dom'
import React, { useState, useContext } from 'react'
 
// 使用KeepAliveLayout中的useKeepOutlets获取当前渲染的页面内容
const Layout = () => {
    const element = useKeepOutlets()
    return (
        {element}
    )
}
// 使用 KeepAliveLayout 包裹上下文
const App = () => {
    return (
        <KeepAliveLayout keepalive={[/./]}>
    {/* //不可能组件都缓存吧所以需要设置缓存条件，可传可缓存的路径或正则表达式
            // App */}
        </KeepAliveLayout>
    );
}
// 使用 useContext 获取 dropByCacheKey 清除缓存
const Home = () => {
    const { dropByCacheKey } = useContext(KeepAliveContext);
    const { pathname } = useLocation();
    return (
       <button onClick={() => dropByCacheKey(pathname)}>清除缓存</button>
    )
}