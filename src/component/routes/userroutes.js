import React  from 'react' 
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingtoRedirect from './LoadingtoRedirect'

const UserRoutes=({ children, ...rest}) => {
    const {user} = useSelector((state)=>({...state}));
    return user && user.token ? (
        <Route {...rest} />):
        <LoadingtoRedirect/>
    
}

export default UserRoutes;
