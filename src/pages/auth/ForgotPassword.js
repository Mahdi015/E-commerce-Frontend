import React, { useEffect, useState } from 'react';
import {auth} from '../../Firebase.js';
import {toast} from 'react-toastify' ;
import {useSelector } from 'react-redux'

const ForgotPassword = ({history}) => {
    const [email,setemail] = useState("")
    const [loading,setloading] = useState(false)
    const {user} = useSelector((state) =>({...state}));

    useEffect(()=>{
        if(user && user.token) history.push("/") ;
    },[user,history])
    const forgotpass = async(e) =>{
        e.preventDefault();
        setloading(true);
        
        const config = {
            // url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
             url: 'http://localhost:3000/Login',
             handleCodeInApp: true,
         };
         await auth.sendPasswordResetEmail(email , config)
         .then(()=>{
             setemail("")
             setloading(false)
             toast.success('Check your E-mail for password reset link');

         })
         .catch((error) =>{
             setloading(false);
             toast.error(error.message); 
         }) ;
 
    };

    return(
        <div className="container col-md-6 offset-md-3 p-5"> 
       <center>  {loading ?  (<h4 className="text-danger">loading...</h4>) :  (<h4>Fofrgot Password</h4>)} </center>  
       <form onSubmit={forgotpass}>
       <input type="email" className="form-control" placeholder="Enter E-mail" value={email} 
         onChange={(e) =>setemail(e.target.value) } autoFocus />
         <br></br>
         <button className="btn btn-raised" disabled={!email}>Reset Password</button>
        
        </form>
        </div>
    );
   

};
export default ForgotPassword;