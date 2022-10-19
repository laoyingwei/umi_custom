

import * as Plugin_0 from '@/runtime';
import * as Plugin_initialState from '@/core/plugin-initialState';
import { assert, compose, isPromiseLike } from "./utils";
import { ApplyPluginsType } from './ApplyPluginsType'
import _typeof from "@babel/runtime/helpers/typeof";
function __defaultExport (obj) {
    if (obj.default) {
      return typeof obj.default === 'function' ? obj.default() :  obj.default
    }
    return obj;
  }
 
 export class PluginManager {
     constructor (opts) {
        this.hooks = {};
        this.opts = opts
        this._this = this
     }
    register(plugin) {
        assert(plugin.apply, "plugin register failed, apply must supplied");
        Object.keys(plugin.apply).forEach((key) => {
            assert(this.opts.validKeys.indexOf(key) > -1, "register failed, invalid key ".concat(key, " ").concat(plugin.path ? "from plugin ".concat(plugin.path) : '', "."));
            if (!this.hooks[key]) this.hooks[key] = [];
            this.hooks[key] = this.hooks[key].concat(plugin.apply[key]);
        });
    }
    applyPlugins(_ref) {

      const key = _ref.key,
      type = _ref.type,
      initialValue = _ref.initialValue,
      args = _ref.args,
      async = _ref.async;
      const hooks = this.getHooks(key) || [];
      if (args) {
        assert(_typeof(args) === 'object', "applyPlugins failed, args must be plain object.");
      }

      if (async) {
        assert(type === ApplyPluginsType.modify || type === ApplyPluginsType.event, "async only works with modify and event type.");
      }else {
        switch (type) {
          case ApplyPluginsType.modify:
            return hooks.reduce(function (memo, hook) {
              assert(typeof hook === 'function' || _typeof(hook) === 'object', "applyPlugins failed, all hooks for key ".concat(key, " must be function or plain object."));
                return hook(memo, args);
            }, initialValue);
          case ApplyPluginsType.event:
            return hooks.forEach((hook) => {
              hook(args);
          });
          case ApplyPluginsType.compose:
            return function () {
              return compose({
                fns: hooks.concat(initialValue),
                args: args
              })();
            };
          default:
            break;
        }
      
       
      }
       

        

    }
    getHooks (key) {
      return this.hooks[key] || []
    }
    create({ validKeys, plugins}) {
          const _this = this;
          plugins.forEach(function (plugin) {
            _this.register(plugin);
          });
    }
   
}   


export function getPlugins() {
    return [
      {
        apply: __defaultExport(Plugin_0),
        // path: process.env.NODE_ENV === 'production' ? void 0 : 'F:/learn/umi_4/src/app.ts',
      },
      {
        apply:Plugin_initialState,
        // path: process.env.NODE_ENV === 'production' ? void 0 : 'F:/learn/umi_4/src/app.ts',
      }
    ];
  }
  
  export function getValidKeys() {
    return ['patchRoutes','patchClientRoutes','modifyContextOpts','rootContainer','innerProvider','i18nProvider','accessProvider','dataflowProvider','outerProvider','render','onRouteChange','getInitialState','layout','qiankun','request',];
  }
  


export function createPluginManager (opts) {
    const pluginManager = new PluginManager({
        validKeys: getValidKeys(),
    })
    pluginManager.create({
        plugins: getPlugins()
    });
    return pluginManager;
}

