import React, { useEffect, useState } from 'react'
import Singelproducts from '../component/carts/singelproduct'
import {getProduct,getRelated,productstart} from '../functions/product'
import {useSelector} from 'react-redux'
import Productcard from '../component/carts/productcard'





const Viewproduct =({match}) =>{

    const {user} = useSelector(state =>({...state}))
    const [product,setproduct] = useState({})
    const [related,setrelated] = useState([])
    const [star,setstar] = useState(0)
    const {slug} = match.params
    useEffect(()=>{
        loadProduct();
    },[slug])
    useEffect(()=>{
       if(product.ratings &&  user){
            let existingRatingObjecct  = product.ratings.find((ele)=>ele.postedBy.toString() === user._id.toString())
            existingRatingObjecct  && setstar(existingRatingObjecct.star)
            
        }
        
    }, [product.ratings, user])

    const loadProduct=() =>{
        getProduct(slug).then((res)=>{
            setproduct(res.data)
            getRelated(res.data._id).then(r=>{
                setrelated(r.data)
                console.log(r.data)
                })
        })
    }
    const starClick =(newRating,name) =>{
        setstar(newRating)
       console.log(newRating,star)
        productstart(name,newRating,user.token)
        .then(res =>{
            console.log(res.data)
            loadProduct()
        })
        .catch(err=>{
            console.log(err)
          // if(err.response.status ===400) toast.error(err.response.data)
            
    
        })
        //loadProduct()
        

    }
    return(
        <div className='container-fluid'>
            <div className='row pt-4'>
                <Singelproducts product={product} starClick={starClick} star={star}/>
            </div>
            
            <div className='row'>
                <div className='col text-center pt-5 pb-5'>
                    <hr/>
                     <h1>Related Products</h1>
                    <hr/>
                </div>
             </div>
             <div className='row pb-5'>
                {related.length ?  related.map((r)=><div key={r._id} className='col-md-3   '> <Productcard product={r}/> </div>)  : <div className='text-center col'>No Product Found</div> }
             </div>
        </div>
    )

}


export default Viewproduct 