import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Login from './pages/login';
import DataBrowsing from './pages/data-browsing';
import Header from './elements/header';

const App = () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/browse" element={<DataBrowsing />} />
        </Routes>
    </BrowserRouter>
);

export default App;
