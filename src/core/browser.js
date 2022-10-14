
import ReactDOM from 'react-dom/client';
import { matchRoutes, Router, useRoutes } from 'react-router-dom';
import { useAppData,AppContext } from './appContext'
import React from 'react';
let root = null;
export function Routes() {
  const _useAppData = useAppData(),
  clientRoutes = _useAppData.clientRoutes;

  return useRoutes(clientRoutes);
}

export const renderClient = (opts) => {
   const basename = opts.basename || '/';
   const rootElement = opts.rootElement || document.getElementById('root');
  //  const clientRoutes = createClientRoutes({
  //    routesById: opts.routes,
  //    routeComponents: opts.routeComponents,
  //    loadingComponent: opts.loadingComponent,
  //    reactRouter5Compat: opts.reactRouter5Compat
  //  });
   opts.pluginManager.applyPlugins({
    key: 'patchClientRoutes',
    type: 'event',
    args: {
      routes: []
    }
  });
  // const rootContainer = React.createElement(BrowserRoutes, {
  //   basename: basename,
  //   pluginManager: opts.pluginManager,
  //   routes: opts.routes,
  //   clientRoutes: clientRoutes,
  //   history: opts.history
  // }, React.createElement(Routes, null));
  const rootContainer = React.createElement('div',null,'我是一个标签');
   function Browser () {
      return React.createElement(AppContext.Provider, {
        value: {
          routes: opts.routes,
          routeComponents: opts.routeComponents,
          clientRoutes: [],
          pluginManager: opts.pluginManager,
          rootElement: opts.rootElement,
          basename: basename,
          // clientLoaderData: clientLoaderData,
          // serverLoaderData: serverLoaderData,
          // preloadRoute: handleRouteChange,
          history: opts.history
        }
      }, rootContainer);
   }

   if (ReactDOM.createRoot) {
      root = ReactDOM.createRoot(rootElement);
      root.render(React.createElement(Browser, null));
    } else {
      ReactDOM.render(React.createElement(Browser, null), rootElement);
    }


}