import { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
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
    const [quadZoomLevel, setQuadZoomLevel] = useState(0);
    const [hamsZoomLevel, setHamsZoomLevel] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    const zoomLevels = {
        quad: [
            "0 0 1200 1200",
            "150 55 900 900",
            "300 110 600 600"
        ],
        hams: [
            "0 0 1066 1066",
            "200 80 680 680",
            "315 150 440 440"
        ]
    }

    // Simulates data on the heatmap.
    const playHeatmap = () => {
        if (isRunning) return;
        console.log("object")

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

        setIsRunning(true); // To prevent this method from running again when not finished.
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

    const setZoomLevel = (forQuads, forZoomIn) => {

        if (forQuads) {

            if (forZoomIn) {
                if (quadZoomLevel < 2) setQuadZoomLevel(quadZoomLevel + 1);

            } else {
                if (quadZoomLevel > 0) setQuadZoomLevel(quadZoomLevel - 1);
            }

        } else {

            if (forZoomIn) {
                if (hamsZoomLevel < 2) setHamsZoomLevel(hamsZoomLevel + 1);

            } else {
                if (hamsZoomLevel > 0) setHamsZoomLevel(hamsZoomLevel - 1);

            }
        }
    }

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <h5>Quadriceps (Front)</h5>
                    <ImageQuads quadColorLeft={quadColorLeft} quadColorRight={quadColorRight} viewBox={zoomLevels.quad[quadZoomLevel]} />
                    <ButtonGroup style={{ width: "100%" }}>
                        <Button variant="secondary" onClick={() => setZoomLevel(true, true)}>Zoom In</Button>
                        <Button variant="secondary" onClick={() => setZoomLevel(true, false)}>Zoom Out</Button>
                    </ButtonGroup>
                </Col>
                <Col sm={6}>
                    <h5>Hamstrings (Back)</h5>
                    <ImageHams hamsColorLeft={hamsColorLeft} hamsColorRight={hamsColorRight} viewBox={zoomLevels.hams[hamsZoomLevel]} />
                    <ButtonGroup style={{ width: "100%" }}>
                        <Button variant="secondary" onClick={() => setZoomLevel(false, true)}>Zoom In</Button>
                        <Button variant="secondary" onClick={() => setZoomLevel(false, false)}>Zoom Out</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    <CSVUploadButton />
                    <Button className="ms-2" onClick={playHeatmap}>
                        Run Simulation
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default TwoDHeatmap;
