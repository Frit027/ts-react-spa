import React from 'react';

export type TAuthProviderProps = {
    // передаваемый компонент в провайдер
    children: React.ReactNode,
};

export type TData = {
    // токен пользователя
    token: string,
};

export type TAuthContext = {
    // сохранения данных пользователя
    logIn: (data: TData) => void,

    // удаление данных пользователя
    logOut: () => void,

    // проверка на авторизацию
    isLoggedIn: () => boolean,
};
