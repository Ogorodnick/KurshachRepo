import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";
import React, { useContext } from "react";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        active={!device.selectedType.id}
        onClick={() => device.setSelectedType({})}
      >
        Все категории
      </ListGroup.Item>
      {device.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={device.selectedType.id === type.id}
          onClick={() => device.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;