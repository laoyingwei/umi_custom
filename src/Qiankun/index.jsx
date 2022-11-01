
///qiankun 模板
import { registerMicroApps, start, loadMicroApp, initGlobalState } from 'qiankun';
import { useEffect, useLayoutEffect } from 'react';
///初始化完就不执行 start
let st = null


export default () => {


    // 初始化 state
    const state = {
        name: 'hahaha'
    }
    const actions = initGlobalState(state);

    actions.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log(state, prev);
    });
    actions.setGlobalState(state);
    // actions.offGlobalStateChange();

    useEffect(() => {

        if (!st) {
            start();
            st = true
        }
    }, [])
    return <><div id="container" ></div></>
}

