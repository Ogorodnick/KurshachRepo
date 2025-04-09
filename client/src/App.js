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

    // Выносим функцию проверки авторизации в отдельный колбэк
    const checkAuth = useCallback(async () => {
        try {
            await check();
            user.setUser(true);
            user.setIsAuth(true);
        } finally {
            setLoading(false);
        }
    }, [user]); // Зависимости колбэка

    useEffect(() => {
        checkAuth();
    }, [checkAuth]); // Теперь используем колбэк как зависимость

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