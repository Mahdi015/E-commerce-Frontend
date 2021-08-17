import React, { useEffect, useState } from 'react'
import Productcard from '../../component/carts/productcard'
import { getsub } from '../../functions/sub'



const Subshome =({match}) =>{

const [sub,setsub] = useState([])
const [loading,setloading] = useState([])
const [product,setproduct] = useState([])
const {slug} = match.params
useEffect(()=>{
    setloading(true)
    getsub(slug).then((res)=>{
        console.log(JSON.stringify(res.data,null,4))
        setsub(res.data.readsub)
        setproduct(res.data.findproducts)
        setloading(false)
    })
},[])


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>

                    {loading ?  (<h4 className='text-center text-danger p-3 mt-5 mb-5 display-4 jumbotron'>Loading</h4>) :
                    (
                    <div className='text-center jumbotron p-2 mt-5 mb-5 display-4 font-weight-bold '>
                    {product.length} Products in '{sub.name}' Found 

                    </div>)
                    }

                </div>

            </div>
            <div className='row'>

                    {product.map((p)=>(
                        <div className='col' key={p._id}>
                        <Productcard product={p}/>
                        </div>
                    ))}

            </div>
        </div>
    )
}
export default Subshome