
import React from 'react';
import { clientLoader as homeClientLoader } from '@/pages/Home';
import { clientLoader as accessClientLoader } from '@/pages/Access';
import { clientLoader as globalLayoutClientLoader } from '@/layouts';


export const routeConfig = [
    {
        name: 'ant-design-pro-layout',
        component: React.lazy(() => import(/* webpackChunkName: ".umi__plugin-layout__Layout" */'@/core/ant-design-pro-layout/ant-design-pro-layout.jsx')),
        // file:'@/core/ant-design-pro-layout/ant-design-pro-layout.jsx',
        path: '/',
        "isLayout": true,
        ///权限用的
        auth: true,
        hideMenu: true,
        children: [
            {
                name: '@@/global-layout',
                component: React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.jsx')),
                // file:'@/layouts/index.jsx',
                "isLayout": true,
                path: "/",
                hideMenu: true,
                // clientLoader: globalLayoutClientLoader,
                children: [
                    {
                        path: '/',
                        redirect: '/home',
                        component: React.lazy(() => import('@/EmptyRoute.jsx')),
                        hideMenu: true,
                    },
                    {
                        path: '/home',
                        component: React.lazy(() => import(/* webpackChunkName: "p__Home__index" */'@/pages/Home/index.jsx')),
                        title: '首页',
                        clientLoader: homeClientLoader

                    },
                    {
                        path: '/access',
                        component: React.lazy(() => import(/* webpackChunkName: "p__Access__index" */'@/pages/Access/index.jsx')),
                        title: '权限页',
                        clientLoader: accessClientLoader
                    },
                    {
                        path: '/table',
                        component: React.lazy(() => import(/* webpackChunkName: "p__Table__index" */'@/pages/Table/index.jsx')),
                        title: 'table'
                    },
                  
                ]
            }
        ]
    },

    {
        path: 'other',
        ///权限用的
        auth: false,
        component: React.lazy(() => import(/* webpackChunkName: "p__Access__index" */'@/pages/Other/index.jsx')),
        title: '其他页面',
        hideMenu: true
    },
    {
        name: 'ant-design-pro-login',
        
        path: '/login',
        component: React.lazy(() => import(/* webpackChunkName: ".umi__plugin-layout__login" */'@/pages/Login')),
        ///权限用的
        auth: false,
        hideMenu: true
    },
    {
        title: '微应用',
        path:'/yourActiveRule',
        // component: React.lazy(() => import(/* webpackChunkName: "p__Qiankun" */'@/pages/Qiankun')),
        component:  require('@/Qiankun').default,
      
    },
  
    {
        title: '微应用1',
        path:'/yourActiveRule1',
        // component: React.lazy(() => import(/* webpackChunkName: "p__Qiankun" */'@/pages/Qiankun1')),
        component:  require('@/Qiankun').default,
        
    }
   
]