let mkdirp = require('mkdirp');
let {writeFileSync} = require('fs');
let {dirname,join} = require('path');
const {absTmpPath} = require('./getPaths');
function writeTmpFile({path,content}) {
    const absPath = join(absTmpPath, path);
    mkdirp.sync(dirname(absPath));
    writeFileSync(absPath, content, 'utf8');
}
module.exports = writeTmpFile;