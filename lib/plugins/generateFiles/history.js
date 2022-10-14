

let { readFileSync } = require("fs");
let { join } = require("path");
let writeTmpFile = require("../../writeTmpFile");
let Mustache = require("mustache");

const plugin = (api) => {
  api.onGenerateFiles(async () => {
    const historyTpl = readFileSync(join(__dirname, "history.tpl"), "utf8");
    writeTmpFile({
      path: "core/history.js",
      content: Mustache.render(historyTpl),
    });
  });
};

module.exports = plugin;