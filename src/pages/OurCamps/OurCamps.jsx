import React from 'react';
import Categories from '../Home/Categories/Categories';
import { useSearchParams } from 'react-router-dom';
import CampCard from '../Home/CampCard/CampCard';
import Heading from '../Shared/Heading';
import useCamps from '@/Hooks/useCamps';
import Loader from '../Shared/Loader/Loader';

const OurCamps = () => {
  const [params, setParams] = useSearchParams();

  const category = params.get("category");

  const {
    data: camps = [],
    isLoading,
    isFetched,
    isPending,
    isSuccess,
  } = useCamps(category)

  console.log(camps)

  if(isLoading || isPending) return <Loader/>

  if (isFetched || isSuccess) {
    return (
      <div>
        <Categories />
        <div className="container mx-auto">
          {camps && camps.length > 0 ? (
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {camps?.map((camp) => (
                <CampCard key={camp?._id} camp={camp} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
              <Heading
                center={true}
                title="No Camp Available In This Category!"
                subtitle="Please Select Other Categories."
              />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default OurCamps;