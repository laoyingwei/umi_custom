
import { useAppData,useRouteData } from '@/core/index';
import { Button } from 'antd';

import request from '@/utils/request'
import { useEffect } from 'react';
import { useModel,useRequest,useAccess,Access } from '@/core/index'
export default () => {
    const useData  = useAppData()
    const useRoute = useRouteData()
    const { refresh,setInitialState,loading} = useModel('@@initialState')
    const { loading:requestLoading,data } = useRequest(() => {
        return request.get('/user/info')
    })
    const jump = () => {
       useData.history.push('/access')
    }
    const access = useAccess()
    // useEffect(() => {
    //     request.get('/user/info').then(res => {
    //         console.log(res)
    //     })
    // },[])
    return <div>
        {/* {
            JSON.stringify(useData.routes)
        } */}
       
           {
            JSON.stringify( useRoute.route)
           }
           
           {
            JSON.stringify(data)
           }
          
           {
            JSON.stringify(access)
           }
        <Access auth="canSee" />
        <Button onClick={() => jump()}>跳转1</Button>
        <Button onClick={() => refresh()}>刷新</Button>
    </div>
}