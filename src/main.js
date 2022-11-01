import './App.less';
import render from '@/core/render'
import { registerMicroApps, start,loadMicroApp } from 'qiankun';
render()
registerMicroApps([
  {
  name: 'react_qian', // app name registered
  entry: '//localhost:3000',
  container: '#container',
  activeRule: '/yourActiveRule',
  // render: document.getElementById('container')
  },
  {
    name: 'react_qian1', // app name registered
    entry: '//localhost:8050',
    container: '#container',
    activeRule: '/yourActiveRule1',
    // render: document.getElementById('container')
    },
]);

