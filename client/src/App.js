import React, { useContext, useEffect, useState, useCallback } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { fetchBasket } from "./http/basketAPI"; // Добавьте этот импорт

// App.js
const App = observer(() => {
    const { user, basket } = useContext(Context); // Добавляем basket
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token');
            }
            const userData = await check();
            user.setUser(userData);
            user.setIsAuth(true);
            
            // Добавляем загрузку корзины после успешной аутентификации
            const basketData = await fetchBasket();
            basket.setBasket(basketData);
        } catch (e) {
            localStorage.removeItem('token');
            user.setUser({});
            user.setIsAuth(false);
            basket.setBasket([]); // Очищаем корзину при ошибке
        } finally {
            setLoading(false);
        }
    }, [user, basket]); // Добавляем basket в зависимости
    // ... остальной код

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