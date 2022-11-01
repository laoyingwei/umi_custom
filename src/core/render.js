
import { getRoutes } from './routes'
import { createPluginManager,getPluginManager } from './plugin';
import { ApplyPluginsType } from './ApplyPluginsType'
import { createHistory } from './history';
import { renderClient } from './browser';
import { Spin } from 'antd'
import { useEffect } from 'react';

const publicPath = "/";
const runtimePublicPath = false;

export default async () => {
  const pluginManager = getPluginManager() 
    let { routes ,routeComponents} =  await getRoutes(pluginManager)

    pluginManager.applyPlugins({
        key: 'patchRoutes',
        type: ApplyPluginsType.event,
        args: {
          routes,
          routeComponents,
        },
      });

    const render =  pluginManager.applyPlugins({
        key: 'render',
        type: ApplyPluginsType.compose,
        initialValue() {
          const contextOpts = pluginManager.applyPlugins({
            key: 'modifyContextOpts',
            type: ApplyPluginsType.modify,
            initialValue: {
             
            },
          });
          const basename = contextOpts.basename || '/';
          const context = {
            routes,
            routeComponents,
            pluginManager,
            rootElement: contextOpts.rootElement || document.getElementById('root'),
            publicPath,
            runtimePublicPath,
            history: createHistory({
              type: contextOpts.historyType || 'browser',
              basename,
              ...contextOpts.historyOpts,
            }),
            basename,
            loadingComponent:Spin
          };
          
         const client =   renderClient(context );

         return client
        },
      })
      render()
     
}