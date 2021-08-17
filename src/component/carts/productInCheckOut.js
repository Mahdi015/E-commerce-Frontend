import React from 'react'
import download from '../../Images/download.png'
import ModalImage from 'react-modal-image'
import { useDispatch } from 'react-redux'
import {toast} from 'react-toastify' ;
import { CheckCircleOutlined,CloseCircleOutlined , CloseOutlined } from '@ant-design/icons';


const ProductInCheckOut = ({p}) =>{
    let dispatch = useDispatch()
    const {images} = p
    const colors = ['Black','Brown','Silver','White','Blue']
    const handleColorChange = (e) =>{
       let cart = []
       if (typeof window != 'undefined'){
           if(localStorage.getItem('cart')){
               cart = JSON.parse(localStorage.getItem('cart'))
           }
           cart.map((product,i)=>{
               if (product._id == p._id){
                   cart[i].color = e.target.value
               }
           })
           localStorage.setItem('cart',JSON.stringify(cart))
           dispatch ({
               type : 'ADD_TO_CART',
               payload : cart,
           })
       }
    }
const handleCountChange = (e)=>{
    let count = e.target.value < 1 ? 1 : e.target.value
    if (count > p.quantity){
        toast.error(`Avaible Quantity Is :   ${p.quantity}`)
        return
    }
    let cart = []
    if (typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product,i)=>{
            if (product._id == p._id){
                cart[i].count = count
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
        dispatch ({
            type : 'ADD_TO_CART',
            payload : cart,
        })
    }

}


const handleRemove = () => {
    let cart = []
    if (typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product,i)=>{
            if (product._id === p._id){
                cart.splice(i,1)
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
        dispatch ({
            type : 'ADD_TO_CART',
            payload : cart,
        })
    }
}
    return(
        <tbody>
            <tr>
                <td>
                    <div style={{width:'100px',height:'auto'}}>
                        {images.length ? (<ModalImage small={images[0].url} large={images[0].url}/>) :
                         (<ModalImage small={download} large={download}/>) }
                    </div>
                </td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand}</td>
                <td><select onChange={handleColorChange} className='form-control' name='color'>
                    {p.color ? <option value={p.color}>{p.color}</option> : <option>Select Color</option>}
                    {colors.filter((c)=>c != p.color).map((c)=><option key={c} value={c}>{c}</option>)}
                </select></td>
                <td className='text-center'>
                    <input type='number' value={p.count} className='form-control' onChange={handleCountChange}/>

                    </td>
              
                <td  className='text-center'>{ p.shipping === 'Yes' ? (<CheckCircleOutlined className='text-success'/>) : (<CloseCircleOutlined className='text-danger'/>)}</td>
                
                
                <td className='text-center'><CloseOutlined onClick={handleRemove} className='text-danger pointer'/></td>
            
      
            </tr>
        </tbody>
    )
}

export default ProductInCheckOut;