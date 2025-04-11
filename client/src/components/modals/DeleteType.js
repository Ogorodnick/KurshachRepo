import React, { useState, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { deleteType } from "../../http/deviceAPI";

const DeleteType = observer(({ show, onHide }) => {
    const { device } = useContext(Context);
    const [selectedType, setSelectedType] = useState(null);

    const removeType = () => {
        if (!selectedType) return;
        deleteType(selectedType.id)
            .then(() => {
                device.setTypes(device.types.filter(t => t.id !== selectedType.id));
                onHide();
            })
            .catch(e => alert(e.response.data.message));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Удалить тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle variant="secondary">
                        {selectedType?.name || "Выберите тип"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type => (
                            <Dropdown.Item
                                key={type.id}
                                onClick={() => setSelectedType(type)}
                            >
                                {type.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Отмена</Button>
                <Button variant="danger" onClick={removeType}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;