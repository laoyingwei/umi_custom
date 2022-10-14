import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {  onRouteChange} from '@/app.js'
export default function History (routes) {
    const loaction = useLocation()

    useEffect(() => {
        if(routes.length) {
            onRouteChange({
                action: "PUSH",
                loaction,
                routes
             })
        }
       
    },[loaction,routes])

}
