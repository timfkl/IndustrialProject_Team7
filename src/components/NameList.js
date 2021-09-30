import React from "react";
import { ListGroup } from "react-bootstrap";

const NameList = ({list}) => {

  return (
    <ListGroup>
      {list.map((name, index) => {
        return (
          <ListGroup.Item action key={index}>
            {name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default NameList;
