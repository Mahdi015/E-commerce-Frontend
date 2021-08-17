import React, { useState } from 'react'
import UserNav from '../../component/nav/UserNav'
import {auth} from '../../Firebase'
import { toast } from 'react-toastify'
const Password = () =>{
const [password,setpassword] = useState('');
const [loading, setloading] = useState(false)

const handlesubmit = async (e)=>{
    e.preventDefault();
    setloading(true)
    await auth.currentUser.updatePassword(password)
    .then(()=>{
        setloading(false)
        setpassword('')
        toast.success('Password Updated')

    })
    .catch((err)=>{
        setloading(false)
        toast.error(err.message)
    })
}

const updatepassform = () =>(
    <form onSubmit={handlesubmit}>

<div className="form-group">
    <label></label>
    <input type="password" onChange={e=>setpassword(e.target.value)}
     className="form-control" placeholder="Enter New Password" disabled={loading} value={password} autoFocus={true}/> <br></br>
     <center><button className="btn btn-primary" disabled={!password || loading || password.length<6}>Change Password</button></center>
</div>
</form>

)


    return(
        <div className="container-fluid">

             <div className="row">
            <div className="col-md-2"><UserNav/> </div>
            <div className="col-md-4">
      {loading ? (<h1 className="text-danger">Loading...</h1>):(<h1> Update Password</h1>) }   
          {updatepassform()}
            </div> 

        </div>

    </div>
    )
  
}

export default Password;