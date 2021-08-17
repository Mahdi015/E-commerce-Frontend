import React from 'react'
import  Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {Avatar,Badge} from 'antd'
import { useSelector } from 'react-redux'

const Fileupload = ({values,setvalues,setloading}) =>{
const {user} = useSelector((state)=>({... state}))
  const fileuploadandresize =(e) =>{
      let files = e.target.files
      let alluploadedfiles = values.images
      if(files)
      setloading(true)
      for(let i =0; i<files.length;i++){
        Resizer.imageFileResizer(files[i],720,720,'JPEG',100,0,(uri)=>{
           // console.log(uri)
           axios.post(`${process.env.REACT_APP_API}/uploadimages`,{image : uri},{
               headers:{
                   authtoken: user ? user.token: '',
               }
           })
           .then(res =>{
               setloading(false)
               console.log('Image Res',res)
               alluploadedfiles.push(res.data)
               setvalues({...values, images:alluploadedfiles})
           })
           .catch(err=>{
               setloading(false)
               console.log('Cloudinary Error', err)
           })
        }, "base64 ")
       
      }
  }
  const handleremoveimage = (public_id) =>{
      setloading(true)
      axios.post(`${process.env.REACT_APP_API}/removeimage`,{public_id},{
        headers:{
            authtoken: user ? user.token: '',
        }
    })
    .then(res =>{
        setloading(false)
        const {images} = values
        let filtredimages = images.filter((item)=>{
            return item.public_id !== public_id
        })
        
        setvalues({...values, images:filtredimages})
    })
    .catch(err=>{
        setloading(false)
        console.log('Cloudinary Error', err)
    })

  }

    return(
       <>

        <div className='form-group'>
        {values.images.map((image)=>(
            <Badge key={image.public_id} count='X' onClick={()=>handleremoveimage(image.public_id)} style={{cursor:'pointer'}}>
            <Avatar  src={image.url} size={100} className='ml-3'/>
            </Badge>
            
        ))}
        </div>
      
        <div className='form-group'>
     
        <label className='btn btn-primary btn-raised mt-3'>Chose File
        <input type='file' multiple accept='images/*' onChange={fileuploadandresize} hidden block/> 
        </label>
        </div>

        </>
        
    )
  
}

export default Fileupload