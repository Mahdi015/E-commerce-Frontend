import React ,{useState}from 'react'
import {Modal , Button} from 'antd'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {StarOutlined} from '@ant-design/icons'
import { useHistory , useParams } from 'react-router-dom'

const RatingModal =({children,match}) =>{
    const {user} = useSelector(state =>({...state}))
    const [modalVisible,setmodalVisible] = useState(false)
    let {slug} = useParams()
    let history =  useHistory() ;


    const handlemodal =() =>{
        if (user && user.token){
            setmodalVisible(true)
        }else{
            history.push({
                pathname:'/login',
                state: {from: `/product/${slug}`}
            })
        }
    }
    return(
        <>
            <div onClick={handlemodal}>
                <StarOutlined  className='text-danger' /> <br/> {user ? 'Leave Rating' : 'Login To Leave Rating'}

            </div>
            <Modal title='Leave  Your Rating' centered visible={modalVisible} onOk={()=>{setmodalVisible(false); 
            toast.success('Thanks')} } onCancel={()=>setmodalVisible(false)}> 
                {children}
            </Modal>


        </>

    )


}
export default RatingModal