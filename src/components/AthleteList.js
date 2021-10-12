import { useState } from "react";
import { Container, Form, FormControl, Modal, Button, Table } from "react-bootstrap";
import NameList from "./NameList";
import OrangeButton from './OrangeButton';

const DetailsModal = ({item, showModal = false, onClose, onSelect}) => {
    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{item.name}'s Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{item.name}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <td>{item.dob}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
                        </tr>
                        <tr>
                            <td>Mobile</td>
                            <td><a href={`tel:${item.mobile}`}>{item.mobile}</a></td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>{item.height}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{item.weight}</td>
                        </tr>
                        <tr>
                            <td>Last Active</td>
                            <td>{item.lastActive}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

const AthleteList = ({ onNameChosen }) => {

    // Test name array. Will be replaced with database call. 
    const list = [
        {
            name: "Philip Price",
            image: "https://i.pravatar.cc/150?u=PhilipPrice",
            lastActive: "09/10/21 @ 13:21",
            height: "",
            weight: "",
            dob: "",
            email: "djupedal@sbcglobal.net",
            mobile: "+44 7700 900496"
        },
        {
            name: "Geoffrey Gould",
            image: "https://i.pravatar.cc/150?u=GeoffreyGould",
            lastActive: "09/10/21 @ 15:23",
            height: "",
            weight: "",
            dob: "",
            email: "dmouse@mac.com",
            mobile: "+44 7700 900789"
        },
        {
            name: "Caroline Pena",
            image: "https://i.pravatar.cc/150?u=CarolinePena",
            lastActive: "07/10/21 @ 13:12",
            height: "",
            weight: "",
            dob: "",
            email: "grdschl@icloud.com",
            mobile: "+44 7700 900550"
        },
        {
            name: "Felipe Cooley",
            image: "https://i.pravatar.cc/150?u=FelipeCooley",
            lastActive: "05/10/21 @ 10:30",
            height: "",
            weight: "",
            dob: "",
            email: "kramulous@hotmail.com",
            mobile: "+44 7700 900377"
        },
        {
            name: "Queen York",
            image: "https://i.pravatar.cc/150?u=QueenYork",
            lastActive: "10/10/21 @ 12:31",
            height: "",
            weight: "",
            dob: "",
            email: "bockelboy@yahoo.com",
            mobile: "+44 7700 900956"
        },
        {
            name: "Bennett Koch",
            image: "https://i.pravatar.cc/150?u=BennettKoch",
            lastActive: "10/10/21 @ 15:23",
            height: "",
            weight: "",
            dob: "",
            email: "grolschie@mac.com",
            mobile: "+44 7700 900045"
        },
        {
            name: "Kristofer Villanueva",
            image: "https://i.pravatar.cc/150?u=KristoferVillanueva",
            lastActive: "07/10/21 @ 14:24",
            height: "",
            weight: "",
            dob: "",
            email: "harryh@verizon.net",
            mobile: "+44 7700 900119"
        },
        {
            name: "Ivan Logan",
            image: "https://i.pravatar.cc/150?u=IvanLogan",
            lastActive: "30/19/21 @ 12:45",
            height: "",
            weight: "",
            dob: "",
            email: "ewaters@outlook.com",
            mobile: "+44 7700 900643"
        },
        {
            name: "Antwan Watkins",
            image: "https://i.pravatar.cc/150?u=AntwanWatkins",
            lastActive: "03/10/21 @ 16:40",
            height: "",
            weight: "",
            dob: "",
            email: "epeeist@sbcglobal.net",
            mobile: "+44 7700 900680"
        }
    ];

    return (
        <Container className="mt-3">
            <h6>
                {list.length > 0 ? "Please choose an athlete from the list." : "You don't have any athletes to review."}
            </h6>
            <NameList list={list} onItemClick={onNameChosen} />

        </Container>
    );
}

export default AthleteList;