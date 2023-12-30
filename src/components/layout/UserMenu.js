import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const UserMenu = () => {
  const navigate=useNavigate();
  return (
    <div>
         <>
      <div className="text-center">
        <div className="list-group">
          <h1 onClick={()=>navigate('/dashboard/user')} >Dashboard</h1>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
Update Profile Details         </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
All orders        
  </NavLink>
          
        </div>
      </div>
    </>

    </div>
  )
}

export default UserMenu