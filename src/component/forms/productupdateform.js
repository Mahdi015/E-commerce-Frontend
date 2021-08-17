import React from 'react'
import { Select, Radio } from 'antd';
import {Avatar} from 'antd'


const { Option } = Select;


const Productupdateform = ({handlesubmit,handlechange,values,setvalues,handlecategorychange,categories,setsuboption,suboption,arrayofsubs,setarrayofsubs,selectedcategory}) => {

    const {title,description,price,category,subs,shipping,quantity,images,brands,colors,color,brand}=values;


    return(


        
  <form onSubmit={handlesubmit}>
  <div className='form-group'>
  <label>Title</label>
  <input type='text' name='title' className='form-control' value={title} onChange={handlechange}/>

  </div>

  <div className='form-group'>
  <label>Description</label>
  <input type='text' name='description' className='form-control' value={description} onChange={handlechange}/>

  </div>
  <div className='form-group'>
  <label>Price</label>
  <input type='number' name='price' className='form-control' value={price} onChange={handlechange}/>

  </div>

  <div className='form-group'>
  <label>Shiping</label>
  <select name='shipping' className='form-control' onChange={handlechange} value={shipping}>
  <option value=''>Select Option</option>
  <option value='No'>No</option>
  <option value='Yes'>Yes</option>
  </select>
  </div>


  <div className='form-group'>
  <label>Quantity</label>
  <input type='number' name='quantity' className='form-control' value={quantity} onChange={handlechange}/>
  </div>


  <div className='form-group'>
  <label>Color</label>
  <select name='color' className='form-control' onChange={handlechange} value={color}>
  {colors.map(c=> <option key={c} value={c}>{c}</option>)}
  </select>
  </div>


  <div className='form-group'>
  <label>Brand</label>
  <select name='brand' className='form-control' onChange={handlechange} value={brand}>
  {brands.map(b=> <option key={b} value={b}>{b}</option>)}
  </select>
  </div>







 <div className='form-group'>
 <label>Category</label>
 <select name='category' className='form-control' onChange={handlecategorychange}  value={selectedcategory ? selectedcategory : category._id} >
  {categories.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)}
  </select>
    </div>

           
            
    <div className='form-group'>
            <label>Sub Category</label>
           <Select mode='multiple' style={{width:'100%'}} placeholder='Select Subs' onChange={(value)=>setarrayofsubs(value)} value={arrayofsubs} >
            {suboption.length && suboption.map((c)=><Option key={c._id} value={c._id}>{c.name}</Option>)}

           </Select>
           
            

            
          
            </div>
            
          
          
            <br></br>
      
     
  <button className='btn btn-outline-info'>Save </button>
  
     
  </form>

    )




}



              




export default Productupdateform