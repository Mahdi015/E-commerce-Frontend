import React from 'react'
import ShowPaymentInfo from '../carts/ShowPaymentInfo'
import  {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'
const Orders = ({orders,handleStatusChange}) =>{

const style =(o) =>{
    switch(o.orderStatus) {
        case 'Processing':
            return 'card text-white bg-primary mb-3'
        case 'Dispatched':
            return 'card text-white bg-primary mb-3'
        case 'Cancelled':
            return 'card text-white bg-danger mb-3'
        case 'Completed':
            return "card text-white bg-success mb-3"
        case 'Not Processed':
            return 'card bg-light mb-3'
        default:
            return 'card bg-light mb-3'
      }
}
 
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
return(
    <>
        {orders.map((o)=>(
            <div key={o._id} className='row pb-5'>
                <div className={style(o)}>
                <ShowPaymentInfo o={o} showStatus={false}/>

              <div className='row'>
                <div className='col-md-4'>
                    Delivery Status :
                    
                </div>
                
                    <div class="input-group pt-2 mb-3">
                  
                        <select class="custom-select" id="inputGroupSelect01" name='inputGroupSelect01' defaultValue={o.orderStatus} value={o.orderStatus} onChange={(e)=>handleStatusChange(o._id,e.target.value)}>
                        <option value='Processing'>Processing</option>
                        <option value='Dispatched'>Dispatched</option>
                        <option value='Cancelled'>Cancelled</option>
                        <option value='Completed'>Completed</option>
                        <option value='Cash On Delivery'>Cash On Delivery Processing</option>
                        <option value='Not Processed' >Not Processed</option>
                        </select>
                    </div>
            
                </div>
                </div>
                {showOrderInTable(o)}
                <hr/>
            </div>
          
        ))}


    </>
 ) 
 }


export default Orders