import React, { useEffect } from 'react';
import { useAuth } from '../auth/Store';
import { Navigate } from 'react-router-dom';

const Logout = () => {

    const { Logout } = useAuth();

    useEffect(() => {
        Logout();
    },[Logout]);

  return (
    <Navigate to="/"></Navigate>
  )
}

export default Logout
