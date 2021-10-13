import React from "react";
import { ListGroup, Row, Col, Card } from "react-bootstrap";

// Takes a list of users as input, onItemClick is a function prop which runs when the user
// clicks to see the athlete. onDetailsClick is a function prop which runs whern the user
// wants to see athlete's details.
const NameList = ({ list, onItemClick, onDetailsClick }) => {
    // Each element in array is mapped to an individual card containing links and details.
    return (
        <Row xs={2} sm={3} md={4} lg={5} className="g-4">
            {list.map((item, index) => (
                <Col key={index}>
                    <Card bg="light">
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item onClick={() => {onItemClick(item)}} action>Select Client</ListGroup.Item>
                            <ListGroup.Item onClick={() => {onDetailsClick(item)}} action>See Details</ListGroup.Item>
                        </ListGroup>
                        <Card.Footer>Last active: {item.lastActive}</Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default NameList;
