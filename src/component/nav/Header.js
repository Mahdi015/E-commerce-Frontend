import React,{useState} from'react'
import {Menu,Badge} from 'antd'
import { MailOutlined,HomeOutlined, ShoppingOutlined, SettingOutlined,UserOutlined,UserAddOutlined, LogoutOutlined , ShoppingCartOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {useDispatch , useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Search from '../forms/search';
const {SubMenu , Item} = Menu;

const Header = () => {
    const [current,setcurrent] = useState('Home')
    let dispatch = useDispatch();
    let {user,cart} = useSelector((state)=>({ ...state}));
    let history = useHistory();

    const handleClick = (e) =>{
        setcurrent(e.key);

    }
    const logout = () => {
      firebase.auth().signOut();
      dispatch({
        type : 'LOGOUT',
        payload: null ,
      });
      history.push("/login");
    }


    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">

        <Item key="Home"  icon={<HomeOutlined  style={{ fontSize: '20px', color: '#08c' }}/>} >
          <Link to="/">Home</Link>
        </Item>
        <Item key="Shop"  icon={<ShoppingOutlined  style={{ fontSize: '20px', color: '#08c' }}/>} >
          <Link to="/shop">Shop</Link>
        </Item>
        <Item key="Cart"  icon={<ShoppingCartOutlined  style={{ fontSize: '20px', color: '#08c' }}/>} >
          <Link to="/cart">
          <Badge count={cart.length} offset={[12,0]}>
            Cart
          </Badge>
          </Link>
        </Item>
    

       {!user && ( <Item key="Register" icon={<UserAddOutlined  />} className="float-right">
        <Link to="/Register">Register</Link>
        </Item>)}
     
       {!user && (   <Item key="Login" icon={<UserOutlined  />} className="float-right">
        <Link to="/Login">Login</Link>
        </Item>)}
       {user && ( <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email.split('@')[0] } className="float-right">
       
        
        {user && user.role ==='user'&& (<Item key="setting:1" ><Link to="/user/dash">User Dashboard</Link></Item>)}

        {user && user.role ==='admin'&& (<Item key="setting:2"><Link to="/admin/dash">Admin Dashboard</Link></Item>)}
        
        <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
    
   
    </SubMenu>)}
    
      <span className='float-right p-1'>
        <Search/>
       </span>
      </Menu>
    )
}
export default Header;