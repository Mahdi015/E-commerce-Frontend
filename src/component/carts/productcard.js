import React, { useState } from 'react'
import {Card , Tooltip} from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import download from '../../Images/download.png'
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/ratings';
import _, { uniqBy } from 'lodash'
import { useSelector,useDispatch } from 'react-redux';


const {Meta} = Card



const Productcardform =({product}) =>{

const dispatch = useDispatch()
const {user , cart} = useSelector((state)=>({...state}))

const [tool,settool] = useState('Click To Add')
const {images,title,description,slug,price} = product

const handleAddToCart = () =>{
  let cart  = []
  if(typeof window !== 'undefined'){
    //Get cart from loclal
    if (localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    //Add new cart
    cart.push({
      ...product,
      count : 1,
    })
    //remove duplicate
    let unique = _.uniqWith(cart,_.isEqual)
    //save to local storage
    localStorage.setItem("cart", JSON.stringify(unique))
    settool('Added')

    //Add to redux state

    dispatch({
      type : 'ADD_TO_CART',
      payload : unique,
    })
    //Show cart on cart drawer 
    dispatch({
      type : 'SET_VISIBLE',
      payload : true,
    })
  }
}
const doNothing =() =>{}

    return(
      
      <>
  { product && product.ratings && product.ratings.length>0 ?
  showAverage(product) :
   <div 
   className='text-center pt-1 pb-3'>No Ratings Yet
   </div>
  }




    <Card cover={<img  src={images && images.length ? images[0].url : download }  style={{height:'150px',objectFit:'cover'}} className='p-1' />} 
    actions={[<Link to={`/product/${slug}`}><EyeOutlined  className='text-warning' /> <br></br> View Products </Link> , <Tooltip title={tool}><a disabled={product.quantity<1}   onClick={product.quantity<1 ?  (doNothing) : (handleAddToCart) } ><ShoppingCartOutlined className='text-danger'/> <br></br>{product.quantity<1 ? 'Out Of Stock' : 'Add To Cart'}</a> </Tooltip> , ]}   >
  <Meta  title={`${title}  -$${price}`} description={`${description && description.substring(0,2)}....`} />

  </Card>
  </>
    )
}

export default Productcardform;