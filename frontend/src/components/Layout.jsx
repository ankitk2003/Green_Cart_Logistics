import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
     this is a header
        <Outlet />

     
    </div>
  );
}

export default Layout;
