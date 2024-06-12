import React from 'react';
import Banner from '../Banner/Banner';
import OurVision from '../OurVision/OurVision';
import AboutUs from '../AboutUs/AboutUs';
import OurPrincipals from '../OurPrincipals/OurPrincipals';
import Categories from '../Categories/Categories';
import CampsCard from '../CampsCard/CampsCard';
import useAuth from '@/Hooks/useAuth';
import Loader from '@/pages/Shared/Loader/Loader';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
  const { loading } = useAuth()
  
  if(loading) return <Loader/>
  return (
    <div>
      <Banner />
      <OurVision />
      <AboutUs />
      <OurPrincipals />
      <CampsCard />
      <Testimonial/>
    </div>
  );
};

export default Home;