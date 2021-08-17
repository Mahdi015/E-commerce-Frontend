import React, { useEffect , useState } from 'react'
import UserNav from '../../component/nav/UserNav'
import {   getWhishList, removeWhishList } from '../../functions/user'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'

const WhishList = () =>{

const {user} = useSelector((state)=>({...state}))
const [wishlist,setwishlist] = useState([])

const loadWhishlist =() =>{
    getWhishList(user.token)
    .then((res)=>{
        console.log(res.data)
        setwishlist(res.data.wishlist)
        
    })

}
useEffect(()=>{
    loadWhishlist();
},[])

const handleRemove = (productId)=>{
    removeWhishList(productId,user.token)
    .then((res)=>{
        loadWhishlist()
    })
}

    return(
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><UserNav/> </div>

            <div className='col'>
                <h2>Whishlist Page</h2>
               { wishlist &&wishlist.length && wishlist[0]   ? (wishlist.map((w)=>(
                    <div key={w._id} className='alert alert-secondary'>
                        <Link to={`/product/${w.slug}`}>{w.title}</Link>
                        <span className='btn btn-sm float-right' onClick={()=>handleRemove(w._id)}><DeleteOutlined/></span>
                    </div>
                ))
                ) : (<h2 className='pt-5'>No Product On Whishlist <Link to='/shop'>Continue Shoping</Link></h2>)}
            </div>
        
        </div>

    </div>
    )
  
}

export default WhishList;