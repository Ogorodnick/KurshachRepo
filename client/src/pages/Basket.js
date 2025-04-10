import React, { useContext, useEffect, useCallback } from 'react';
import { Button, Card, Container, Table } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { fetchBasket, removeFromBasket } from "../http/basketAPI";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

const Basket = observer(() => {
    const { basket, user } = useContext(Context);
    const navigate = useNavigate();

    const fetchBasketData = useCallback(async () => {
        try {
            if (user.isAuth) {
                const data = await fetchBasket();
                basket.setBasket(data.basketDevices);
            }
        } catch (e) {
            console.error("Ошибка при загрузке корзины:", e);
        }
    }, [user.isAuth, basket]);

    useEffect(() => {
        fetchBasketData();
    }, [fetchBasketData]);

    const handleRemove = async (id) => {
        try {
            await removeFromBasket(id);
            basket.removeItem(id); // Используем новый метод хранилища
        } catch (e) {
            alert(e.response?.data?.message || 'Ошибка при удалении');
        }
    };


    if (!user.isAuth) {
        return (
            <Container className="mt-5 text-center">
                <Card>
                    <Card.Body>
                        <h4>Для просмотра корзины необходимо авторизоваться</h4>
                        <Button 
                            variant="primary"
                            onClick={() => navigate(LOGIN_ROUTE)}
                            className="mt-3"
                        >
                            Войти
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="mt-3">
            <h2>Ваша корзина</h2>
            {basket.basket.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {basket.basket.map(item => (
                                <tr key={item.id}>
                                    <td>{item.device?.name || "Неизвестный товар"}</td>
                                    <td>{item.device?.price || 0} руб.</td>
                                    <td>
                                        <Button 
                                            variant="danger"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Card className="mt-3 p-3">
                        <h4>Итого: {basket.totalPrice} руб.</h4>
                        <Button variant="success" className="mt-2">
                            Оформить заказ
                        </Button>
                    </Card>
                </>
            ) : (
                <Card className="p-5 text-center">
                    <h4>Корзина пуста</h4>
                </Card>
            )}
        </Container>
    );
});

export default Basket;