
import { AccessContext } from './context';
import React from 'react';
import { Button } from 'antd';
import  { useLocation,useParams  } from 'react-router-dom'
export const useAccess = () => {
    return React.useContext(AccessContext)
}

export const Access = (data) => {
    const location = useLocation()

    return <AccessContext.Consumer>
        {
            e => {
                
                const { permission } = e;
                if(permission.includes(data.auth)) {
                    return <Button>能看见</Button>
                }
                return null
            }
        }
    </AccessContext.Consumer>
}