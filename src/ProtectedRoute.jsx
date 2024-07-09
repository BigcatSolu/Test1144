import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate()

    if (!currentUser) {
        // Redirect to login if not authenticated
        navigate('/login')
    }

    // If authenticated, render the children components
    return children;
};

export default ProtectedRoute;
