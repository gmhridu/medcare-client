import useRole from '@/Hooks/useRole';
import Loader from '@/pages/Shared/Loader/Loader';
import React from 'react';

const ParticipantRoutes = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) {
    return <Loader />;
  }

  if (role === "participant") return children;

  return <Navigate to={"/dashboard"} replace />;
};

export default ParticipantRoutes;
