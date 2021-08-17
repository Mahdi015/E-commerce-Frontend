
import React , {useEffect, useState} from 'react'
import { getUserCart , emptyUSerCart , addUserAdresse , getUserAdresse,applyCoupon, createcashorder} from '../functions/user'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Checkout = ({history}) =>{
const dispatch = useDispatch()
const [products,setproducts] = useState([])
const [total,settotal] = useState(0)
const [adresse,setadresse] = useState([])
const [button,setbutton] = useState(false)
const [coupon,setcoupon] = useState('')
const [totalAfterDiscount,settotalAfterDiscount] = useState(0)
const [discountErr,setdiscountErr] = useState('')
const {user,cod} = useSelector((state)=>({...state}))
const couponState = useSelector((state)=>(state.coupon))

useEffect(()=>{
    getUserCart(user.token)
    .then((res)=>{
        console.log('user cart', JSON.stringify(res.data,null,4))
        setproducts(res.data.products)
        settotal(res.data.cartTotal)
    })

    getUserAdresse(user.token)
    .then((res)=>{
        setadresse(res.data.adresse)
        setbutton(true)    
    })
},[])
useEffect(()=>{
     if (adresse.length <15){
        console.log(adresse.length )
        setbutton(false)}
    // }else{
    //     setbutton(true)
    // }
 },[adresse])


const emptyCart = () =>{
    if (typeof window !==undefined) {
        localStorage.removeItem('cart')
    }
    dispatch({
        type:'ADD_TO_CART',
        payload:[],
    })
    emptyUSerCart(user.token)
    .then((res)=>{
    setproducts([])
    settotal(0)
    toast.success('Cart is Empty.Continue Shoping')
    })
    settotalAfterDiscount(0)
    setcoupon('')
}

const saveAdresseToDB =()=>{
    if ( adresse.length<15){
        toast.error('Adresse Must Be Contain More Then 15 Character')
        return;
    }
    addUserAdresse(user.token,adresse)
    .then((res)=>{
        if(res.data.ok){
        setbutton(true)
        toast.success('Adresse Saved !!')
        }else{
        setbutton(false)
        toast.error('Adresse Must Be Contain More Then 15 Character')
        }
    })
    .catch((err)=>{
        toast.error(err)
    })
}

const showAdresse = () =><>
    <ReactQuill theme='snow' value={adresse} onChange={setadresse}/>
    <button className='btn btn-primary mt-2' onClick={saveAdresseToDB}>Save</button> </>

const showPrdouctSumary = () =><>
    {products.map((p,i)=>(
                    <div key={i}>
                        <p>{p.product.title} {p.color} * {p.count} =  {p.product.price * p.count}
                            
                        </p>
                    </div>
                ))}
                </>

const handleApply = () => {
    applyCoupon(user.token,coupon)
    .then((res)=>{
        console.log(res.data)
        if(res.data){
            settotalAfterDiscount(res.data)
            dispatch({
                type : "COUPON_APPLIED",
                payload : true,
            })
        }
        //error
        if(res.data.err){
            setdiscountErr(res.data.err)
            dispatch({
                type : "COUPON_APPLIED",
                payload : false,
            })
        }
    })
}

const showApplyCoupon = () =>(
    <>
    <input type='text' className='form-control' onChange={(e)=>{setcoupon(e.target.value); setdiscountErr('') }}value={coupon}/>
    <button className='btn btn-primary mt-2' onClick={handleApply}>Apply</button>
    </>
)

const createcod = () =>{
    createcashorder(user.token,couponState)
    .then((res)=>{
        console.log(couponState)
        // / reset cod , redirect
        if (res.data.ok){
            //empty redux
            dispatch({
                type:'ADD_TO_CART',
                payload:[],
            })
            //empty localstorage
            if (typeof window !==undefined) {
                localStorage.removeItem('cart')
            }
            //reset coupon
            setcoupon('')
            //reset cod state   
            dispatch({
                type :'COD',
                payload: false,
            })
            //empty cart from backend
            emptyUSerCart(user.token)
            //toast
            toast.success('Order Suceeded')
            //resirect
            setTimeout(()=>{
                history.push('user/dash')
            },1000)
            
        }
    })
}
    return(
        <div className='row'>
            <div className='col-md-6'>
                <h4>Adresses Delivery</h4>
                <br></br>
                <br></br>
                {showAdresse()}
                <hr></hr>
                <h4>Got Coupon</h4>
                <br></br>
                {showApplyCoupon()}
                <br/>
                {discountErr && <p className='bg-danger p-2'>{discountErr}</p>}
            </div>
            <div className='col-md-6'>
                <h4>Order Summary</h4>
                <h1></h1> 
               
                <hr></hr>
                <p> {products.length} Products</p>
                <hr></hr>
                {showPrdouctSumary()}
                <hr></hr>
                <p>Cart Total : {total}</p>
                {totalAfterDiscount>0 && (
                    <p className='bg-success p-2'>
                        Discount Applied Total Price : {totalAfterDiscount}
                    </p>
                )}
                <div className='row'>
                    <div className='col-md-6'>
                        {cod ?  (<button disabled={!button || !products.length} className='btn btn-primary' 
                        onClick={createcod}>Place Order</button>)
                        :
                        (<button disabled={!button || !products.length} className='btn btn-primary' 
                        onClick={()=>history.push('/payment')}>Place Order</button>)}                  
                        <button disabled={! products.length} onClick={emptyCart} className='btn btn-primary'>Empty Cart</button>
                    </div>

                </div>
             
            </div>

        </div>
    )

}


export default Checkout