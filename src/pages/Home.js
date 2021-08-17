import React,{useEffect,useState} from 'react'
import Jumbotron from '../component/carts/jumbotron';
import Categorylist from '../component/category/categorylist';
import Bestsellers from '../component/home/bestsellers';
import Newarrivals from '../component/home/newarrivals';
import Subslist from '../component/subs/subslist';
import {  useDispatch } from 'react-redux'








const Home = () =>{

let dispatch = useDispatch()

useEffect(()=>{
    dispatch({
        type:  "SEARCH_QUERY",
        payload: {text:''},
    })
    

},[])
   


 return(

 <>

 <div className='jumbotron text-danger h1 font-weight-bold text-center' >
     <Jumbotron text={['Latest Products','New Arivals','Best Sellers']}/>
</div>

<div className='text-center jumbotron p-2 mt-5 mb-5 display-4 font-weight-bold '>
New Arivals

</div>


 <Newarrivals/>

 <div className='text-center jumbotron p-2 mt-5 mb-5 display-4 font-weight-bold '>
Best Sellers

</div>


 <Bestsellers/>
 <br></br>
 <br></br>


 <div className='text-center jumbotron p-2 mt-5 mb-5 display-4 font-weight-bold '>
Category
</div>
<Categorylist/>



<div className='text-center jumbotron p-2 mt-5 mb-5 display-4 font-weight-bold '>
Subs List
</div>
<Subslist/>

   </>
       
    );
};
export default Home; 
