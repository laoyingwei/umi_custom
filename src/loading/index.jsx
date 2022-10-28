


import { Skeleton,Spin } from 'antd';
import React from 'react';
import loadingModule from './loading.module.css'
const App = () => {

   const Loading = <div className={ loadingModule.title } >
     {/* delay={500} */}
        <Spin size='large' tip="Loading..."  />
   </div>

    return Loading
};

export default App;