import useRole from '@/Hooks/useRole';
import Loader from '@/pages/Shared/Loader/Loader';
import React from 'react';
import { Navigate } from 'react-router-dom';

const OrganizerRoute = ({children}) => {
  const [role, isLoading] = useRole()

  if (isLoading) {
    return <Loader/>
  }

  if (role === 'organizer') return children


  return <Navigate to={"/dashboard"} replace />;
};

export default OrganizerRoute;