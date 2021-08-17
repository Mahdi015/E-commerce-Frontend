import React, { useEffect, useState } from 'react'
import UserNav from '../../component/nav/UserNav'
import { getUserOrders } from '../../functions/user'
import  {useSelector } from 'react-redux'
import  {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'
import ShowPaymentInfo from '../../component/carts/ShowPaymentInfo'
import {  PDFDownloadLink} from '@react-pdf/renderer';
import Invoice from '../../component/order/Invoice'

const UserDash = () =>{
const [orders,setorders] = useState([])
const {user} = useSelector((state)=>({...state}))

const loadUSerOrders = () =>{
    getUserOrders(user.token)
    .then((res)=>{
        console.log(JSON.stringify(res.data,null,4));
        setorders(res.data);
    })
}

useEffect(()=>{
    loadUSerOrders();
},[])

const showOrderInTable = (o) =>(
    <table className='table table-bordered'>
        <thead className='thead-light'>
            <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Price</th>
                <th scope='col'>Brand</th>
                <th scope='col'>Color</th>
                <th scope='col'>Count</th>
                <th scope='col'>Shipping</th>
            </tr>
        </thead>
        
        <tbody>
            {o.products.map((p,i)=>(
                <tr key={i}>
                    <td><b>{p.product.title}</b></td>
                    <td>{p.product.price}</td>
                    <td>{p.product.brand}</td>
                    <td>{p.color}</td>
                    <td>{p.count}</td>
                    <td>{p.product.shipping ==='Yes' ? (<CheckCircleOutlined className='green'/> ) : (<CloseCircleOutlined className='red'/>)}</td>
                </tr>
            ))}
        </tbody>

    </table>

)

const showDownloadLink = (o) =>(
    <PDFDownloadLink document={
            <Invoice o={o}/>
    } fileName='Payment' className='btn btn-sm btn-block btn-outline-primary'>
       Download PDF
    </PDFDownloadLink>
);



const showEachOrders = () =>(
    orders.map((o,i)=>(
        <div key={i} className="m-5 p-3 card">
            <ShowPaymentInfo o={o}/>
            {showOrderInTable(o)}
            <div className='row'>
                <div className='col'>
                    {showDownloadLink(o)}
                </div>
            </div>
        </div>
    )))

    return(
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><UserNav/> </div>
            <div className="col text-center">
            <h4> {orders.length >0 ? 'User Purchase History' : 'No Purchase '}</h4>  
            {showEachOrders()}
            </div>

        </div>

    </div>
    )
  
}

export default UserDash;