import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ articles }) => {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar articles={articles} />
      <main className="ml-64 min-h-screen relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
