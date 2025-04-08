import React from 'react';
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png';
import { useNavigate } from "react-router-dom"; // Заменяем useHistory на useNavigate
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
    const navigate = useNavigate(); // Используем useNavigate вместо useHistory

    return (
        <Col 
            md={3} 
            className="mt-3" 
            onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)} // Заменяем history.push
        >
            <Card style={{ width: 150, cursor: 'pointer' }} border="light">
                <Image 
                    width={150} 
                    height={150} 
                    src={process.env.REACT_APP_API_URL + device.img} 
                    alt={device.name} // Добавляем alt для доступности
                />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Samsung...</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star} alt="Рейтинг" />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;