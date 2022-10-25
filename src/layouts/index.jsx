import { Outlet } from 'react-router-dom'
import request from '@/utils/request'
const Layout = (props) =>{

    return <div>
                我是最大的页面啊士大夫大师傅
                <Outlet />

            </div>
}

export default Layout

export async function clientLoader () {
     return request.get('user/info')
}