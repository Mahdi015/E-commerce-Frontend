import React,{useEffect,useState} from 'react'
import Adminproducttcart from '../../../component/carts/adminproductscart'
import AdminNav from '../../../component/nav/AdminNav'
import { getProductsByCount } from '../../../functions/product'
import { removeProduct } from '../../../functions/product'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


const AdminDash = () => {

const [products,setproducts] = useState([])
const [loading,setloading] = useState(false)
const {user} = useSelector(state =>({...state}))

useEffect(()=>{
 loadAllProducts()
},[])
const loadAllProducts = () =>{
    setloading(true)
    getProductsByCount(10)
    .then((res) =>{
        setproducts(res.data)
        setloading(false)
    })
    .catch((err) => {
        console.log(err)
        setloading(false)

    })
}

const handleremove = (slug) =>{
    if(window.confirm('Delete?')){
        removeProduct(slug,user.token)
        .then((res)=>{
            loadAllProducts()
            toast.success(`${res.data.title} is removed`)
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status ===400) toast.error(err.response.data)
            
        })
        
    }
    

}

    return (
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><AdminNav/> </div>
            <div className="col">   
            {loading ?  <h4 className='text-danger'>Admin Dashboard</h4>    :  <h4>All Products</h4>}
        
           <div className='row'>
           {products.map((product) =>(
                <div className='col-md-4 pb-3'key={product._id}><Adminproducttcart product={product} handleremove={handleremove} /></div>
                ))}

           </div>

            
            </div>

        </div>

    </div>
    )
}

export default AdminDash ; 