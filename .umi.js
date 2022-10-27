
import React from 'react';
import { clientLoader as homeClientLoader } from '@/pages/Home';
import { clientLoader as accessClientLoader } from '@/pages/Access';
import { clientLoader as globalLayoutClientLoader } from '@/layouts'
export const routeConfig = [
    {
        name: 'ant-design-pro-layout',
        component: React.lazy(() => import(/* webpackChunkName: ".umi__plugin-layout__Layout" */'@/core/ant-design-pro-layout/ant-design-pro-layout.jsx')),
        // file:'@/core/ant-design-pro-layout/ant-design-pro-layout.jsx',
        path: '/',
        "isLayout": true,
        auth: false,
        hideMenu: true,
        children: [
            {
                name: '@@/global-layout',
                component: React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.jsx')),
                // file:'@/layouts/index.jsx',
                "isLayout": true,
                auth: false,
                path: "/",
                hideMenu: true,
                // clientLoader: globalLayoutClientLoader,
                children: [
                    {
                        path: '/',
                        redirect: '/home',
                        component: React.lazy(() => import('@/EmptyRoute.jsx')),
                        // file:'@/EmptyRoute.jsx',
                        auth: false,
                        hideMenu: true,


                    },
                    {
                        path: '/home',
                        component: React.lazy(() => import(/* webpackChunkName: "p__Home__index" */'@/pages/Home/index.jsx')),
                        // file:'@/pages/Home/index.jsx',
                        auth: false,
                        title: '首页',
                        clientLoader: homeClientLoader

                    },
                    {
                        path: '/access',
                        component: React.lazy(() => import(/* webpackChunkName: "p__Access__index" */'@/pages/Access/index.jsx')),
                        // file:'@/pages/Access/index.jsx',
                        auth: true,
                        title: '权限页',
                        clientLoader: accessClientLoader
                    },
                    {
                        path: '/table',
                        component: React.lazy(() => import(/* webpackChunkName: "p__Table__index" */'@/pages/Table/index.jsx')),
                        // file:'@/pages/Table/index.jsx',
                        auth: true,
                        title: 'table'
                    }
                ]
            }
        ]
    },
    {
        name: 'ant-design-pro-login',
        "isLayout": true,
        path: '/login',
        // file:'@/pages/Login',
        component: React.lazy(() => import(/* webpackChunkName: ".umi__plugin-layout__login" */'@/pages/Login')),
        auth: false,
        hideMenu: true
    }
]