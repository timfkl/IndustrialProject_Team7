// import necessary sources
import { useState } from "react";
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import OrangeButton from "./OrangeButton";

const GoalUploadButton = () => {
    // Create a state for the modal, telling whether it's open or closed
    const [isOpen, setIsOpen] = useState(false);

    var currentGoal = 0;
    var muscleGroup;

    // Opens modal
    const showModal = () => {
        setIsOpen(true);
    };

    // Closes modal
    const hideModal = () => {
        setIsOpen(false);
    };

    // Runs when the submit button is clicked, sets goal in local storage - will need to do more in future
    const submit = () => {
        currentGoal = document.getElementById("goal").value;
        muscleGroup = document.getElementById("muscleGroup").value;
        sessionStorage.setItem("goal" + muscleGroup, currentGoal);
    };

    // The html of the component
    return (
        <>
            {/* This button opens the modal to upload csv files */}
            <OrangeButton text="Set a New Goal" id="uploadButton" onClick={showModal} />

            {/* When the modal setIsOpen is true, the modal is displayed and offers and area for users to upload a csv */}
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>
                        What level of muscle activation do you want to achieve?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="number" id="goal" name="goal" placeholder="e.g. 1024" min="0" />
                </Modal.Body>
                <Modal.Header>
                    <Modal.Title>Which muscle is this goal for?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select id="muscleGroup">
                        <option value={1}>Left Quadriceps</option>
                        <option value={2}>Right Quadriceps</option>
                        <option value={3}>Left Hamstring</option>
                        <option value={4}>Right Hamstring</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    {/* Buttons to close the modal, and submit it (which runs the submit method) */}
                    <Button id="cancelButton" variant="danger" onClick={hideModal}>
                        Cancel
                    </Button>
                    <OrangeButton
                        text="Submit"
                        id="uploadButton"
                        onClick={(e) => {
                            e.preventDefault();
                            submit();
                        }}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default GoalUploadButton;