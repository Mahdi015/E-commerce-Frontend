import React from 'react'
import {Card} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import download from '../../Images/download.png'
import { Link } from 'react-router-dom';

const {Meta} = Card


const Adminproducttcart =({product,handleremove}) =>{

const {title,description,images,slug} = product
    return(
       <Card cover={<img  src={images && images.length ? images[0].url : download }  style={{height:'150px',objectFit:'cover'}} className='p-1' />} 
          actions={[<Link to={`product/${slug}`}><EditOutlined  className='text-danger' /> </Link> , <DeleteOutlined className='text-danger' onClick={() =>handleremove(slug)}/>]}   >
           <Meta  title={title} description={`${description && description.substring(0,2)}....`} />
           
       </Card>
    )
}
export default Adminproducttcart