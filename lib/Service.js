

const PluginAPI = require('./PluginAPI');
///相当于 promise.all() 一样执行完所有的异步操作
const { AsyncParallelHook } = require('tapable');

const webpack = require('webpack');
const { join } = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackConfig = require('../config/webpack.config');
const { absTmpPath, absSrcPath } = require('./getPaths');
const express = require('express');
const http = require('http');
const webpackHotMiddleware = require('webpack-hot-middleware');
class Service {
    constructor(opts = {
        plugins: []
    }) {
        this.commands = {}
        this.plugins = opts.plugins
        this.hooksByPluginId = {}
        this.hooks = {}
        this.app = express();
    }
    setupDevMiddleware() {
        webpackConfig.resolve.alias['@']=absSrcPath;
        const compiler = webpack(webpackConfig);
        const devMiddleware = webpackDevMiddleware(compiler, { writeToDisk: true, publicPath: webpackConfig.output.publicPath, });
        this.app.use(devMiddleware);

        this.app.use(webpackHotMiddleware(compiler, {
             log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
        }));
        // this.app.use((req,res)=>{
        //     res.send(compiler.outputFileSystem.readFileSync(join(absSrcPath,'dist/index.html'),'utf8'));
        // });
        return devMiddleware;
    }
    async init() {
        for (const plugin of this.plugins) {
            const pluginAPI = new PluginAPI({ id: plugin.id, service: this })
            pluginAPI.onGenerateFiles = (fn) => {
                // pluginAPI.register({pluginId:plugin.id,key:"onGenerateFiles",fn})
                ///注册钩子
                pluginAPI.register({ pluginId: plugin.id, key: 'onGenerateFiles', fn })
            };
            plugin.apply(pluginAPI)
        }
        Object.keys(this.hooksByPluginId).forEach((id) => {
            const hooks = this.hooksByPluginId[id];
            hooks.forEach((hook) => {
                const { key } = hook;
                hook.pluginId = id;
                this.hooks[key] = (this.hooks[key] || []).concat(hook);
            });
        });
    }
    ///启动服务并执行钩子函数 
    async applyPlugins(opts) {
        const hooks = this.hooks[opts.key] || [];
        const tEvent = new AsyncParallelHook(["_"]);
        for (const hook of hooks) {
            tEvent.tapPromise({ name: hook.pluginId }, hook.fn);
        }
        return await tEvent.promise();
    }

    async run(args) {
        this.init();
        return this.runCommand(args);
    }

    async runCommand({ name }) {
        const command = this.commands[name];
        const { fn } = command;
        return fn();
    }

    async start() {
        const devMiddleware = this.setupDevMiddleware();
        devMiddleware.waitUntilValid(() => {
            this.listeningApp = http.createServer(this.app);
            this.listeningApp.listen(3000, () => {
                console.log(`http server started at port 3000`);
            })
        });
    }
};

module.exports = Service;