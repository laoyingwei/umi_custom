import './App.less';
import render from '@/core/render'
import { registerMicroApps } from 'qiankun';
render()
registerMicroApps([
  // {
  //   name: 'react_qian', // app name registered
  //   entry: '//localhost:3000',
  //   container: '#container',
  //   activeRule: '/yourActiveRule',
  //   // render: document.getElementById('container')
  // },
  // {
  //   name: 'react_qian1', // app name registered
  //   entry: '//localhost:8050',
  //   container: '#container',
  //   activeRule: '/yourActiveRule1',
  //   // render: document.getElementById('container')
  // },
  {
    name: 'vite_project', // app name registered
    entry: '//127.0.0.1:5173/',
    container: '#container',
    activeRule: '/vue',
    // render: document.getElementById('container')
  },

]);


