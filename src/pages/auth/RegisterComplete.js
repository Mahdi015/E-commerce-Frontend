import React, { useState, useEffect } from 'react';
import {auth} from '../../Firebase.js';
import {toast} from 'react-toastify' ;
import {useDispatch} from 'react-redux'
import {creatOrUpdateUser} from '../../functions/auth'






const RegisterComplete = ({history}) =>{
    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");

   //  const {user} = useSelector((state) =>({... state}));
    let dispatch = useDispatch();   

    useEffect(() => {
        setemail(window.localStorage.getItem("emailRegistration"));
    } , [history]  )

    const handleSubmit = async (e) => {
        // validation
        if(!email || !password){
            toast.error('Email and Password Required');
            return;
        }
        if(password.length <6 ){
            toast.error('Password Must Be At Least 6 Charachters');
            return;
        }
        e.preventDefault();
        try {
            const result = await auth.signInWithEmailLink(email , window.localStorage.href);
            if(result.user.emailVerified){
                // remove user email from local storage
                window.localStorage.removeItem('emailRegistration');
                // get user id token
                let user = auth.currentUser 
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                creatOrUpdateUser(idTokenResult.token)
                .then((res)=> {
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload:{
                          email: res.data.email,
                          token:idTokenResult.token,
                          name: res.data.name,
                          role: res.data.role,
                          _id: res.data._id,
                            
                
                        },
                      });
                })
                .catch((err)=>console.log(err));

                //redirect
                history.push('/');

            }

        }
        catch(error){
            toast.error(error.message)
        }


    };


    const CompleteRegisterForm = () =>  (

        <form onSubmit={handleSubmit}>
         <input type="email" className="form-control" placeholder="Enter E-mail" value={email} disabled />
         <br></br>
         <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)} autoFocus={true} />
         <br></br>
        <center><button type="submit" className="btn btn-raised">Complete Register</button></center> 
         
    
        </form>
        );
    
 

    
    return(
        <div className="container p-5">
            <div className="row">
            
                <div className="col-md-6 offset-md-3">
                   <center><h1>Complete Register</h1></center> 
                      {CompleteRegisterForm()}
                     
                </div>

            </div>
        </div>
    );
};
export default RegisterComplete;
