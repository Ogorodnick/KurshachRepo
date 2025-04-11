import React, { useState, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { deleteDevice } from "../../http/deviceAPI";

const DeleteDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const removeDevice = () => {
        if (!selectedDevice) return;
        deleteDevice(selectedDevice.id)
            .then(() => {
                device.setDevices(device.devices.filter(d => d.id !== selectedDevice.id));
                onHide();
            })
            .catch(e => alert(e.response.data.message));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Удалить устройство</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle variant="secondary">
                        {selectedDevice?.name || "Выберите устройство"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.devices.map(device => (
                            <Dropdown.Item
                                key={device.id}
                                onClick={() => setSelectedDevice(device)}
                            >
                                {device.name} ({device.price} руб.)
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Отмена</Button>
                <Button variant="danger" onClick={removeDevice}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteDevice;