import React, { useState , useEffect} from 'react';
import {auth, GoogleAuthProvider} from '../../Firebase.js';
import {toast} from 'react-toastify' ;
import {Button} from 'antd'
import { MailOutlined , GoogleOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {creatOrUpdateUser} from '../../functions/auth'



const Login = ({history}) =>{
    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");
    const [loading , setloading] = useState(false);
    const {user} = useSelector((state) =>({...state}));
    useEffect(()=>{
        let intended = history.location.state
        if (intended){
            return;
        }else{
            if(user && user.token) history.push("/") ;
        }
       
    },[user,history])
    let dispatch = useDispatch();   



    const roleBasedRedirect = (res)=>{

        let intended = history.location.state
         if (intended) {
             history.push(intended.from)
         } else {
            if(res.data.role === 'admin' ){
                history.push('/admin/dash');
            }else{
                history.push('/user/dash');
            }
         }
     
    
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const result= await auth.signInWithEmailAndPassword(email , password);
            const {user} = result ;
            const idTokenResult = await user.getIdTokenResult();

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
                  roleBasedRedirect(res);
            })
            .catch((err)=>console.log(err));
          //  history.push("/")

            }catch(error){
            toast.error(error.message);
            
        }

    };

    const googlelogin = async () =>{
        auth.signInWithPopup(GoogleAuthProvider).then(async(result)=> {
            const {user} = result ;
            const idTokenResult = await user.getIdTokenResult();
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
                  roleBasedRedirect(res);
            })
                .catch();
             // history.push("/");
        })
        .catch((error) =>{
            setloading(false);
            toast.error(error.message); 
        }) ;
    };
    const LoginForm = () =>  (

        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <input type="email" className="form-control" placeholder="Enter E-mail" value={email} 
         onChange={(e) =>setemail(e.target.value) }  />
        </div>
         
        <div className="form-group">  <input type="password" className="form-control" placeholder="Enter Password" value={password}
          onChange={(e) =>setpassword(e.target.value) }/></div>
      
         <br></br>
       <center> <Button type="primary" className="mb-3" onClick={handleSubmit} block shape="round" icon={<MailOutlined/>} size="large" disabled={!email || password.length<6}>Login With E-mail /Password </Button></center> 
       <center> <Button type="danger" className="mb-3" onClick={googlelogin} block shape="round" icon={<GoogleOutlined/>} size="large" >Login With Google </Button></center> 
        <Link to='/ForgotPassword' className="float-right text-danger"> Forgot Password ?</Link> <br></br>
        <Link to='/Register' className="float-right text-blue"> Create an Account</Link>
    
        </form>
        );
    
 

    
    return(
        <div className="container p-5">
            <div className="row">
            
                <div className="col-md-6 offset-md-3">
                     
                 <center>  {loading ?  (<h4 className="text-danger">loading...</h4>) :  (<h4>Login</h4>)} </center>  
                      {LoginForm()}
                     
                </div>

            </div>
        </div>
    );
};
export default Login;
