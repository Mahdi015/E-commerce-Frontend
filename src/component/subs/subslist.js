import  React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getsubs } from '../../functions/sub'






const Subslist =() =>{

const [subs,setsubs] = useState([])
const [loading,setloading] = useState(false)



useEffect(()=>{
    setloading(true)
    getsubs().then((res)=>{
        setsubs(res.data)
        setloading(false)
      })
},[])

const showsub =() => subs.map((c)=>(<div className='col' key={c._id}><Link to={`/subs/${c.slug}`}><button className='col btn btn-dark  btn-lg btn-block btn-raised m-3'>{c.name}</button></Link></div>))
return(
    <div className='container'>

        <div className='row'>

        {loading ? (<h4 className='center'>Loading</h4>): showsub()}

        </div>
    </div>
)
      






}
export default Subslist;