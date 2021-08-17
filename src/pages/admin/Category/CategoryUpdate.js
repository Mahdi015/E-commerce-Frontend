import React ,{useEffect,useState} from 'react'
import AdminNav from '../../../component/nav/AdminNav'
import {toast} from 'react-toastify'
import  { getCategorie , updateCategory} from '../../../functions/categories'
import { useSelector } from 'react-redux'
import categoryform from '../../../component/forms/CategoryForms'

const CategoryUpdate = ({history,match}) => {
    const {user} = useSelector(state =>({...state}))
    const [name,setname] = useState("")
    const [loading,setloading] = useState(false);

    useEffect(()=>{
        loadcategory();
    },[])


    const loadcategory = () => getCategorie(match.params.slug).then((c)=>setname(c.data.name));
    const handlesubmit = (e)=>{
        e.preventDefault();
        setloading(true);
        updateCategory(match.params.slug,{name},user.token)
        .then(res=>{
            setloading(false)
            setname('')
            toast.success('Category Updated')
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
            {loading ? (<h4 className='text-danger'>Loading....</h4>):( <h4>Update Category</h4>)}
            {categoryform()}   
            <hr/> 
       
            </div>

        </div>

    </div>
    )
}

export default CategoryUpdate ; 