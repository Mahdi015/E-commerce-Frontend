import React from 'react'





const ShowPaymentInfo = ({o,showStatus=true}) =>(

        <div>
            <p>

            <b><span>Order Amount : {(`${o.paymentIntent.amount} $`)}</span>{''} <br/></b>
            <span>Method : {o.paymentIntent.payment_method_types[0]}</span>{' - '}
            <span>Payment : {o.paymentIntent.status}</span>{' - '}
            <span>Order On : {new Date ( o.paymentIntent.created * 1000).toLocaleString()}</span>
            {showStatus  ? (<>-<span> Status : <span className='badge bg-primary text-white bold font-weight-bold'>{o.orderStatus}</span></span></>) : ('')}
            </p>
        </div>


)





export default ShowPaymentInfo