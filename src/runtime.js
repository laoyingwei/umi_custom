
import { useNavigate } from 'react-router-dom';

let extraRoutes;

export function patchClientRoutes({ routes }) {
    // debugger
    return [...routes, extraRoutes]

}
///请求接口 动态路由
export function render(oldRender) {
    // debugger
    extraRoutes = [{
        'name': '我是你爸爸'
    }]
    oldRender()
}
///类似 vue 的路由守卫
const token = false
export function onRouteChange(opts) {
    // console.log(opts.history)
    // // debugger
    const { location, routes } = opts
    const { pathname } = location
    let route = {}
    Object.keys(routes).find(key => {

        if (routes[key].path === pathname) {
            route = routes[key]
            return true
        }
        return false
    })
    if (!route.auth) return false
    if (!token && opts.location.pathname !== '/login') {
        opts.history.replace('/login')
    }

}


const Token = false
export async function getInitialState() {
    // console.log('获取初始值')
    // return {
    //     a:'1',
    //     b:'2'
    // }
    //   if(!Token) {
    //     const navigate = useNavigate()
    //     navigate('/login')
    //     return {}
    //   }
    return {
        permission: [
            'canSee'
        ],
        isLogin: true
    }

}



// export function rootContainer (container) {
//    return  React.createElement(ConfigProvider,{
//     // prefixCls:'custom'
//    },container)
// }

