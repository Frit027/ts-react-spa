import React, { createContext, useMemo } from 'react';
import { TAuthContext, TAuthProviderProps, TData } from './interfaces';

export const AuthContext = createContext<TAuthContext | null>(null);

const AuthProvider = (props: TAuthProviderProps) => {
    const logIn = ({ token }: TData) => {
        localStorage.setItem('userData', JSON.stringify({ token }));
    };

    const logOut = () => {
        localStorage.removeItem('userData');
    };

    const isLoggedIn = () => !!localStorage.getItem('userData');

    const getToken = () => JSON.parse(localStorage.getItem('userData')).token;

    const value = useMemo(() => ({
        logIn, logOut, isLoggedIn, getToken,
    }), [logIn, logOut, isLoggedIn, getToken]);

    const { children } = props;

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
