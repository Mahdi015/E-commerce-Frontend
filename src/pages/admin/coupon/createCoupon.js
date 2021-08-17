import React , {useState,useEffect}from 'react'
import { useSelector , useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import DatePicker from "react-datepicker";
import { getCoupons, removeCoupon , createCoupon } from '../../../functions/coupon';
import "react-datepicker/dist/react-datepicker.css";
import {DeleteOutlined} from '@ant-design/icons'
import AdminNav from '../../../component/nav/AdminNav';




const CreateCouponPage = () =>{

const [name,setname]=useState('')
const [expiry,setexpiry]=useState(new Date());
const [discount,setdiscount]=useState('')
const [loading,setloading]=useState(false)
const [coupons,setcoupons] = useState([])

//redux
const {user} = useSelector((state)=>({...state}))


const handleSubmit = (e) =>{
    console.log(user.token)
    e.preventDefault()
    createCoupon({name,expiry,discount},user.token)
    .then((res)=>{
        setloading(false)
        setname('')
        setdiscount('')
        setexpiry('')
        toast.success(`${res.data.name} is created`)
        getCoupons().then((res)=>setcoupons(res.data))
    
    })
    .catch((err)=>{
        setloading(false)
        console.log(err)
    })

}
useEffect(()=>{
    getCoupons().then((res)=>setcoupons(res.data))
},[])

const handleRemove = (cid) =>{
    if (window.confirm('Remove?')){
        setloading(true)
        removeCoupon(cid,user.token)
        .then((res)=>{
            getCoupons().then((res)=>setcoupons(res.data))
            setloading(false)
            toast.success(`${res.data.name} is Deleted`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
    return(

        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col-md-10'>
                    {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4>Coupon</h4>)}
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label className='text-muted'>
                                Name
                            </label>
                            <input type='text' className='form-control' onChange={(e)=>setname(e.target.value)} value={name} autoFocus required/>
                        </div>
                        <div className='form-group'>
                            <label className='text-muted'>
                                Discount %
                            </label>
                            <input type='text' className='form-control' onChange={(e)=>setdiscount(e.target.value)} value={discount}  required/>
                        </div>  
                        <div className='form-group'>
                            <label className='text-muted'>
                                Expiry
                            </label>
                            <br/>
                            <DatePicker className='form-group' selected={expiry} value={expiry} onChange={(date)=>setexpiry(date)}/>
                        </div>  
                        <button className='btn btn-outline-primary'>Save</button>
                    </form>
                    <h4>{coupons.length} Coupons</h4>

                    <table className='table table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th scope='col'  width="15%" >Name</th>
                                <th scope='col' className='text-center'>Discount%</th>
                                <th scope='col' className='text-center'>Expiry</th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((c)=><tr key={c._id}>
                                <td >{c.name}</td>
                                <td className='text-center'>{c.discount}%</td>
                                <td className='text-center'>{new Date(c.expiry).toLocaleDateString()}</td>
                                <td className='text-center'><DeleteOutlined className='text-danger pointer ' onClick={()=>handleRemove(c._id)}      /></td>
                            </tr>)}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>


    )

}

export default CreateCouponPage