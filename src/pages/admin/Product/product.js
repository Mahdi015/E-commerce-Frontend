import React ,{useEffect,useState} from 'react'
import AdminNav from '../../../component/nav/AdminNav'
import  {createProduct} from '../../../functions/product'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import Productcreatform from '../../../component/forms/productCreatForm'
import  {getCategories , getCategorySubs} from '../../../functions/categories'
import Fileupload from '../../../component/forms/fileupload'
import {LoadingOutlined} from '@ant-design/icons'
const ProductCreate = () =>{



const {user} = useSelector(state =>({...state}))
const inits = {
    title:'',
    description:'',
    price:'',
    category:'',
    categories:[],
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
const [showsub,setshowsub] = useState(false);
const [loading,setloading] = useState(false);



useEffect(()=>{
    loadcategory();
},[])
const loadcategory = () => getCategories().then((c)=>setvalues({...values,categories: c.data}));

const handlesubmit=(e) =>{
    e.preventDefault();

    createProduct(values,user.token)
    .then(res =>{
        console.log(res)
        window.alert(`${res.data.title} Is Created`);
        window.location.reload();
    })
    .catch(err=>{
        console.log(err)
      // if(err.response.status ===400) toast.error(err.response.data)
        toast.error(err.response.data.err)

    })
}


const handlechange=(e) =>{
    setvalues({...values , [e.target.name]: e.target.value})
    
}

const handlecategorychange=(e) =>{
    e.preventDefault()
    console.log('Sub Option',e.target.value)
    setvalues({...values ,subs:[], category: e.target.value})
    getCategorySubs(e.target.value)
    .then((res)=>{
        
        console.log('Sub Option',res)
        setsuboption(res.data)
        

    })
    setshowsub(true);

}

    return(
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><AdminNav/> </div>
            <div className="col-md-10">
            <h1> Product Create</h1>
            <br></br> 
                { loading ? <LoadingOutlined className='text-danger h1'/> : '' } 
               
                <div className='p-3'> <Fileupload values={values} setvalues={setvalues} setloading={setloading}/> </div>
               <Productcreatform handlesubmit={handlesubmit} handlechange={handlechange} values={values} setvalues={setvalues} handlecategorychange={handlecategorychange} suboption={suboption} showsub={showsub}/>
            </div>
            </div>
            </div>
    )

}
export default ProductCreate;