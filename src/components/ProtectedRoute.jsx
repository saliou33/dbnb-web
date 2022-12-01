import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';

const ProtectedRoute = ({to, toggle}) => ( toggle? <Navigate to={to} /> : <Outlet/> )

export default ProtectedRoute