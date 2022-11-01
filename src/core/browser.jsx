
import ReactDOM from 'react-dom/client';
import { matchRoutes, Router, useRoutes, BrowserRouter, Navigate } from 'react-router-dom';
import { useAppData, AppContext } from './appContext'
import React, { useEffect,useState,useCallback   } from 'react';
import { createClientRoutes } from './createClientRoutes';
let root = null;
import loader from './loader'
import { registerMicroApps, start,loadMicroApp } from 'qiankun';

function BrowserRoutes(props) {
  const { history } = props;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });
  ///作用 导航到对应的路径
  React.useLayoutEffect(() => history.listen(setState), [history]);
  React.useLayoutEffect(() => {
    function onRouteChange(opts) {
      props.pluginManager.applyPlugins({
        key: 'onRouteChange',
        type: 'event',
        args: {
          routes: props.routes,
          clientRoutes: props.clientRoutes,
          location: opts.location,
          action: opts.action,
          basename: props.basename,
          history
        },
      });
    }
    history.listen(onRouteChange);
    onRouteChange({ location: state.location, action: state.action });
  }, [history, props.routes, props.clientRoutes]);

  
  return (
    <Router
      navigator={history}
      location={state.location}
      basename={props.basename}
    >
      {props.children}
    </Router>
  );
}

export function Routes() {
  const _useAppData = useAppData(),
  clientRoutes = _useAppData.clientRoutes;


  return useRoutes(clientRoutes);
}

export const renderClient = (opts) => {
  const basename = opts.basename || '/';
  const rootElement = opts.rootElement || document.getElementById('root');
  const clientRoutes = createClientRoutes({
    routesById: opts.routes,
    routeComponents: opts.routeComponents,
    loadingComponent: opts.loadingComponent,
    reactRouter5Compat: opts.reactRouter5Compat
  });
  opts.pluginManager.applyPlugins({
    key: 'patchClientRoutes',
    type: 'event',
    args: {
      routes: clientRoutes
    }
  });
  let rootContainer = <BrowserRoutes
    basename={basename}
    pluginManager={opts.pluginManager}
    routes={opts.routes}
    clientRoutes={clientRoutes}
    history={opts.history}
  >
    <Routes />
  </BrowserRoutes>

  // innerProvider -> i18nProvider -> accessProvider -> dataflowProvider -> outerProvider -> rootContainer

  for (const key of [
    // Lowest to the highest priority
    'keepAliveProvider',
    'innerProvider',
    'i18nProvider',
    'accessProvider',
    'dataflowProvider',
    'outerProvider',
   
    'rootContainer',
  ]) {
    rootContainer = opts.pluginManager.applyPlugins({
      type: 'modify',
      key: key,
      initialValue: rootContainer,
      args: {},
    });
  }
  // const loaderImplement = {}
  function Browser() {
    const [clientLoaderData, setClientLoaderData] = useState({});
   
    const handleRouteChange = useCallback((id,isFirst) => {
      const matchedRouteIds = (
        matchRoutes(clientRoutes, id, basename)?.map(
          // @ts-ignore
          (route) => route.route.id,
        ) || []
      ).filter(Boolean);
      matchedRouteIds.forEach(id => {
        const clientLoader = loader[id] ;
        // && !loaderImplement[id]
        if (clientLoader && !clientLoaderData[id] ) {
          // loaderImplement[id] = true
            // debugger
            clientLoader().then((data) => {
              setClientLoaderData((d) => ({ ...d, [id]: data || {} }));
              // loaderImplement[id] = true
            }).catch(e =>{
              setClientLoaderData((d) => ({ ...d, [id]:  {} }));
              // loaderImplement[id] = true
            })
        
        }
      })
    },[clientLoaderData])
    useEffect(() => {
      handleRouteChange(window.location.pathname,true)
      return opts.history.listen((e) => {
        handleRouteChange(e.location.pathname);
      });
    },[])
    // useEffect(() =>{
    //     const st =  start();
    // },[])
    return   <AppContext.Provider
      value={{
        routes: opts.routes,
        routeComponents: opts.routeComponents,
        clientRoutes: clientRoutes,
        pluginManager: opts.pluginManager,
        rootElement: opts.rootElement,
        basename: basename,
        clientLoaderData,
        history: opts.history,
      }}>

      {
        rootContainer
      }

    </AppContext.Provider>
  }

  if (ReactDOM.createRoot) {
    root = ReactDOM.createRoot(rootElement);
    root.render(<Browser />);

  
  } else {
    ReactDOM.render(<Browser />, rootElement);
  }


}


