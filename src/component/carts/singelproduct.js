import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card , Tabs , Tooltip } from 'antd'
import React , {useState}from 'react'
import { Link, useHistory } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import download from '../../Images/download.png'
import Productlistitem from './productitetms';
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/ratingmodal';
import { showAverage } from '../../functions/ratings';
import { useSelector,useDispatch } from 'react-redux';
import _, { uniqBy } from 'lodash'
import { addWhishList } from '../../functions/user';
import {toast} from 'react-toastify'

const {Meta} = Card 
const {TabPane} = Tabs
const Singelproducts =({product,starClick,star}) =>{
    const dispatch = useDispatch()
    const {user , cart} = useSelector((state)=>({...state}))
    const [tools,settools] = useState('Click To Add')
    const [text,settext] = useState('Click')
    const {title,images,description,_id} = product
    let history = useHistory()
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
          settools('Added')
      
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


const addWhish = (e) =>{
  e.preventDefault(e)
  addWhishList(user.token,product._id)
  .then((res)=>{
    settext("Added")
    toast.success(`${product.title} Added To Whishllist`)
    //console.log(res.data)
    history.push('/user/WhishList')
  })
}
    return(
        <>
       
        <div className='col-md-7'>
            <Carousel showArrows={true} autoPlay infiniteLoop>
                {images && images.length ? images.map((i)=><img  src={i.url} key={i.public_id}/>) : <img src={download} />}
            </Carousel>
            <Tabs type='card'>
            <TabPane tab='Description' key='1'>{description && description} </TabPane>
            <TabPane tab='Contact' key='2'>Call Us on Nik ZEbi6969</TabPane>

            </Tabs>
        </div>

        <div className='col-md-5'>
        <h1 className='bg-info p-2 text-center'>{title}</h1>
        {product && product.ratings && product.ratings.length>0 ? showAverage(product) : <div className='text-center pt-1 pb-3'>No Ratings Yet</div>}
        
     
           <Card  
             actions={[
               
             <Tooltip title={tools}><a  onClick={handleAddToCart} ><ShoppingCartOutlined className='text-danger'/>
              <br></br> Add To Cart</a> </Tooltip>
                
                 ,
                 <Tooltip title={text}>
                     <a   onClick={addWhish}>
                    <HeartOutlined className='text-info' /> <br/> Add To Wishlist
                    </a>
                 </Tooltip>
                 ,
                 <RatingModal>
                         <StarRatings
                            rating={star}
                            starRatedColor="blue"
                            changeRating={starClick}
                            numberOfStars={5}
                            name={_id}
                            isSelectable={true}
                          />
                 </RatingModal>
             ]}
             >
               <Productlistitem  product={product}/>
           </Card>
        </div>

    </>
    )

}

export default Singelproducts;