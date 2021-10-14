import { useState } from "react";
import { Container, FormControl, Modal, Button, Table } from "react-bootstrap";
import NameList from "./NameList";
import OrangeButton from './OrangeButton';

// Displays a modal which shows athete details. Takes item as the athlete, showModal
// allows to display modal. onClose is a function prop which runs when the use wants
// to close the modal. onSelect is a function prop which runs when the user clicks
// to see the heatmap.
const DetailsModal = ({item, showModal = false, onClose, onSelect}) => {
    // Displays modal with details.
    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{item.name}'s Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Table is responsive on mouse over */}
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
                <Button variant="danger" onClick={onClose}>Close</Button>
                <OrangeButton text="See Heatmap" onClick={() => {onSelect(item); onClose();}} />
            </Modal.Footer>
        </Modal>
    );
}

// Displays the list of athletes. onNameChosen is a function prop which runs when the user
// wants to see the heatmap for a specified athlete.
const AthleteList = ({ onNameChosen }) => {
    // Test details. Will be replaced with database call. 
    const list = [
        {
            name: "Philip Price",
            image: "https://i.pravatar.cc/150?u=PhilipPrice",
            lastActive: "09/10/21 @ 13:21",
            height: 1.59,
            weight: 72.1,
            dob: "June 23, 1989",
            email: "djupedal@sbcglobal.net",
            mobile: "+44 7700 900496"
        },
        {
            name: "Geoffrey Gould",
            image: "https://i.pravatar.cc/150?u=GeoffreyGould",
            lastActive: "09/10/21 @ 15:23",
            height: 1.72,
            weight: 64.3,
            dob: "Febuary 20, 2002",
            email: "dmouse@mac.com",
            mobile: "+44 7700 900789"
        },
        {
            name: "Caroline Pena",
            image: "https://i.pravatar.cc/150?u=CarolinePena",
            lastActive: "07/10/21 @ 13:12",
            height: 1.56,
            weight: 97.3,
            dob: "August 10, 1999",
            email: "grdschl@icloud.com",
            mobile: "+44 7700 900550"
        },
        {
            name: "Felipe Cooley",
            image: "https://i.pravatar.cc/150?u=FelipeCooley",
            lastActive: "05/10/21 @ 10:30",
            height: 1.67,
            weight: 72.2,
            dob: "June 7, 1996",
            email: "kramulous@hotmail.com",
            mobile: "+44 7700 900377"
        },
        {
            name: "Queen York",
            image: "https://i.pravatar.cc/150?u=QueenYork",
            lastActive: "10/10/21 @ 12:31",
            height: 1.80,
            weight: 101.8,
            dob: "February 10, 1990",
            email: "bockelboy@yahoo.com",
            mobile: "+44 7700 900956"
        },
        {
            name: "Bennett Koch",
            image: "https://i.pravatar.cc/150?u=BennettKoch",
            lastActive: "10/10/21 @ 15:23",
            height: 1.74,
            weight: 96.1,
            dob: "December 19, 2001",
            email: "grolschie@mac.com",
            mobile: "+44 7700 900045"
        },
        {
            name: "Kristofer Villanueva",
            image: "https://i.pravatar.cc/150?u=KristoferVillanueva",
            lastActive: "07/10/21 @ 14:24",
            height: 1.80,
            weight: 62.6,
            dob: "March 21, 1966",
            email: "harryh@verizon.net",
            mobile: "+44 7700 900119"
        },
        {
            name: "Ivan Logan",
            image: "https://i.pravatar.cc/150?u=IvanLogan",
            lastActive: "30/19/21 @ 12:45",
            height: 1.77,
            weight: 97.1,
            dob: "May 31, 2000",
            email: "ewaters@outlook.com",
            mobile: "+44 7700 900643"
        },
        {
            name: "Antwan Watkins",
            image: "https://i.pravatar.cc/150?u=AntwanWatkins",
            lastActive: "03/10/21 @ 16:40",
            height: 1.80,
            weight: 79.1,
            dob: "March 18, 1979",
            email: "epeeist@sbcglobal.net",
            mobile: "+44 7700 900680"
        }
    ];

    const [filteredList, setFilteredList] = useState(list); // stores list of athletes filtered by search.
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState(list[0]); // Specific athlete to show modal for.

    // Filters list of athletes based on search query.
    const filter = e => {

        setFilteredList(list.filter(
            item => {
                return (item.name.toLowerCase().includes(e.target.value.toLowerCase()));
            }
        ));
    }

    // Shows modal to show details about a specific athlete.
    const handleDetailsClick = item => {
        setModalItem(item);
        setShowModal(true);
    }

    const handleClose = () => setShowModal(false);

    return (
        <>
            <DetailsModal showModal={showModal} item={modalItem} onSelect={onNameChosen} onClose={handleClose} />
            <Container className="mt-3">
                <h5>
                    {list.length > 0
                        ? "Please choose an athlete from the list."
                        : "You don't have any athletes to review."}
                </h5>
                <FormControl
                    type="search"
                    placeholder="Search athlete"
                    className="my-3"
                    onChange={filter}
                />
                <NameList list={filteredList} onItemClick={onNameChosen} onDetailsClick={handleDetailsClick} />
            </Container>
        </>
    );
}

export default AthleteList;