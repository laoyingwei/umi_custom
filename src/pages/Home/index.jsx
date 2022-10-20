
import { useAppData,useRouteData } from '@/core/index';
import { Button } from 'antd';

import request from '@/utils/request'
import { useEffect } from 'react';
import { useModel,useRequest } from '@/core/index'
export default () => {
    const useData  = useAppData()
    const useRoute = useRouteData()
    const { refresh,setInitialState,loading} = useModel('@@initialState')
    const { loading:requestLoading,data } = useRequest(() => {
        return request('/user/info')
    })
    const jump = () => {
       useData.history.push('/access')
    }
    // useEffect(() => {
    //     request.get('/user/info').then(res => {
    //         console.log(res)
    //     })
    // },[])
    console.log(data)
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
        <Button onClick={() => jump()}>跳转1</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => jump()}>跳转</Button>
        <Button onClick={() => refresh()}>刷新</Button>
    </div>
}