import React, {
    useState, useContext, useEffect, useRef,
} from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Col, Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { AuthContext } from '../../providers/auth-provider';
import { texts } from './constants';
import { TFormValues } from './interfaces';

/**
 * Страница авторизации
 * @constructor
 */
const Login = () => {
    const [isAuthFailed, setIsAuthFailed] = useState<boolean>(false);
    const { logIn, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const loginInput = useRef<HTMLInputElement>();

    /**
     * Если пользователь уже авторизован, то перенаправляем на главную страницу
     */
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
        loginInput.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: async (values: TFormValues) => {
            setIsAuthFailed(false);
            try {
                const { data } = await axios.post('/api/login', values);
                logIn(data);
                navigate('/');
            } catch (error) {
                formik.setSubmitting(false);
                if (error.isAxiosError && error.response.status === 401) {
                    setIsAuthFailed(true);
                    console.error(error.response.data);
                    loginInput.current.select();
                    return;
                }
                throw error;
            }
        },
    });

    return (
        <Col className="text-center m-auto mt-5" xxl={4}>
            <Card className="p-3">
                <Form onSubmit={formik.handleSubmit}>
                    <FloatingLabel className="mb-3" controlId="login" label={texts.login}>
                        <Form.Control
                            type="text"
                            name="login"
                            ref={loginInput}
                            placeholder={texts.login}
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            isInvalid={isAuthFailed}
                        />
                    </FloatingLabel>
                    <FloatingLabel className="mb-3" controlId="password" label={texts.password}>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder={texts.password}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            isInvalid={isAuthFailed}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>{texts.error}</Form.Control.Feedback>
                    </FloatingLabel>
                    <Button variant="primary" type="submit">{texts.submit}</Button>
                </Form>
            </Card>
        </Col>
    );
};

export default Login;
