import Footer from '@/pages/Shared/Footer/Footer';
import Navbar from '@/pages/Shared/Navbar/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div className='font-robotoroboto'>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Main;