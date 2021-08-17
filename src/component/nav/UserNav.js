import React from 'react'
import {Link} from 'react-router-dom'

const UserNav = () => {
return(
<nav>
        <ul className="nav flex-column">
            <li className="nav-item nav-link" >
                <Link to="/user/dash">User Dashboard</Link>
            </li>

            <li className="nav-item nav-link" >
                <Link to="/user/UpdatePassword">Update Password</Link>
            </li>


            <li className="nav-item nav-link" >
                <Link to="/user/WhishList">WhishList</Link>
            </li>


        </ul>

    </nav>
)
    
}

export default UserNav;