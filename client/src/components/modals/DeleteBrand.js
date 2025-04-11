import React, { useState, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { deleteBrand } from "../../http/deviceAPI";

const DeleteBrand = observer(({ show, onHide }) => {
    const { device } = useContext(Context);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const removeBrand = () => {
        if (!selectedBrand) return;
        deleteBrand(selectedBrand.id)
            .then(() => {
                device.setBrands(device.brands.filter(b => b.id !== selectedBrand.id));
                onHide();
            })
            .catch(e => alert(e.response.data.message));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Удалить бренд</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle variant="secondary">
                        {selectedBrand?.name || "Выберите бренд"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand => (
                            <Dropdown.Item
                                key={brand.id}
                                onClick={() => setSelectedBrand(brand)}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Отмена</Button>
                <Button variant="danger" onClick={removeBrand}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteBrand;