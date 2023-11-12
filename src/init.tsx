import React from 'react';
import { createRoot } from 'react-dom/client';
import { makeServer } from './server';
import AuthProvider from './components/providers/auth-provider';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Инициализация приложения
 */
export default (): void => {
    makeServer();

    const root = createRoot(document.getElementById('root'));
    root.render(
        <AuthProvider>
            <App />
        </AuthProvider>,
    );
};
