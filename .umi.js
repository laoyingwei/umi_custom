// '1': React.lazy(() => import('./EmptyRoute')),
// '2': React.lazy(() => import(/* webpackChunkName: "p__Home__index" */'@/pages/Home/index.jsx')),
// '3': React.lazy(() => import(/* webpackChunkName: "p__Access__index" */'@/pages/Access/index.jsx')),
// '4': React.lazy(() => import(/* webpackChunkName: "p__Table__index" */'@/pages/Table/index.jsx')),
// '5': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.jsx')),
// '6': React.lazy(() => import(/* webpackChunkName: "p__list__index" */'@/pages/list/index.jsx')),


// "1": { "path": "/", "redirect": "/home", "parentId": "@@/global-layout", "id": "1" },
// "2": { "name": "首页", "path": "/home", "file": "@/pages/Home/index.jsx", "parentId": "@@/global-layout", "id": "2" }, 
// "3": { "name": "权限演示", "path": "/access", "file": "@/pages/Access/index.jsx", "parentId": "@@/global-layout", "id": "3" },
// "4": { "name": " CRUD 示例", "path": "/table", "file": "@/pages/Table/index.jsx", "parentId": "@@/global-layout", "id": "4" }, 
// "5": { "path": "/", "file": "@/layouts/index.jsx", "parentId": "@@/global-layout", "id": "5" },
// "6": { "path": "/list", "file": "@/pages/list/index.jsx", "parentId": "@@/global-layout", "id": "6" },
// "@@/global-layout": { "id": "@@/global-layout", "path": "/", "file": "@/layouts/index.jsx", "parentId": "ant-design-pro-layout", "isLayout": true },
import React from 'react'
export const routeConfig =[
        {
            name:'ant-design-pro-layout',
            component: React.lazy(() => import(/* webpackChunkName: ".umi__plugin-layout__Layout" */'@/core/ant-design-pro-layout/ant-design-pro-layout.jsx')),
            // file:'@/core/ant-design-pro-layout/ant-design-pro-layout.jsx',
            path:'/',
            "isLayout": true,
            auth:false,
            children: [
                {
                    name:'@@/global-layout',
                    component:React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.jsx')),
                    // file:'@/layouts/index.jsx',
                    "isLayout": true,
                    auth:false,
                    path:"/",
                    children:[
                        {
                            path:'/',
                            redirect:'/home',
                            component: React.lazy(() => import('@/EmptyRoute.jsx')),
                            // file:'@/EmptyRoute.jsx',
                            auth:false,
                        },
                        {
                            path:'/home',
                            component: React.lazy(() => import(/* webpackChunkName: "p__Home__index" */'@/pages/Home/index.jsx')),
                            // file:'@/pages/Home/index.jsx',
                            auth:false,
                        },
                        {
                            path:'/access',
                            component:React.lazy(() => import(/* webpackChunkName: "p__Access__index" */'@/pages/Access/index.jsx')),
                            // file:'@/pages/Access/index.jsx',
                            auth:true,
                        },
                        {
                            path:'/table',
                            component: React.lazy(() => import(/* webpackChunkName: "p__Table__index" */'@/pages/Table/index.jsx')),
                            // file:'@/pages/Table/index.jsx',
                            auth:true,
                        }
                    ]
                }
            ]
        },
        {
            name:'ant-design-pro-login',
            "isLayout": true,
            path:'/login',
            // file:'@/pages/Login',
            component: React.lazy(() => import(/* webpackChunkName: ".umi__plugin-layout__login" */'@/pages/Login')),
            auth:false,
        }
    ]