import './App.less';
import render from '@/core/render'



import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'webpack5-react', // app name registered
    entry: '//localhost:8000',
    container: '#qiankunVue',
    activeRule: '/yourActiveRule',
  },
//   {
//     name: 'vue app',
//     entry: { scripts: ['//localhost:7100/main.js'] },
//     container: '#yourContainer2',
//     activeRule: '/yourActiveRule2',
//   },
]);

start();
render()

