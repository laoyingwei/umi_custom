

const Server = require('../../Service')
const dev = (api) =>{
    api.registerCommand({
        name: "dev",
        description: "启动开发服务器",
        fn: async function () {
         
        // 执行到了
            await api.service.applyPlugins({
                key:'onGenerateFiles'
            });
            new Server().start();
        }
    });
}

module.exports = dev;