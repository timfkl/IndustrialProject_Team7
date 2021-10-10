// import necessary sources
import { useState } from "react";
import React from "react";
import { Modal } from "react-bootstrap";
import OrangeButton from "./OrangeButton";

export default function GoalUploadButton() {
    // Create a state for the modal, telling whether it's open or closed
    const [isOpen, setIsOpen] = React.useState(false);

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
        localStorage.setItem("goal" + muscleGroup, currentGoal);
        window.location.reload();
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
                    <input type="text" id="goal" name="goal" placeholder="e.g. 1024" />
                    <br />
                </Modal.Body>
                <Modal.Header>
                    <Modal.Title>Which muscle group is this for? (1-4)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" id="muscleGroup" name="muscleGroup" placeholder="e.g. 1" />
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    {/* Buttons to close the modal, and submit it (which runs the submit method) */}
                    <button id="cancelButton" className="button" onClick={hideModal}>
                        Cancel
                    </button>
                    <button
                        id="uploadButton"
                        className="button"
                        onClick={(e) => {
                            e.preventDefault();
                            submit();
                        }}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
