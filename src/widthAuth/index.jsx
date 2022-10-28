

import { useModel, useRouteData } from '@/core/index';
import { Navigate } from 'react-router-dom';
import useGlobalState from '@/core/plugin-initialState/@@initialState.js';
import Loading from '@/Loading';
export default (Component) => {

    const { refresh, setInitialState, loading, initialState } = useGlobalState()
    const useRoute = useRouteData()
    if (loading) {
        return <Loading />
    } else {
        const { token } = initialState || {}
        if (useRoute.route.auth) {
            if (token) {
                return <Component />
            } else {
                if(useRoute.route.path !== '/login')   return <Navigate to={'/login'} />
            }
        }
        return <Component />
    }
}