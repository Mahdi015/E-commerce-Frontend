import React ,{useEffect,useState} from 'react'
import AdminNav from '../../../component/nav/AdminNav'
import {toast} from 'react-toastify'
import  {createCategory, getCategories , removeCategory} from '../../../functions/categories'
import  {getsubs, removesub , createsub} from '../../../functions/sub'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {DeleteOutlined , EditOutlined} from '@ant-design/icons'
import categoryform from '../../../component/forms/CategoryForms'
import Localsearch from '../../../component/forms/localsearch'
const Subcreate = () => {
    const {user} = useSelector(state =>({...state}))
    const [name,setname] = useState("")
    const [loading,setloading] = useState(false);
    const [Keyword,setKeyword] = useState("")
    const[category,setcategory] = useState([]);
    const[subs,setsubs] = useState([]);
    const[parentcategeory,setparentcategeory] = useState("")
    useEffect(()=>{
        loadcategory();
        loadsubs();
    },[name])
    const loadcategory = () => getCategories().then((c)=>setcategory(c.data));

    const loadsubs = () => getsubs().then((s)=>setsubs(s.data));
    const handlesubmit = (e)=>{
        e.preventDefault();
        setloading(true);
        createsub({name ,parent:parentcategeory},user.token)
        .then(res=>{
            setloading(false)
            setname('')
            toast.success('Sub Category Created')
            loadsubs(); 
        })
        .catch(err => {
            setloading(false)
           if(err.response.status ===400) toast.error(err.response.data)
        })
    }

    const handleremove = async (slug) =>{
        if(window.confirm('Delete?')){
            setloading(true)
            removesub(slug,user.token)
            .then(res=>{
                console.log('sdqdqds')
                setloading(false);
                toast.error(`${res.data.slug} Deleted`)
                loadsubs();
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
            {loading ? (<h4 className='text-danger'>Loading....</h4>):( <h4>Create Sub Category</h4>)}

            <div className='form-group'>
            <label>Category</label>
            <select name='category' className='form-control' onChange={(e)=>setparentcategeory(e.target.value)}>
            <option value=''>Select Parent Category</option>
            {category.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)}

            </select>
          
            </div>
            {categoryform()}
            <hr/> 
            <Localsearch Keyword={Keyword} setKeyword={setKeyword}/>
            {subs.filter(searched(Keyword)).map((c)=> (
            <div className="alert alert-secondary" key={c._id}>
            {c.name} <span onClick={()=>handleremove(c.slug)} className="btn btn-secondary btn-sm float-right"><DeleteOutlined className="text-danger"/></span>
             <Link to={`/admin/sub/${c.slug}`}> 
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

export default Subcreate ; 