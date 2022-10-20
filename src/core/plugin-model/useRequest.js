import { useState,useCallback,useEffect } from 'react'

export  const useRequest =  (fn) => {
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({})
    const request = useCallback( async () => {
        setLoading(true)
        try {
            const data = await fn()

           setData(data)
          
        } catch (error) {
           
        }
        setLoading(false)
    },[])



    useEffect(() => {
        request()
    },[])
    

    return {
        data,
        loading,
        refresh:request
    }
}