import React ,{useEffect,useState} from 'react'
import AdminNav from '../../../component/nav/AdminNav'
import {toast} from 'react-toastify'
import  {createCategory, getCategories , removeCategory} from '../../../functions/categories'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {DeleteOutlined , EditOutlined} from '@ant-design/icons'
import categoryform from '../../../component/forms/CategoryForms'
import Localsearch from '../../../component/forms/localsearch'
const CategoryCreate = () => {
    const {user} = useSelector(state =>({...state}))
    const [name,setname] = useState("")
    const [loading,setloading] = useState(false);
    const [Keyword,setKeyword] = useState("")
    const[category,setcategory] = useState([]);
    useEffect(()=>{
        loadcategory();
    },[name])
    const loadcategory = () => getCategories().then((c)=>setcategory(c.data));
    const handlesubmit = (e)=>{
        e.preventDefault();
        setloading(true);
        createCategory({name},user.token)
        .then(res=>{
            setloading(false)
            setname('')
            toast.success('Category Created')
        })
        .catch(err => {
            setloading(false)
           if(err.response.status ===400) toast.error(err.response.data)
        })
    }

    const handleremove = async (slug) =>{
        if(window.confirm('Delete?')){
            setloading(true)
            removeCategory(slug,user.token)
            .then(res=>{
                console.log('sdqdqds')
                setloading(false);
                toast.error(`${res.data.slug} Deleted`)
                loadcategory();
            })
            .catch((err)=>{
                setloading(false)
                if(err.response.status ===400) toast.error(err.response.data)
               
            })
        }

    }


    
    const categoryform = () =>  (
        <form onSubmit={handlesubmit}>
        <div className='form-group'>
        <label>Name</label>
        <input type='text' className='form-control' onChange={(e)=>setname(e.target.value)} value={name} autoFocus required/> 
        <button className='btn btn-outline-primary'>Add Category </button>
    
        </div>
    </form>
    
    );
        
    
  

    const searched = (Keyword) =>(c) => c.name.toLowerCase().includes(Keyword)

    return (
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><AdminNav/> </div>
            <div className="col-md">
            {loading ? (<h4 className='text-danger'>Loading....</h4>):( <h4>Create Category</h4>)}
            {categoryform()}
            <hr/> 
            <Localsearch Keyword={Keyword} setKeyword={setKeyword}/>
            {category.filter(searched(Keyword)).map((c)=> (
            <div className="alert alert-secondary" key={c._id}>
            {c.name} <span onClick={()=>handleremove(c.slug)} className="btn btn-secondary btn-sm float-right"><DeleteOutlined className="text-danger"/></span>
             <Link to={`/admin/category/${c.slug}`}> 
             <span className="btn btn-secondary btn-sm float-right">
             <EditOutlined className='text-warning'/>
             </span>
             </Link>    
            </div>))}
            </div>

        </div>

    </div>
    )
}

export default CategoryCreate ; 