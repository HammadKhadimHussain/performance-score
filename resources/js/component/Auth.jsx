import React from 'react';
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
};

export default Auth;
