import React from 'react'

const categoryform = (props) =>  (
    <form onSubmit={props.handlesubmit}>
    <div className='form-group'>
    <label>Name</label>
    <input type='text' className='form-control' onChange={(e)=>props.setname(e.target.value)} value={props.name} autoFocus required/> 
    <button className='btn btn-outline-primary'>Add Category </button>

    </div>
</form>

);
    
  



export default categoryform;