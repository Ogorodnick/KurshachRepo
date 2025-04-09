import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [types, brands, devices] = await Promise.all([
                    fetchTypes(),
                    fetchBrands(),
                    fetchDevices(null, null, 1, 2)
                ]);
                
                device.setTypes(types);
                device.setBrands(brands);
                device.setDevices(devices.rows);
                device.setTotalCount(devices.count);
            } catch (e) {
                console.error("Ошибка при загрузке данных:", e);
            }
        };

        loadInitialData();
    }, [device]);

    useEffect(() => {
        const loadFilteredDevices = async () => {
            try {
                const data = await fetchDevices(
                    device.selectedType?.id, 
                    device.selectedBrand?.id, 
                    device.page, 
                    2
                );
                device.setDevices(data.rows);
                device.setTotalCount(data.count);
            } catch (e) {
                console.error("Ошибка при загрузке устройств:", e);
            }
        };

        loadFilteredDevices();
    }, [device.page, device.selectedType, device.selectedBrand, device]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;