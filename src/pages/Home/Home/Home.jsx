import React from 'react';
import Banner from '../Banner/Banner';
import OurVision from '../OurVision/OurVision';
import AboutUs from '../AboutUs/AboutUs';
import OurPrincipals from '../OurPrincipals/OurPrincipals';
import Categories from '../Categories/Categories';
import CampsCard from '../CampsCard/CampsCard';

const Home = () => {
  return (
    <div>
      <Banner />
      <OurVision />
      <AboutUs />
      <OurPrincipals />
      <CampsCard/>
    </div>
  );
};

export default Home;