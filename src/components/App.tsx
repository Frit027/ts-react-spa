import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './elements/header';
import Main from './pages/main';
import Login from './pages/login';
import PrivateRoute from './pages/private-route';
import DataBrowsing from './pages/data-browsing';

const App = () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route
                path="browse"
                element={(
                    <PrivateRoute>
                        <DataBrowsing />
                    </PrivateRoute>
                )}
            />
        </Routes>
    </BrowserRouter>
);

export default App;
