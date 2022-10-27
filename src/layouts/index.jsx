import { Outlet } from 'react-router-dom';
import request from '@/utils/request';
import { useAppData, useRouteData, useClientLoaderData, useLocalData, setLocale, LocaleContext } from '@/core/index';
const Layout = (props) =>{
    const clientLoaderData = useClientLoaderData()
    return <div>
                我是最大的页面啊士大夫大师傅
                {
                    JSON.stringify(clientLoaderData.data)
                }
                <Outlet />

            </div>
}

export default Layout

export async function clientLoader () {
     await request.get('user/info')

     return {
        name:'我是最大的页面'
     }
}