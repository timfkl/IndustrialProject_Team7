// import necessary sources
import './CSVUploadButton.css';
import { useState } from 'react'
import React from "react";
import { Modal, Form } from "react-bootstrap";

export default function CSVUploadButton(){

    // Create a state for the modal, telling whether it's open or closed
    const [isOpen, setIsOpen] = React.useState(false);
    
    var muscleGroup

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
        console.log(document.getElementById("muscleGroup").value)

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
            localStorage.setItem("csv"+muscleGroup, text)
            hideModal()
        }

        reader.readAsText(file);
        window.location.reload();
    }
    
    // The html of the component
    return (
        <>
            {/* This button opens the modal to upload csv files */}
            <button id="uploadButton" className="button" onClick={showModal}>
                Upload a CSV
            </button>

            {/* When the modal setIsOpen is true, the modal is displayed and offers and area for users to upload a csv */}
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Upload a .csv with sensor data here:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Area to upload csv */}
                    <form id="csvForm">
                        <input
                            type="file"
                            accept=".csv"
                            id="csvFile"
                            onChange={(e) => {
                                setCsvFile(e.target.files[0]);
                            }}
                        ></input>
                    </form>
                </Modal.Body>

                <Modal.Header>
                    <Modal.Title>Which muscle is this data for?</Modal.Title>
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
                    <button id="cancelButton" className="button" onClick={hideModal}>
                        Cancel
                    </button>
                    <button
                        id="uploadButton"
                        className="button"
                        onClick={(e) => {
                            e.preventDefault();
                            if (csvFile) submit();
                        }}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
