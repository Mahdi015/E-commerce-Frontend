import  React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../functions/categories'





const Categorylist =() =>{

const [categoryies,setcategoryies] = useState([])
const [loading,setloading] = useState(false)



useEffect(()=>{
    setloading(true)
    getCategories().then((res)=>{
        setcategoryies(res.data)
        setloading(false)
      })
},[])

const showcat =() => categoryies.map((c)=>(<div className='col' key={c._id}><Link to={`/category/${c.slug}`}><button className='col btn btn-dark  btn-lg btn-block btn-raised m-3'>{c.name}</button></Link></div>))
return(
    <div className='container'>

        <div className='row'>

        {loading ? (<h4 className='center'>Loading</h4>): showcat()}

        </div>
    </div>
)
      






}
export default Categorylist;