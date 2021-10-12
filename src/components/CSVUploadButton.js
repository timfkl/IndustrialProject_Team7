// import necessary sources
import { useState } from "react";
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import OrangeButton from "./OrangeButton";

export default function CSVUploadButton() {
    // Create a state for the modal, telling whether it's open or closed
    const [isOpen, setIsOpen] = useState(false);
    // Create a state for the csv uploads 
    const [csvQuadLeft, setCsvQuadLeft] = useState();
    const [csvQuadRight, setCsvQuadRight] = useState();
    const [csvHamsLeft, setCsvHamsLeft] = useState();
    const [csvHamsRight, setCsvHamsRight] = useState();

    var muscleGroup;

    // Opens modal
    const showModal = () => {
        setIsOpen(true);
    };

    // Closes modal
    const hideModal = () => {
        setIsOpen(false);
    };

    // Create a state for the csv upload
    const [csvFile, setCsvFile] = useState();

    // Runs when the submit button is clicked, prints the csv to console - will need to do more in future
    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        muscleGroup = document.getElementById("muscleGroup").value;
        console.log(document.getElementById("muscleGroup").value);

        reader.onload = function (e) {
            const text = e.target.result;
            console.log(text);
            localStorage.setItem("csv" + muscleGroup, text);
            hideModal();
        };

        reader.readAsText(file);
        window.location.reload();
    };

    // The html of the component
    return (
        <>
            {/* This button opens the modal to upload csv files */}
            <OrangeButton text="Upload a CSV" onClick={showModal} />

            {/* When the modal setIsOpen is true, the modal is displayed and offers and area for users to upload a csv */}
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Upload a .csv with sensor data here:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Left Quadriceps</Form.Label>
                        {/* Area to upload csv */}
                        <Form.Control 
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                                setCsvQuadLeft(e.target.files[0]);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Right Quadriceps</Form.Label>
                        {/* Area to upload csv */}
                        <Form.Control 
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                                setCsvQuadRight(e.target.files[0]);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Left Hamstring</Form.Label>
                        {/* Area to upload csv */}
                        <Form.Control 
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                                setCsvHamsLeft(e.target.files[0]);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Right Hamstring</Form.Label>
                        {/* Area to upload csv */}
                        <Form.Control 
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                                setCsvHamsRight(e.target.files[0]);
                            }}
                        />
                    </Form.Group>
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
                            if (csvFile) submit();
                        }}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
}
