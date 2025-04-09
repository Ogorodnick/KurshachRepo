import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom"; // Заменили useHistory на useNavigate
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate(); // Используем useNavigate вместо useHistory

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token'); // Добавляем очистку токена
        navigate(LOGIN_ROUTE); // Перенаправляем на страницу входа
    };
    

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>КупиДевайс</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        {user.isAuth && user.user.role === 'ADMIN' &&(
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(ADMIN_ROUTE)} // Заменили history.push на navigate
                            >
                                Админ панель
                            </Button>
                        )}
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button 
                            variant={"outline-light"} 
                            onClick={() => navigate(LOGIN_ROUTE)} // Заменили history.push на navigate
                        >
                            Авторизация
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;