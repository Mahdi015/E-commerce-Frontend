import React,{useEffect,useState} from 'react'
import Loadingcard from '../carts/loadingcard';
import Productcardform from '../carts/productcard';
import { getProducts,  getproductsCount } from '../../functions/product';
import {Pagination} from 'antd'






const Newarrivals = () =>{



const [products,setproducts] = useState([])
const [loading,setloading] = useState(false)
const [page,setpage] = useState(1)
const [productscount,setproductscount] = useState(0)

    useEffect(()=>{
        loadAllProducts()
       },[page])

    useEffect(()=>{

        getproductsCount().then(res=>setproductscount(res.data))
    },[])
    const loadAllProducts = () =>{
        setloading(true)
        getProducts('createdAt','desc',page)
        .then((res) =>{
            setproducts(res.data)
           setloading(false)
        })
        .catch((err) => {
            console.log(err)
           setloading(false)
    
        })
    }


 return(

 <>

<div className='container'>

{loading ? 
    <div className='row'>
    {products.map((product)=>
    (<div key={product._id} className='col-md-4'>
    <Loadingcard/>
    </div>
    ))}
    </div> 

: 
    <div className='row'>
    {products.map((product)=>
    (<div key={product._id} className='col-md-4'>
    <Productcardform product={product} />
    </div>
    ))}

   </div>
}

   </div>
  <div className='row'>
  <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>
  <Pagination  current={page} total={(productscount / 3 ) *10}  onChange={(value)=>setpage(value)}/>
  </nav>

  </div>
 
   </>
       
    );
};
export default Newarrivals; 
