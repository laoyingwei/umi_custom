
import useGlobalState, { globalStore } from '@/store/index';
const UserIndex = () => {
    const { loading, routes, user, refreshGlobalData, userName } = globalStore()
    return <>
        {JSON.stringify(loading)}{JSON.stringify(user)}

        {userName}
    </>
}
export default UserIndex