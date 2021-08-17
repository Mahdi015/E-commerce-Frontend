import React ,{useEffect,useState} from 'react'
import AdminNav from '../../../component/nav/AdminNav'
import  { updateproduct,getProduct} from '../../../functions/product'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import  {getCategories , getCategorySubs} from '../../../functions/categories'
import Fileupload from '../../../component/forms/fileupload'
import {LoadingOutlined} from '@ant-design/icons'

import Productupdateform from '../../../component/forms/productupdateform'


const ProductUpdate = ({match,history}) =>{
    const inits = {
        title:'',
        description:'',
        price:'',
        category:'',
        subs:[],
        shipping:'',
        quantity:'',
        images:[],
        brands:['Cats','Dogs','Birds','Hamster','Monkey'],
        colors:['Black','Brown','Silver','White','Blue'],
        color:'',
        brand:'',
    }
const [values,setvalues] = useState(inits);
const [suboption,setsuboption] = useState([]); 
const [selectedcategory,setselectedcategory] = useState('');  
const {user} = useSelector(state =>({...state}))
const [categories,setcategories] = useState([])
const [arrayofsubs,setarrayofsubs] = useState([])
const [loading,setloading] = useState(false);



const {slug} = match.params

useEffect(()=>{
    loadProduct()
    loadcategory()
},[])

const loadProduct =() =>{
    getProduct(slug).then((p)=>{   
    setvalues({...values , ...p.data})
    getCategorySubs(p.data.category._id).then((res)=>{
    setsuboption(res.data)
    })
    let arr = []
    p.data.subs.map((s)=>{arr.push(s._id)
    })
    setarrayofsubs((prev)=>arr)
    })
  
    
}




const handlesubmit =(e) =>{
    e.preventDefault()
    setloading(true)
    values.subs = arrayofsubs
    values.category = selectedcategory ? selectedcategory : values.category


    updateproduct(slug,values,user.token)
    .then((res)=>{
        setloading(false)
        toast.success(`${res.data.title} Is Updated`)
        history.push('/admin/products')

    })
    .catch((err)=>{
        setloading(false)
        console.log(err)
        toast.error(err.response.data.err)

    })
}


const handlechange=(e) =>{
    setvalues({...values , [e.target.name]: e.target.value})
    
}

const loadcategory = () => getCategories().then((c)=>setcategories(c.data))
const handlecategorychange=(e) =>{
    console.log('clicked',e.target.value)
    console.log('9dim',values.category._id)
    setarrayofsubs([])
    e.preventDefault()
    console.log('Sub Option',e.target.value)
    setvalues({...values ,subs:[]}) 
    setselectedcategory(e.target.value)
    getCategorySubs(e.target.value)
    .then((res)=>{
        
        console.log('Sub Option',res)
        setsuboption(res.data)
        

    })
    if (values.category._id === e.target.value){
        loadProduct()
    }
  

}


    return(
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><AdminNav/> </div>
            <div className="col-md-10">
            <h1> Product Update</h1>
            <br></br> 
         {JSON.stringify(slug)} 
         { loading ? <LoadingOutlined className='text-danger h1'/> : '' } 
         <Fileupload values={values} setvalues={setvalues} setloading={setloading}/> 
              <Productupdateform handlesubmit={handlesubmit} handlechange={handlechange} values={values}
               setvalues={setvalues} handlecategorychange={handlecategorychange} categories={categories} 
               setsuboption={setsuboption}suboption={suboption} arrayofsubs={arrayofsubs} setarrayofsubs={setarrayofsubs} selectedcategory={selectedcategory}/>
               
            
              
            </div>
            </div>
            </div>
    )

}
export default ProductUpdate;