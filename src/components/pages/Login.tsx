import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/auth-provider';

const Login = () => {
    const { logIn, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post('/api/login', values);
                logIn(data);
                navigate('/');
            } catch (error) {
                formik.setSubmitting(false);
                if (error.isAxiosError && error.response.status === 401) {
                    console.log(error);
                    return;
                }
                throw error;
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="login">
                Логин
                <input
                    id="login"
                    name="login"
                    type="text"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                />
            </label>
            <br />
            <label htmlFor="password">
                Пароль
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
            </label>
            <br />
            <button type="submit">Войти</button>
        </form>
    );
};

export default Login;
