import { useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import CSVToArray from "../scripts/CSVToArray";
import CSVUploadButton from "./CSVUploadButton";
import ImageQuads from "../assets/ImageQuads";
import ImageHams from "../assets/ImageHams";

// This component contains the heatmap and methods to run the heatmap.
const TwoDHeatmap = () => {
    const [quadColorLeft, setQuadColorLeft] = useState("black");
    const [quadColorRight, setQuadColorRight] = useState("black");
    const [hamsColorLeft, setHamsColorLeft] = useState("black");
    const [hamsColorRight, setHamsColorRight] = useState("black");
    let isRunning = false;

    // Simulates data on the heatmap.
    const playHeatmap = () => {
        if (isRunning) return;

        // Simulates data on each point on the left quad muscle.
        if (localStorage.getItem("csv1")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            simulateDataOnPoint(CSVToArray(localStorage.getItem("csv1")), setQuadColorLeft, "LQ");
        }

        // Simulates data on each point on the right quad muscle.
        if (localStorage.getItem("csv2")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            simulateDataOnPoint(CSVToArray(localStorage.getItem("csv2")), setQuadColorRight, "RQ");
        }

        // Simulates data on each point on the left hamstring muscle.
        if (localStorage.getItem("csv3")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            simulateDataOnPoint(CSVToArray(localStorage.getItem("csv3")), setHamsColorLeft, "LH");
        }

        // Simulates data on each point on the right hamstring muscle.
        if (localStorage.getItem("csv4")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            simulateDataOnPoint(CSVToArray(localStorage.getItem("csv4")), setHamsColorRight, "RH");
        }

        isRunning = true; // To prevent this method from running again when not finished.
    };

    // Simulates data on each point. Takes in the name of the key in heatmapConfig.
    async function simulateDataOnPoint(data, setMuscleColor, name) {
        for (let i = 1; i < data.length; i++) {
            // Sets the value and position for the point on the heatmap.
            setMuscleColor(getColorFromValue(parseInt(data[i][1])));
            console.log(`${name}: ${data[i][1]}`);

            // Adds delay according to timestamp data.
            await new Promise((resolve) =>
                setTimeout(
                    resolve,
                    // If reached the end of array do not set delay or else set delay according to milliseconds between current and next timestamps.
                    data[i + 1] === undefined
                        ? 0
                        : Date.parse(data[i + 1][0]) - Date.parse(data[i][0])
                )
            );
        }
    }

    const getColorFromValue = value => {

        if (value < 10) return "gray";
        else if (value >= 10 && value < 200) return "green";
        else if (value >= 200 && value < 400) return "#EDD74B";
        else if (value >= 400 && value < 600) return "#F2B62E";
        else if (value >= 600 && value < 800) return "#DB8535";
        else if (value >= 800 && value < 1000) return "#F25B2E";
        else if (value >= 1000) return "#E82C3D";
    }


    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <h5>Quadriceps (Front)</h5>
                    <ImageQuads/>
                </Col>
                <Col sm={6}>
                    <h5>Hamstrings (Back)</h5>
                    <ImageHams/>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    <CSVUploadButton/>
                    <Button className="ms-2" onClick={playHeatmap}>Run Simulation</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default TwoDHeatmap;
