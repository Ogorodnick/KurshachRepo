import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from '../assets/bigStar.png';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOneDevice } from "../http/deviceAPI";
import { addToBasket } from "../http/basketAPI";
import { Context } from "../index";
import { LOGIN_ROUTE } from "../utils/consts";

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, basket } = useContext(Context);

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, [id]);

    const handleAddToBasket = async () => {
        if (!user.isAuth) return navigate(LOGIN_ROUTE);
        
        try {
            const response = await addToBasket(device.id);
            console.log("Полный ответ сервера:", response);
            
            basket.setBasket(response.basket_devices || []);
            
        } catch (e) {
            console.error("Ошибка добавления:", e);
            alert(e.response?.data?.message || 'Ошибка');
        }
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <h3>{device.name}</h3>
                    <Image 
                        
                        width={300} 
                        height={300} 
                        src={process.env.REACT_APP_API_URL + device.img}
                        alt={device.name} 
                    />
                </Col>
                <Col md={4}>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{
                            width: 300,
                            height: 300,
                            fontSize: 32,
                            border: '5px solid lightgray'
                        }}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button 
                            variant="outline-dark"
                            onClick={handleAddToBasket}
                        >
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row 
                        key={info.id} 
                        style={{
                            background: index % 2 === 0 ? 'lightgray' : 'transparent',
                            padding: 10
                        }}
                    >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;