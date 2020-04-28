import React from 'react';
import { Link } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="sidebar">
      <Link className={"nav-link"} to={"/"}> Home </Link>
      <Link className={"nav-link"} to={"/app"}> 应用管理 </Link>
      <Link className={"nav-link"} to={"/tags"}> 标签管理 </Link>
    </div>
  );
}

export default Sidebar;
