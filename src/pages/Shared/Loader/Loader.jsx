import React from 'react';
import { RingLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div
     className='flex flex-col items-center justify-center h-screen'
    >
      <RingLoader color="#4CBDF8" size={100} speedMultiplier={1} />
    </div>
  );
};

export default Loader;