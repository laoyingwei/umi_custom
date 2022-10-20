import { createGlobalState } from 'react-hooks-global-state'
import globalinitialState from '../plugin-initialState/@@initialState'
import {useRequest } from './useRequest'
export const models = {
    '@@initialState':globalinitialState,
     'useRequest':useRequest
    // model_1: { namespace: 'global', model: model_1 },
    // model_2: { namespace: '@@initialState', model: globalinitialState },
 } 

export function useModel (name,fn = '') {
    return models[name](fn)
}
