import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const UserDashboard = () => {
  const [isCollapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div className="list-group text-center userDash">
    
        <button
          type="button"
          className="btn btn-link mt-5 dashBtn"
          onClick={handleToggle}
          data-toggle="collapse"
          data-target="#dashboardContent"
          aria-expanded={!isCollapsed}
          aria-controls="dashboardContent"
        >
{isCollapsed?"⬇":"❌"}
        </button>
      
      <div id="dashboardContent" className={`collapse dashContent ${isCollapsed ? '' : 'show'}`}>
        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
          Profile
        </NavLink>
        <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
          Orders
        </NavLink>
        {/* Add more NavLink items as needed */}
      </div>
    </div>
  );
};

export default UserDashboard;
