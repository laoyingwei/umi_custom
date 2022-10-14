import { Outlet } from 'react-router-dom'

const Layout = (props) =>{

    return <div>
        主要页面
        <Outlet />

    </div>
}

export default Layout