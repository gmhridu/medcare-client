import AddCampForms from '@/components/Forms/AddCampForms';
import useAuth from '@/Hooks/useAuth';
import useAxiosCommon from '@/Hooks/useAxiosCommon';
import { ImageUpload } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCamp = () => {
  const axiosCommon = useAxiosCommon()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [filesToUpload, setFilesToUpload] = useState([])
 const [dates, setDates] = useState({
   startDate: new Date(),
   endDate: new Date(),
   key: "selection",
 });

 const handleDates = (item) => {
   setDates(item.selection);
 };

  const { mutateAsync } = useMutation({
    mutationFn: async (campData) => {
      const { data } = await axiosCommon.post("/camp", campData);

      return data;
    },
    onSuccess: () => {
      console.log("Data Saved Successfully")
      toast.success("Camp added successfully")
      navigate('/'),
      setLoading(false)
    }
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const campName = form.name.value;
    const campFees = form.fees.value;
    const dateTime = dates.endDate;
    const location = form.location.value;
    const healthcareProfessional = form.healthcareProfessional.value;
    const category = form.category.value;
    const description = form.description.value;
    const rating = parseFloat(form.rating.value);
    const organizer = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    }
    
    try {
      let UploadImages = [];
      try {
        console.log(filesToUpload)
        UploadImages = await ImageUpload(filesToUpload)
        console.log(UploadImages)
      } catch (error) {
        console.log(err?.message);
        toast.error(err?.message);
        setLoading(false);
        return;
      }

      const campData = {
        name: campName,
        fees: campFees,
        dateTime,
        location,
        healthcareProfessional,
        category,
        description,
        rating,
        organizer,
        images: UploadImages,
      };
      console.table(campData)

      await mutateAsync(campData)

    } catch (error) {
      console.log(err?.message);
      toast.error(err?.message);
      setLoading(false);
    }

    console.log(filesToUpload)
    
  }

  return (
    <div className='container mx-auto'>
      <AddCampForms
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
        loading={loading}
      />
    </div>
  );
};

export default AddCamp;