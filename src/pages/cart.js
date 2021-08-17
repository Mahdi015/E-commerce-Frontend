import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import ProductInCheckOut from '../component/carts/productInCheckOut'
import { userCart } from '../functions/user'


const Cart = ({history}) =>{
let dispatch = useDispatch()
const {user,cart} = useSelector((state)=>({...state}))

const getTotal = () =>{
    return cart.reduce((curr,nxt)=>{
        return curr + nxt.count * nxt.price
    },0)

}
const saveOrderToDb =() =>{
   
    userCart(cart,user.token)
    .then((res)=>{
    console.log(res)
    if(res.data.ok)  history.push('/checkout')
    })
    .catch((err)=>console.log(err))
}

const showCartItems = () =>(
    <table className='table table-bordered'>
        <thead className='thead-dark'>
            <tr>
                <th scope='col'>Image</th>
                <th scope='col'>Title</th>
                <th scope='col'>Price</th>
                <th scope='col'>Brand</th>
                <th scope='col'>Color</th>
                <th scope='col'>Count</th>
                <th scope='col'>Shipping</th>
                <th scope='col'>Remove</th>
            </tr>
        </thead>
        {cart.map((p)=><ProductInCheckOut key={p._id} p={p}/>)}

    </table>
)

const savecod =() =>{
   dispatch({
       type :'COD',
       payload: true,
   })
    userCart(cart,user.token)
    .then((res)=>{
    console.log(res)
    if(res.data.ok)  history.push('/checkout')
    })
    .catch((err)=>console.log(err))
}


    return(
        <div className='container-fluid pt-2'>

        <div className='row'>
            <div className='col-md-8'>
                 <h4>Cart/{cart.length} Product</h4>
                {!cart.length ? <p>No Products On Cart . <Link to='/shop'>Continue Shopingn</Link></p> : showCartItems()}
            </div>
            <div className='col-md-4'>
                <h4>Order Sumury</h4>
                <hr></hr>
                <p>Products</p>
                {cart.map((c,i)=>(
                    <div key={i}><p> {c.title}*{c.count}=${c.price*c.count}</p> </div>
                ))}
                <hr></hr>
                Total : <b>${getTotal()}</b>
                <hr></hr>
                {user? (<><button onClick={saveOrderToDb} disabled={!cart.length} className='btn btn-sm btn-primary mt-2'>Proceed To Checkout</button>
                <br/>
                <button onClick={savecod} disabled={!cart.length} className='btn btn-sm btn-warning mt-2'>Pay Cash On Delivery</button>
                </>) :
                 (<button className='btn btn-sm btn-primary mt-2'><Link
                 to={{
                     pathname:'/login',
                    state:{from:'cart'},
                 }}
                 
                 > Login To Checkout

                 </Link></button>)
                 }
            </div>

        </div>

    </div>
    )


}

export default Cart 