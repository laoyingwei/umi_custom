
import { useAppData, useRouteData, useClientLoaderData, useLocalData, setLocale, LocaleContext, } from '@/core/index';
import { Button, DatePicker, ConfigProvider, Switch } from 'antd';
const { RangePicker } = DatePicker;
import request from '@/utils/request'
import { useEffect, useState, createContext } from 'react';
import { useModel, useRequest, useAccess, Access } from '@/core/index';
import moment from 'moment';
const Context1 = createContext({})

export default () => {
    const useData = useAppData()
    const useRoute = useRouteData()
    const { refresh, setInitialState, loading } = useModel('@@initialState')
    // const { loading:requestLoading,data } = useRequest(() => {
    //     return request.get('/user/info')
    // })
    const jump = () => {
        useData.history.push('/access')
    }
    const access = useAccess()

    const clientLoaderData = useClientLoaderData()

    const localData = useLocalData()
    // console.log(localData)
    console.log(moment(1316116057189).fromNow())


    // useEffect(() => {
    //     request.get('/user/info').then(res => {
    //         console.log(res)
    //     })
    // },[])
    return <div>
        {/* {
            JSON.stringify(useData.routes)
        } */}

        {
            JSON.stringify(useRoute.route)
        }

        {/* {
            JSON.stringify(data)
           } */}

        {
            JSON.stringify(access)
        }
        <Access auth="canSee" />
        <Button type='primary' onClick={() => jump()}>跳转1</Button>
        <Button onClick={() => refresh()}>刷新</Button>
        <Button onClick={() => setLocale('zh-CN')}>设置语言</Button>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
        {/* <Button type="link" onClick={() => setColor()}>设置颜色</Button> */}
        <RangePicker />
        {/* <Button onClick={setClientLoaderData}></Button> */}


        {/* Provider 可以嵌套使用 */}
        <Context1.Provider value={{ name: '第一层' }}>
            <div>
                <Context1.Consumer>
                    {
                        e => {
                            return <>
                                <div>{e.name}</div>
                                <Context1.Provider value={{ name: '第二层' }}>

                                    <div>
                                        <Context1.Consumer>
                                            {
                                                e => {
                                                    return <div>{e.name}</div>
                                                }
                                            }
                                        </Context1.Consumer>
                                    </div>
                                </Context1.Provider>

                            </>
                        }
                    }
                </Context1.Consumer>
            </div>

        </Context1.Provider>
        <div>
            {
                JSON.stringify(clientLoaderData.data)
            }
        </div>
        {
            moment(1316116057189).fromNow()
        }

        <Switch defaultChecked />;
        <LocaleContext.Consumer>
            {
                e => {

                    return <Button >设置颜色</Button>
                }
            }
        </LocaleContext.Consumer>
    </div>
}


export async function clientLoader() {
    console.log('执行了Access')
    const data = await request.get('user/info',{
        hideMessage:true
    })

    return {
        name: '我是你爸爸'
    }
}