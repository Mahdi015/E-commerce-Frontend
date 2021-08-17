import React, { useState , useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { CardElement , useStripe , useElements} from '@stripe/react-stripe-js'
import { createPaymentIntent } from '../functions/stripe'
import { Link } from 'react-router-dom'
import {Card} from 'antd'
import {DollarOutlined, CheckOutlined} from '@ant-design/icons'
import { createOrder, emptyUSerCart } from '../functions/user'


const StripeCheckout = ({history})  =>{
    const dispatch = useDispatch()
    const {user , coupon} = useSelector((state)=>({...state})) ;

    const [succeeded,setsucceeded] = useState(false)
    const [error,seterror] = useState(null)
    const [processing,setprocessing] = useState('')
    const [disabled,setdisabled] = useState(true)
    const [clientSecret,setclientSecret] = useState('')
    const [cartTotal,setcartTotal] = useState(0)
    const [totalAfterDiscount,settotalAfterDiscount] = useState(0)
    const [payable,setpayable] = useState(0)
    const stripe = useStripe()
    const elements = useElements()
   

const test = () =>{
  createPaymentIntent(user.token,coupon)
  .then((res)=>{
      console.log(res.data)
      setclientSecret(res.data.clientSecret)
      setcartTotal(res.data.cartTotal)
      settotalAfterDiscount(res.data.totalAfterDiscount)
      setpayable(res.data.payable)
  })
}
    useEffect(()=>{ 
      if(user){
        test();
      }
      
       
    },[user]);
    const cartStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };
    const handleSubmit= async (e) =>{
      e.preventDefault()
      setprocessing(true)
      const payload = await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
          card : elements.getElement(CardElement),
          billing_details:{
            name : e.target.name.value
          }
        }
      })
      if(payload.error){
        seterror(`Payment Failed ${payload.error.message}`)
      }else{
        createOrder(user.token,payload)
        .then((res)=>{
          if(res.data.ok){
            if(typeof window !=='undefined') localStorage.removeItem('cart');
            dispatch({
              type:'ADD_TO_CART',
              payload: [],
            })
            dispatch({
              type:'COUPON_APPLIED',
              payload: false,
            })
            emptyUSerCart(user.token)
          }
        })
        seterror(null)
        setprocessing(false)
        setsucceeded(true)
      }
    }



    const handleChange= async (e) =>{
      setdisabled(e.empty)
      seterror(e.error ? e.error.message : '')
    }
    return(
       <>
       {!succeeded && <div>
         {coupon && totalAfterDiscount !== undefined ? (<p className='alert alert-success'>{`Total After Discount $${totalAfterDiscount}`}</p>)  : (<p className='alert alert-danger'>No Coupon Applied</p>) }
       </div>}
       <div className='text-center pb-5'>
          <Card  actions={[
            <>
            <DollarOutlined className='text-info'/>  <br/> Total:${cartTotal}
            </>,
              <>
            <CheckOutlined className='text-info'/>  <br/> Total Payable:${(payable /100).toFixed(2)}
            </>,
          ]}/>
       </div>
       <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
            <CardElement id='card-element' options={cartStyle} onChange={handleChange}/>
                <button className='stripe-button' disabled={processing || disabled || succeeded}>
                    <span id='button-text'>
                        {processing ? <div className='spinner' id='spinner'></div>:'Pay'}
                    </span>
                </button>
                <br/>
           {error && <div className='card-error' role='alert'>{error}</div> }

           <p className={succeeded ? 'result-message' : 'result-message hidden'}>Paymen Succeeded.<Link to='/user/history'>History</Link></p>

       </form>      
       </>
    )
}

export default StripeCheckout