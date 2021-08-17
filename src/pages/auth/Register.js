import React, { useState , useEffect } from 'react';
import {auth} from '../../Firebase.js';
import {toast} from 'react-toastify' ;
import { useSelector} from 'react-redux'

const Register = ({history}) =>{
    const [email , setemail] = useState("");
    const {user} = useSelector((state) =>({...state}));

    useEffect(()=>{
        if(user && user.token) history.push("/") ;
    },[user,history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
           // url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            url: 'http://localhost:3000/RegisterComplete',
            handleCodeInApp: true,
        };


        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Email is sent to ${email} ,  Click the link to complete your registration.`);
        window.localStorage.setItem('emailRegistration', email);
        setemail("");


    };


    const RegisterForm = () =>  (

        <form onSubmit={handleSubmit}>
         <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) =>setemail(e.target.value) } autoFocus={true}/>
         <br></br>
       <center> <button type="submit" className="btn btn-raised">Register</button></center> 
         
    
        </form>
        );
    
 

    
    return(
        <div className="container p-5">
            <div className="row">
            
                <div className="col-md-6 offset-md-3">
                    <center><h1>Register</h1></center>   
                      {RegisterForm()}
                     
                </div>

            </div>
        </div>
    );
};
export default Register;
