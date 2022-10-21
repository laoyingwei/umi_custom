

import React from 'react';
import { routeConfig } from '/.umi.js'
export async function getRoutes() {
  const routes = {}
  const routeComponents = {}
  const rotueList = []
  function getRoute (routeConfig,parentId) {
    routeConfig.forEach((route,index) => {
      const { children } = route
      rotueList.push({
        ...route,
        parentId
      })
      if(children && children.length) {
        getRoute(children,route.name)
      }
  });
  }
  getRoute(routeConfig)
  console.log(rotueList)
  rotueList.forEach((route,index) => {
     const { isLayout,name,file,path,parentId,component ,auth} = route

      if(isLayout) {
        routes[name] = {
          auth,
          file,
          name,
          id: name,
          path,
          parentId
        }
        routeComponents[name] = component
      }else {
        routes[index] = {
          auth,
          file,
          name,
          id: index,
          path,
          parentId
        } 
        routeComponents[index] = component
      }

  })
  return {
    routes,
    routeComponents
    // routes: { 
    //   "1": { "path": "/", "redirect": "/home", "parentId": "@@/global-layout", "id": "1" },
    //   "2": { "name": "首页", "path": "/home", "file": "@/pages/Home/index.jsx", "parentId": "@@/global-layout", "id": "2" }, 
    //   "3": { "name": "权限演示", "path": "/access", "file": "@/pages/Access/index.jsx", "parentId": "@@/global-layout", "id": "3" },
    //   "4": { "name": " CRUD 示例", "path": "/table", "file": "@/pages/Table/index.jsx", "parentId": "@@/global-layout", "id": "4" }, 
    //   "5": { "path": "/", "file": "@/layouts/index.jsx", "parentId": "@@/global-layout", "id": "5" },
    //   "6": { "path": "/list", "file": "@/pages/list/index.jsx", "parentId": "@@/global-layout", "id": "6" },
    //   "@@/global-layout": { "id": "@../EmptyRouteout", "path": "/", "file": "@/layouts/index.jsx", "parentId": "ant-design-pro-layout", "isLayout": true },
    //   "ant-design-pro-layout": { "id": "ant-design-pro-layout", "path": "/", "file": "@/core/ant-design-pro-layout/ant-design-pro-layout.jsx", "isLayout": true } },
    // routeComponents: {
    //   '1': React.lazy(() => import('./EmptyRoute')),
    //   '2': React.lazy(() => import(/* webpackChunkName: "p__Home__index" */'@/pages/Home/index.jsx')),
    //   '3': React.lazy(() => import(/* webpackChunkName: "p__Access__index" */'@/pages/Access/index.jsx')),
    //   '4': React.lazy(() => import(/* webpackChunkName: "p__Table__index" */'@/pages/Table/index.jsx')),
    //   '5': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.jsx')),
    //   '6': React.lazy(() => import(/* webpackChunkName: "p__list__index" */'@/pages/list/index.jsx')),
    //   '@@/global-layout': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.jsx')),
    //   'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: ".umi__plugin-layout__Layout" */'@/core/ant-design-pro-layout/ant-design-pro-layout.jsx')),
    // },
  };
}