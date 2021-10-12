// import necessary sources
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import OrangeButton from "./OrangeButton";

const CSVUploadButton = ({onSubmit}) => {
    // Create a state for the modal, telling whether it's open or closed
    const [isOpen, setIsOpen] = useState(false);
    // Create a state for the csv uploads 
    const [csvQuadLeft, setCsvQuadLeft] = useState();
    const [csvQuadRight, setCsvQuadRight] = useState();
    const [csvHamsLeft, setCsvHamsLeft] = useState();
    const [csvHamsRight, setCsvHamsRight] = useState();

    // Opens modal
    const showModal = () => setIsOpen(true);

    // Closes modal
    const hideModal = () => setIsOpen(false);

    // Runs when the submit button is clicked, saves file to session storage and alerts parent.
    const submit = () => {
        
        if (csvQuadLeft) saveFile(csvQuadLeft, "quad_left");
        if (csvQuadRight) saveFile(csvQuadRight, "quad_right");
        if (csvHamsLeft) saveFile(csvHamsLeft, "hams_left");
        if (csvHamsRight) saveFile(csvHamsRight, "hams_right");
        
        hideModal();
        if (onSubmit) onSubmit();
    };

    // Saves the files to session storage.
    const saveFile = (file, name) => {
        const reader = new FileReader();
        
        reader.onload = e => {
            sessionStorage.setItem(name, e.target.result);
        };

        reader.readAsText(file);
    }

    // The html of the component
    return (
        <>
            {/* This button opens the modal to upload csv files */}
            <OrangeButton text="Upload .csv files" onClick={showModal} />

            {/* When the modal setIsOpen is true, the modal is displayed and offers and area for users to upload a csv */}
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Upload .csv files</Modal.Title>
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
                        onClick={(e) => {submit()}}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CSVUploadButton;