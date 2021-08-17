import  React,{useEffect,lazy,Suspense}  from 'react'
import {Switch,Route} from 'react-router-dom';
import {  ToastContainer}  from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';
import {curruser} from  './functions/auth'
import {auth} from './Firebase';
import {useDispatch} from 'react-redux' 
import { LoadingOutlined } from '@ant-design/icons';
const ForgotPassword  = lazy(() => import('./pages/auth/ForgotPassword'));
const  Register       = lazy(() => import('./pages/auth/Register.js'));
const  Login          = lazy(() => import('./pages/auth/Login.js'));
const  Home           = lazy(() => import('./pages/Home.js'));
const Header          = lazy(() => import('./component/nav/Header'));
const RegisterComplete= lazy(() => import('./pages/auth/RegisterComplete'));
const UserRoutes      = lazy(() => import('./component/routes/userroutes'));
const userDash        = lazy(() => import('./pages/user/userdash'));
const Password        = lazy(() => import('./pages/user/Password'));
const WhishList       = lazy(() => import('./pages/user/WhishList'));
const AdminRoutes     = lazy(() => import('./component/routes/adminroutes'));
const AdminDash       = lazy(() => import('./pages/admin/admindash'));
const CategoryCreate  = lazy(() => import('./pages/admin/Category/CreateCategory'));
const CategoryUpdate  = lazy(() => import('./pages/admin/Category/CategoryUpdate'));
const Subcreate       = lazy(() => import('./pages/admin/sub/subcreate'));
const Subupdate       = lazy(() => import('./pages/admin/sub/subupdate'));
const productcreate   = lazy(() => import('./pages/admin/Product/product'));
const listproducts    = lazy(() => import('./pages/admin/Product/listproducts'));
const ProductUpdate   = lazy(() => import('./pages/admin/Product/updateproduct'));
const Viewproduct     = lazy(() => import('./pages/viewproduct'));
const Categoryhome    = lazy(() => import('./pages/category/categoryhome'));
const Subshome        = lazy(() => import('./pages/subs/subshome'));
const Shop            = lazy(() => import('./pages/shop'))
const Cart            = lazy(() => import('./pages/cart'))
const SideDrawer      = lazy(() => import('./component/drawer/sideDrawer'));
const Checkout        = lazy(() => import('./pages/checkout'));
const CreateCouponPage= lazy(() => import('./pages/admin/coupon/createCoupon'));
const payment         = lazy(() => import('./pages/payment'))


const App = () =>{

const dispatch = useDispatch()



//check firebase auth state
useEffect(() =>{
  const unsuscribe = auth.onAuthStateChanged(async (user) =>{
    if (user){
      const idTokenResult = await user.getIdTokenResult()
      console.log(user);
      curruser(idTokenResult.token)
          .then((res)=> {
            dispatch({
               type: 'LOGGED_IN_USER',
                payload:{
                  email: res.data.email,
                  token:idTokenResult.token,
                  name: res.data.name,
                  role: res.data.role,
                  _id: res.data._id,
                  },
                });
              })
          .catch((err)=>console.log(err));
             }
            })
        return () => unsuscribe();
         },[dispatch])
  return (
   <Suspense fallback={
     <div className='col text-center '  style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <LoadingOutlined style={{ fontSize: '160px', color: '#08c' }}/>
     </div>
   }>
    <Header/>
    <SideDrawer />
    <ToastContainer/>
    <Switch>
      <Route exact path="/" component={Home}/> 
      <Route exact path="/Login" component={Login}/> 
      <Route exact path="/Register" component={Register}/> 
      <Route exact path="/RegisterComplete" component={RegisterComplete}/> 
      <Route exact path="/ForgotPassword" component={ForgotPassword}/> 
      <Route exact path="/product/:slug" component={Viewproduct}/> 
      <Route exact path="/category/:slug" component={Categoryhome}/>
      <Route exact path="/subs/:slug" component={Subshome}/> 
      <Route exact path="/shop" component={Shop}/> 
      <Route exact path="/cart" component={Cart}/> 
      <Route exact path="/payment" component={payment}/> 
      <UserRoutes exact path="/user/dash" component={userDash}/> 
      <UserRoutes exact path="/user/UpdatePassword" component={Password}/> 
      <UserRoutes exact path="/user/WhishList" component={WhishList}/> 
      <UserRoutes exact path="/checkout" component={Checkout}/> 
      <AdminRoutes exact path="/admin/dash" component={AdminDash}/> 
      <AdminRoutes exact path="/admin/category" component={CategoryCreate}/> 
      <AdminRoutes exact path="/admin/category/:slug" component={CategoryUpdate}/> 
      <AdminRoutes exact path="/admin/sub/:slug" component={Subupdate}/> 
      <AdminRoutes exact path="/admin/sub" component={Subcreate}/> 
      <AdminRoutes exact path="/admin/product" component={productcreate}/> 
      <AdminRoutes exact path="/admin/products" component={listproducts}/> 
      <AdminRoutes exact path="/admin/product/:slug" component={ProductUpdate}/> 
      <AdminRoutes exact path="/admin/coupon" component={CreateCouponPage}/> 
    </Switch>
   </Suspense>

  );


};
  
   

export default App;
