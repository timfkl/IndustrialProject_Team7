import React from "react";
import { ListGroup } from "react-bootstrap";

// Takes in an array of names as input.
const NameList = ({ list, onItemClick }) => {
    // Each element in array is mapped to an individual list group item.

    return (
        <ListGroup>
            {list.map((name, index) => {
                return (
                    <ListGroup.Item action key={index} onClick={() => {onItemClick(name, index)}}>
                        {name}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
};

export default NameList;
