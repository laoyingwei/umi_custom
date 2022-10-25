import { useAppData,useRouteData,useClientLoaderData } from '@/core/index';
import request from '@/utils/request'
export default () => {
    const clientLoaderData = useClientLoaderData()
    return <div>
        Access 

        <div>
            {
                JSON.stringify(clientLoaderData.data)
            }
        </div>
    </div>
}


export async function clientLoader () {
    console.log('执行了Access')
    const data = await request.get('user/info')

    return data
    // return new Promise((resolve,reject) =>{

    //     setTimeout(() => {
    //         resolve({
    //             name:'1231232',
    //             id:'我是路由加载数据'
    //         })
    //     },3000)
    // })
}