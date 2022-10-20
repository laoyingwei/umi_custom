
import ReactDOM from 'react-dom/client';
import { matchRoutes, Router, useRoutes, BrowserRouter } from 'react-router-dom';
import { useAppData, AppContext } from './appContext'
import React from 'react';
import { createClientRoutes } from './createClientRoutes'
let root = null;



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
      console.log(opts)
      props.pluginManager.applyPlugins({
        key: 'onRouteChange',
        type: 'event',
        args: {
          routes: props.routes,
          clientRoutes: props.clientRoutes,
          location: opts.location,
          action: opts.action,
          basename: props.basename,
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

  function Browser() {
    return <AppContext.Provider
      value={{
        routes: opts.routes,
        routeComponents: opts.routeComponents,
        clientRoutes: clientRoutes,
        pluginManager: opts.pluginManager,
        rootElement: opts.rootElement,
        basename: basename,
        history: opts.history
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