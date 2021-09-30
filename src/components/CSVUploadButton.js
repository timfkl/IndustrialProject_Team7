import './CSVUploadButton.css';
import { useState } from 'react'
import React from "react";
import Modal from "react-bootstrap/Modal";

export default function CSVUploadButton(){
    const [isOpen, setIsOpen] = React.useState(false);
    
    const showModal = () => {
        setIsOpen(true);
    };
    
    const hideModal = () => {
        setIsOpen(false);
    };

    const [csvFile, setCsvFile] = useState();

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
        }

        reader.readAsText(file);
    }
    
    return (
        <>
        <button id="uploadButton" className= "button" onClick={showModal}>Upload a CSV</button>
        <Modal show={isOpen} onHide={hideModal}>
            <Modal.Header>
            <Modal.Title>Upload a .csv with sensor data here:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form id='csvForm'>
                <input type='file' accept='.csv' id='csvFile' 
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
                >
                </input>
            </form>
            </Modal.Body>
            <Modal.Footer>
            <button id="cancelButton"  className= "button" onClick={hideModal}>Cancel</button>
            <button id="uploadButton"  className= "button"
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}>
                Submit 
            </button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
