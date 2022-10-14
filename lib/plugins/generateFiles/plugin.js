let { readFileSync,existsSync } = require("fs");
let { join } = require("path");
let writeTmpFile = require("../../writeTmpFile");
let Mustache = require("mustache");
const {winPath} = require('../../utils');
const {absSrcPath} = require('../../getPaths');

const plugin = (api) => {
  api.onGenerateFiles(async () => {
    const pluginTpl = readFileSync(join(__dirname, "plugin.tpl"), "utf8");
    const plugins = [join(absSrcPath,'app.js')];
    writeTmpFile({
      path: "core/plugin.js",
      
      content: Mustache.render(pluginTpl,{
        plugins: plugins.map((plugin, index) => {
          return {
            index,
            path: winPath(plugin)
          };
        })
      }),
    });
  });
};
module.exports = plugin;