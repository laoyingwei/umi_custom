

import { useParams,generatePath, Navigate } from 'react-router-dom'
import { RouteContext } from './routeContext';
import React from 'react'
export function createClientRoutes (opts) {
    const { routesById,routeComponents,loadingComponent,reactRouter5Compat,parentId } = opts
   const data = Object.keys(routesById).filter(id => {
        return routesById[id].parentId === parentId
    }).map((id) => {

       const route =  createClientRoute({
            route: routesById[id],
            routeComponent: routeComponents[id],
            loadingComponent: opts.loadingComponent,
            reactRouter5Compat: opts.reactRouter5Compat,
            ...(opts.reactRouter5Compat && {
            // TODO: 这个不准，没考虑 patchClientRoutes 的场景
            hasChildren:
                Object.keys(routesById).filter(
                (rid) => routesById[rid].parentId === id,
                ).length > 0,
            }),
       })

       const children =  createClientRoutes({
        routesById:opts.routesById,
        routeComponents:opts.routeComponents,
        loadingComponent: opts.loadingComponent,
        reactRouter5Compat: opts.reactRouter5Compat,
        parentId:route.id
        
        })
        if(children.length > 0) {
            route.children = children
            route.routes = children
        }

       return route

    })
    return data;

}

function NavigateWithParams (props) {
    const params = useParams()

    const propsWithParams = {
        ...props,
        to: generatePath(props.to, params),
    };
    return <Navigate replace={true} {...propsWithParams} />
}

function DefaultLoading () {
  
    return <div />
}


function createClientRoute (opts) {
    const { route } = opts
    const { redirect, ...props } = route;
    
    return {
        element: redirect ? (
          <NavigateWithParams to={redirect} />
        ) : (
          <RouteContext.Provider
            value={{
              route: opts.route,
            }}
          >
            <RemoteComponent
              loader={React.memo(opts.routeComponent)}
              loadingComponent={opts.loadingComponent || DefaultLoading}
              hasChildren={opts.hasChildren}
            />
          </RouteContext.Provider>
        ),
        ...props,
      };

}


function RemoteComponent (props) {
    const Component = props.loader;
   return (
    <React.Suspense fallback={<props.loadingComponent />}>
      <Component />
    </React.Suspense>
  ); 
}