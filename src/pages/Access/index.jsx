import { useAppData,useRouteData,useClientLoaderData } from '@/core/index';
import request from '@/utils/request';
import { Button } from 'antd'
import { useEffect } from 'react';
export default () => {
    const clientLoaderData = useClientLoaderData()
    console.log('执行了access')
    useEffect(() => {
        // request.get('/user/info',{
        //     hideMessage:true
        // })
        // name:'123'
        // name:'123' 
        request.post('/user',{ data:{name:'123'  } }).then(res =>{
            console.log(res)
        }).catch(e =>{
            console.log(e)
        })
    },[])
    return <div>
        Access 

        <div>
            {
                JSON.stringify(clientLoaderData.data)
            }
        </div>
        <Button type='primary'>跳转1</Button>
    </div>
}


export async function clientLoader () {
    // console.log('执行了Access')
    // const data = await request.get('user/info',{
    //     hideMessage:true
    // })

    return {
        a:'1'
    }
    // return new Promise((resolve,reject) =>{

    //     setTimeout(() => {
    //         resolve({
    //             name:'1231232',
    //             id:'我是路由加载数据'
    //         })
    //     },3000)
    // })
}