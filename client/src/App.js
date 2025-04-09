import React, { useContext, useEffect, useState, useCallback } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token');
            }
            const userData = await check();
            user.setUser(userData); // Сохраняем данные пользователя
            user.setIsAuth(true);
        } catch (e) {
            localStorage.removeItem('token'); // Очищаем токен при ошибке
            user.setUser({});
            user.setIsAuth(false);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

 // Теперь используем колбэк как зависимость

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="grow" variant="primary" />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;