import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../providers/auth-provider';
import { TPrivateRouteProps } from './interfaces';

/**
 * Компонент приватного роутера. Перенаправляет на страницу авторизации
 * @constructor
 */
const PrivateRoute = ({ children }: TPrivateRouteProps) => {
    const { isLoggedIn } = useContext(AuthContext);

    return !isLoggedIn() ? <Navigate to="/login" replace /> : children;
};

export default PrivateRoute;
