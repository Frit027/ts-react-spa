import React, { useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { classes, texts } from './constants';
import { AuthContext } from '../../providers/auth-provider';
import './styles.less';

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
        <nav className={classes.component}>
            <NavLink className={classes.link} to="/">{texts.main}</NavLink>
            <NavLink className={classes.link} to="/browse">{texts.browse}</NavLink>
            {isLoggedIn()
                ? <button type="button" onClick={handleLogOut}>{texts.logOut}</button>
                : <button type="button" onClick={handleLogIn}>{texts.logIn}</button>}
        </nav>
    );
};

export default Header;
