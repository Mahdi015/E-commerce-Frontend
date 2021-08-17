import React from 'react'

const localsearch = ({Keyword , setKeyword}) =>{

    const handlesearch =(e)=>{
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }
    
return (

        <input type='search' placeholder='Filter' value={Keyword} onChange={handlesearch} className='form-control mb-4'/>
  
    
)
}
export default localsearch;