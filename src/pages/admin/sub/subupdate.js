import React ,{useEffect,useState} from 'react'
import AdminNav from '../../../component/nav/AdminNav'
import {toast} from 'react-toastify'
import  { updatesub , getsub} from '../../../functions/sub'
import { useSelector } from 'react-redux'
import categoryform from '../../../component/forms/CategoryForms'
import  { getCategories } from '../../../functions/categories'

const Subupdate = ({history,match}) => {
    const {user} = useSelector(state =>({...state}))
    const [name,setname] = useState("")
    const [parent,setparent] = useState([])
    const [loading,setloading] = useState(false);
    const[category,setcategory] = useState([]);

    useEffect(()=>{
        loadsub();
        loadcategory();
    },[])


     const loadsub = () => getsub(match.params.slug).then((c)=> {setname(c.data.name); setparent(c.data.parent) })
     const loadcategory = () => getCategories().then((c)=>setcategory(c.data));
    const handlesubmit = (e)=>{
        e.preventDefault();
        setloading(true);
        updatesub(match.params.slug,{name ,parent},user.token)
        .then(res=>{
            setloading(false)
            setname('')
            toast.success('Sub Category Updated')
            history.push('/admin/category')
        })
        .catch(err => {
            setloading(false)
           if(err.response.status ===400) toast.error(err.response.data)
        })
    }




    const categoryform = () =>  (
        <form onSubmit={handlesubmit}>
        <div className='form-group'>
        <label>Name</label>
        <input type='text' className='form-control' onChange={(e)=>setname(e.target.value)} value={name} autoFocus required/> 
        <button className='btn btn-outline-primary'>Save </button>
    
        </div>
    </form>
    
    );
        

    


    return (
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-2"><AdminNav/> </div>
            <div className="col-md">
            {loading ? (<h4 className='text-danger'>Loading....</h4>):( <h4>Update Sub Category</h4>)}
            <div className='form-group'>
            <label>Category</label>
            <select name='category' className='form-control' onChange={(e)=>setparent(e.target.value)}>
            <option value=''>Select Parent Category</option>
            {category.length > 0 && category.map((c)=><option key={c._id} value={c._id} selected={c._id === parent}>{c.name}  </option>)}

            </select>
          
            </div>
            {categoryform()}   
            <hr/> 
       
            </div>

        </div>

    </div>
    )
}

export default Subupdate ; 