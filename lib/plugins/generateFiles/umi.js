let { readFileSync } = require("fs");
let { join } = require("path");
let writeTmpFile = require("../../writeTmpFile");
let Mustache = require("mustache");

const plugin = (api) => {
  api.onGenerateFiles(async () => {
    const umiTpl = readFileSync(join(__dirname, "umi.tpl"), "utf8");
    writeTmpFile({
      path: "umi.js",
      content: Mustache.render(umiTpl),
    });
  });
};
module.exports = plugin;