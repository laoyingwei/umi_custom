import { AccessContext } from './context'
import React from 'react';
import { useModel } from '../plugin-model/index';
import accessFactory from '@/access'

function Provider(props) {

  const { initialState } = useModel('@@initialState');
  // console.log(initialState)
  // useMemo 防止重复渲染 initialState
  // console.log(props.children)
  const access = React.useMemo(() => accessFactory(initialState), [initialState]);
  return (
    < AccessContext.Provider value={access} >
      {props.children}
    </AccessContext.Provider >
  )
}
export function accessProvider(container) {
  return <Provider>{container}</Provider>
}


