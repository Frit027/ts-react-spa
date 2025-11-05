import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { texts } from './constants';
import { AuthContext } from '../../providers/auth-provider';

/**
 * Панель навигации сайта
 * @constructor
 */
const Header = () => {
    const { isLoggedIn, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    /**
     * Обработка выхода из сессии
     */
    const handleLogOut = (): void => {
        logOut();
        navigate('/login');
    };

    /**
     * Перенаправление на страницу входа
     */
    const handleLogIn = (): void => {
        navigate('/login');
    };

    return (
        <Navbar bg='primary' data-bs-theme='dark'>
            <Container>
                <Nav className='me-auto'>
                    <Navbar.Brand href='/'>{texts.main}</Navbar.Brand>
                    <Nav.Link href='/browse'>{texts.browse}</Nav.Link>
                </Nav>
                <Nav>
                    {isLoggedIn()
                        ? <Button variant='primary' type='button' onClick={handleLogOut}>{texts.logOut}</Button>
                        : <Button variant='primary' type='button' onClick={handleLogIn}>{texts.logIn}</Button>}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
