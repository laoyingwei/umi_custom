const { existsSync, readdirSync, readFileSync, statSync } = require("fs");
const { basename,extname,join,relative } = require("path");
const {winPath} = require('./utils');
const {absPagesPath} = require('./getPaths');

function getRoutes(opts={}) {
    const { root, relDir = "" } = opts;
    const files = getFiles(join(root, relDir));
    const routes = files.reduce(fileToRouteReducer.bind(null, opts), []);
    return routes;
  }
  

  function fileToRouteReducer(opts, routes, file) {
    const { root, relDir = "" } = opts;
    const absFile = join(root, relDir, file);
    const stats = statSync(absFile);
    if (stats.isDirectory()) {
      const relFile = join(relDir, file);
      const layoutFile = join(root,relFile,'_layout.jsx');
      routes.push({
          path: normalizePath(relFile),
          children: getRoutes({
            ...opts,
            relDir: relFile
          }),
          ...(existsSync(layoutFile)?{ element: toComponentPath(root,layoutFile)}:{
            element: '@/layout/index.jsx'
          })
        });
    } else {
      const bName = basename(file, extname(file));
      routes.push(
          {
              path: normalizePath(join(relDir, bName)),
              exact: true,
              element: toComponentPath(root,absFile),
          }
      );
    }
    return routes;
  }


  const normalizePath = (path)=>{
    path= winPath(path);
    path = `/${path}`;
    path = path.replace(/\/index$/, '/');
    return path;
  }
  // path.relative()方法用于根据当前工作目录查找从给定路径到另一个路径的相对路径。如果两个给定路径相同，则它将解析为零长度的字符串
  // path.relative( from, to )
  const toComponentPath= (root,absFile)=>{
    return `@/${winPath(relative(join(root, ".."), absFile))}`;
  }
  
  
  function getFiles(root) {
    if (!existsSync(root)) return [];
    return readdirSync(root).filter((file) => {
      if (file.charAt(0) === '_') return false;
      return true;
    });
  }
  
let routes = getRoutes({root:absPagesPath});
 
// 解决首页不跳转子页面问题
 routes.forEach(item => {
    if(item.path === '/') {
      if(item.children) {
        const i = item.children.findIndex(child => child.path === '/index/')
        if(i !== -1) {
          item.children[i].path = '/'
        }
      }
     
    }
  })

  ///固定404页面
  routes.push({
    path:'*',
    element: '@/layout/index.jsx',
    children:[
      {
        path:'*',
        element: '@/Error/index.jsx'
      }
    ],
   
  })
  module.exports = routes;