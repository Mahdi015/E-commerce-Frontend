import React , {useState,useEffect}from 'react'
import AdminNav from '../../component/nav/AdminNav'
import { changeStatus, getOrders } from '../../functions/admin'
import { useSelector,useDispatch,  } from 'react-redux'
import {toast} from 'react-toastify'
import Orders from '../../component/order/adminOrders'

const AdminDash = () => {

const [orders,setorders] = useState([])
const {user} = useSelector((state)=>({...state}))


const loadOrders = () =>{

    getOrders(user.token)
    .then((res)=>{
        console.log(JSON.stringify(res.data,null,4))
        setorders(res.data)
    })
}
useEffect(()=>{
    loadOrders();
},[])

const handleStatusChange = (orderId,orderStatus)=>{
    changeStatus(orderId,orderStatus,user.token)
    .then((res)=>{
        toast.success('Status Chenged')
        loadOrders()
    })
}

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2"><AdminNav/> </div>
            <div className="col">   
            <h4>Admin Dashboard</h4> 
                <Orders orders={orders} handleStatusChange={handleStatusChange}/>   
            </div>
        </div>
    </div>
    )
}

export default AdminDash ; 