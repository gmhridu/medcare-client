import CategoryBox from '@/components/CategoryBox/CategoryBox';
import { categories } from '@/components/CategoryBox/CategoryData';
import React from 'react';

const Categories = () => {
  return (
    <div className='container mx-auto'>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories?.map((camp, index) => (
          <CategoryBox key={index} label={camp?.label} title={camp?.title} />
        ))}
      </div>
    </div>
  );
};

export default Categories;