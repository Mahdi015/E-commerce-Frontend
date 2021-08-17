import React,{useEffect, useState}  from 'react' ;
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {curradmin} from '../../functions/auth'
import LoadingtoRedirectadmin from './LoadingRedirectAdmin'

const AdminRoutes=({ children, ...rest}) => {
    const {user} = useSelector((state)=>({...state}));
    const [ok,setok] = useState(false)
    useEffect(()=>{
    if (user && user.token){
        curradmin(user.token)
        .then(res =>{
            console.log('Admin res',res)
            setok(true)
        })
        .catch(err =>{
            console.log('Admin Route err',err)
            setok(false)
        })
    }
    },[user])
    return ok ? (
        <Route {...rest}/>):
        <LoadingtoRedirectadmin/>
    
}

export default AdminRoutes;
