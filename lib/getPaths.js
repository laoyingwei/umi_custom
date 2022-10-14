const {existsSync,statSync} = require('fs');
const {join, resolve} = require('path');
function isDirectoryAndExist(path) {
    return existsSync(path) && statSync(path).isDirectory();
}
let cwd = process.cwd();
let absSrcPath = cwd;
if (isDirectoryAndExist(join(cwd, 'src'))) {
    ///返回node 执行的工作目录的位置
    absSrcPath = join(cwd, 'src');
    ///返回相对于现在的目录的当前父级路径 有区别的
    // const p = __dirname
}
const absPagesPath=join(absSrcPath,'pages');
const tmpDir = '.umi3';
const absTmpPath = join(absSrcPath, tmpDir);
module.exports = {
    absSrcPath,
    absPagesPath,
    tmpDir,
    absTmpPath
}