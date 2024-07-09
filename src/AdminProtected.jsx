import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const AdminProtected = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const admin = currentUser?.user_role === 'admin'

    if (!admin) {
        // Redirect to login if not authenticated
        // navigate('/')
        return <Navigate to="/" replace />;
    }

    // If authenticated, render the children components
    return children;
};

export default AdminProtected;
