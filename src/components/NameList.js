import React from "react";
import { ListGroup, Row, Col, Card } from "react-bootstrap";

// Takes in an array of names as input.
const NameList = ({ list, onItemClick }) => {
    // Each element in array is mapped to an individual list group item.

    return (
        <Row xs={2} sm={3} md={4} lg={5} className="g-4">
            {list.map((item, index) => (
                <Col>
                    <Card bg="light">
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item action>Select Client</ListGroup.Item>
                            <ListGroup.Item action>See Details</ListGroup.Item>
                        </ListGroup>
                        <Card.Footer>Last active: {item.lastActive}</Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default NameList;
