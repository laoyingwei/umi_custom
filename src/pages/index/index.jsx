
import useGlobalState, { globalStore } from '@/store/index';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useEffect } from 'react';
const Index = () => {
    const { loading, routes, user,refreshGlobalData,userName } = globalStore()
    const [otherData, setOtherData] = useGlobalState('otherData')
    const navigate = new useNavigate()
    // useEffect(() =>{
    //     initData()
    // },[])
    const next = () => {
        navigate('/user')
    //    history.push('/user')
    }
    const r = () => {
        refreshGlobalData({
            userName:'456'
        })
    }
    return <>
        <div>
            {JSON.stringify(loading)}{JSON.stringify(user)}
            {JSON.stringify(otherData)}
            {userName}
        </div>
        <Button onClick={() => next()}>切换路由</Button>
        <Button onClick={() => r()}>更新信息</Button>
    </>
}
export default Index