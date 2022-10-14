
import '@/App.less'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
import { getRoutes } from './core/routes';
import { useRoutes } from 'react-router-dom';
import { globalStore } from '@/store/index'
import {  getInitialState} from '@/app.js'
import React, { useEffect } from 'react';
import Loading from '@/loading/index.jsx'
const Router = () => {
  const { loading,initData,routes } = globalStore()
  let element = useRoutes(routes);
  useEffect(() =>{
    initData()
  },[])
  return loading ? <Loading /> :  element
}
const App = () => {
  return <Router />
}
import { BrowserRouter } from 'react-router-dom';
root.render(

<BrowserRouter><App /></BrowserRouter>

);