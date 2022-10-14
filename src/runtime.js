

let extraRoutes;

export function patchClientRoutes ({ routes }) {
    console.log('触发到了')
    console.log(extraRoutes)

    return [extraRoutes,...routes]

}
///请求接口 动态路由
export function render (oldRender) {
    // debugger
    extraRoutes = [{
        'name':'我是你爸爸'
    }]
    oldRender()
}