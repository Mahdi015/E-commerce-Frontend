import React from 'react'
import { Drawer } from 'antd'
import { useSelector , useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import download from '../../Images/download.png'


 
const  SideDrawer = () =>{

    const dispatch = useDispatch()
    const {drawer,cart} = useSelector((state)=>({...state}))


const imageStyle = {
    width : '100%',
    height : '50px',
    objectFit : 'cover'
}
return (
    <Drawer className='text-center' title={`Cart /${cart.length} Product`} onClose={()=>     
        dispatch({
          type : 'SET_VISIBLE',
          payload : false,
        })} visible={drawer}>
       {cart.map((p)=>
       <div key={p._id} className='row'>
           <div className='col'>
            {p.images[0] ? 
            (<>
                <img src={p.images[0].url} style={imageStyle} />
                <p className='text-center bg-secondary text-light'>{p.title} * {p.count}</p>
            </>)
            :(<>
                <img src={download} />
                <p className='text-center bg-secondary text-light'>{p.title} * {p.count}</p>
            </>)}

           </div>
       </div>)}
       <hr></hr>
        <Link to='/cart' > <button className='text-center btn btn-primary brn-raised btn-block' onClick={()=>dispatch({type : 'SET_VISIBLE' , payload : false})}>Go To Cart</button></Link>
        <hr></hr>
    </Drawer>
)

} 





export default SideDrawer;