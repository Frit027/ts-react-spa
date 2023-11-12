import React from 'react';

export type TAuthProviderProps = {
    children: React.ReactNode,
};

export type TData = {
    token: string,
};

export type TAuthContext = {
    logIn: (data: TData) => void,
    logOut: () => void,
    isLoggedIn: () => boolean,
    getToken: () => string,
};
