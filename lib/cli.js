
let Service = require('./Service');
///一定要写分号 es5 语法
let dev = require('./plugins/commands/dev');
let history = require('./plugins/generateFiles/history');
let routes = require('./plugins/generateFiles/routes');
let umi = require('./plugins/generateFiles/umi');
let plugin = require('./plugins/generateFiles/plugin');
(async()=>{
    const service = new Service ({
        plugins:[
            { id:'dev',apply: dev },
            {id:'history',apply:history},
            {id:'routes',apply:routes},
            {id:'umi',apply:umi},
            {id:'plugin',apply:plugin},
        ],

    })
    await service.run({ name:'dev' })
})();