import { useState, useEffect, useCallback } from 'react';
import { getInitialState } from '@/runtime'
const initState = {
    initialState: undefined,
    loading: true,
    error: undefined,
  };
  export default () => {

    const [ state,setState ] =  useState(initState) 
    const refresh = useCallback(async () => {
        setState((s) => ({ ...s, loading: true, error: undefined }));
        try {
            const ret = await getInitialState()
            setState((s) => ({ ...s, initialState: ret, loading: false }));
        } catch (error) {
            setState((s) => ({ ...s, initialState: ret, loading: false }));
        }  
    },[])

    const setInitialState = useCallback(async (initialState) => {
         setState((s) => {
            if (typeof initialState === 'function') {
              return { ...s, initialState: initialState(s.initialState), loading: false };
            }
            return { ...s, initialState, loading: false };
          });
    },[])

    useEffect(() => {
        refresh()
    },[])
    return {
        ...state,
        refresh,
        setInitialState,
    }
  }

  