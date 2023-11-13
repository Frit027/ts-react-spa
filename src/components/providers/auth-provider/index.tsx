import React, { createContext, useMemo } from 'react';
import { TAuthContext, TAuthProviderProps, TData } from './interfaces';

export const AuthContext = createContext<TAuthContext | null>(null);

/**
 * Провайдер, предоставляющий функции управления сессией пользователя
 * @constructor
 */
const AuthProvider = ({ children }: TAuthProviderProps) => {
    /**
     * Сохранения токена в localStorage
     * @param token - Токен пользователя
     */
    const logIn = ({ token }: TData): void => {
        localStorage.setItem('userData', JSON.stringify({ token }));
    };

    /**
     * Удаление данных пользователя из localStorage
     */
    const logOut = (): void => {
        localStorage.removeItem('userData');
    };

    /**
     * Проверка на наличие данных пользователя в localStorage
     * @returns {boolean} Есть ли данные в localStorage
     */
    const isLoggedIn = (): boolean => !!localStorage.getItem('userData');

    const value = useMemo(() => ({
        logIn, logOut, isLoggedIn,
    }), [logIn, logOut, isLoggedIn]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
