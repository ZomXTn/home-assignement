import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../features/authApi';
import { selectIsAuthenticated } from '../../slices/authSlice';

const NoAuthPage: React.FC<React.PropsWithChildren> = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    if (isAuthenticated === true) {
        return <Navigate to="/recommendations" replace={true} />
    }
    return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
};

export default NoAuthPage;