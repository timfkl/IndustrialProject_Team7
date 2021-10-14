import { useState } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import CSVToArray from "../scripts/CSVToArray";
import CSVUploadButton from "./CSVUploadButton";
import TealButton from "./TealButton"
import ImageQuads from "../assets/ImageQuads";
import ImageHams from "../assets/ImageHams";

// This component contains the heatmap and methods to run the heatmap.
const TwoDHeatmap = () => {
    // The initial colors of the heatmap.
    const [quadColorLeft, setQuadColorLeft] = useState("black");
    const [quadColorRight, setQuadColorRight] = useState("black");
    const [hamsColorLeft, setHamsColorLeft] = useState("black");
    const [hamsColorRight, setHamsColorRight] = useState("black");

    // Stores the current zoom level of each image.
    const [quadZoomLevel, setQuadZoomLevel] = useState(0);
    const [hamsZoomLevel, setHamsZoomLevel] = useState(0);

    const [isRunning, setIsRunning] = useState(false); // If the simulation is running.

    // Stores the zoom levels as an json array of viewbox dimensions.
    const zoomLevels = {
        quad: ["0 0 1200 1200", "150 55 900 900", "300 110 600 600"],
        hams: ["0 0 1066 1066", "200 80 680 680", "315 150 440 440"],
    };

    // Simulates data on the heatmap.
    const playHeatmap = () => {
        if (isRunning) return;

        // Simulates data on each point on the left quad muscle.
        if (sessionStorage.getItem("quad_left")) {
            // Gets the specified sensor data saved in session storage and converts to array.
            simulateDataOnPoint(
                CSVToArray(sessionStorage.getItem("quad_left")),
                setQuadColorLeft,
                "LQ"
            );
        }

        // Simulates data on each point on the right quad muscle.
        if (sessionStorage.getItem("quad_right")) {
            // Gets the specified sensor data saved in session storage and converts to array.
            simulateDataOnPoint(
                CSVToArray(sessionStorage.getItem("quad_right")),
                setQuadColorRight,
                "RQ"
            );
        }

        // Simulates data on each point on the left hamstring muscle.
        if (sessionStorage.getItem("hams_left")) {
            // Gets the specified sensor data saved in session storage and converts to array.
            simulateDataOnPoint(
                CSVToArray(sessionStorage.getItem("hams_left")),
                setHamsColorLeft,
                "LH"
            );
        }

        // Simulates data on each point on the right hamstring muscle.
        if (sessionStorage.getItem("hams_right")) {
            // Gets the specified sensor data saved in session storage and converts to array.
            simulateDataOnPoint(
                CSVToArray(sessionStorage.getItem("hams_right")),
                setHamsColorRight,
                "RH"
            );
        }

        setIsRunning(true); // To prevent this function from running again when not finished.
    };

    // Simulates data on each point. Takes in the data as an array, the function of which muscle to change color
    // and optionally the name for debugging purposes.
    async function simulateDataOnPoint(data, setMuscleColor, name) {
        for (let i = 1; i < data.length; i++) {
            // Sets the value and position for the point on the heatmap.
            setMuscleColor(getColorFromValue(parseInt(data[i][1])));
            console.log(`${name}: ${data[i][1]}`);

            // Delays execution according to timestamp data.
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

    // Gets the color based on values in the csv file.
    const getColorFromValue = (value) => {
        if (value < 10) return "gray";
        else if (value >= 10 && value < 200) return "green";
        else if (value >= 200 && value < 400) return "#EDD74B";
        else if (value >= 400 && value < 600) return "#F2B62E";
        else if (value >= 600 && value < 800) return "#DB8535";
        else if (value >= 800 && value < 1000) return "#F25B2E";
        else if (value >= 1000) return "#E82C3D";
    };

    // Sets the zoom level or either image. forQuads is true if the user wants to change zoom
    // for quadriceps image and vice versa. forZoomIn is true if the user wants to zoom in or
    // vice versa.
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
    };

    


    return (
        <Container>
            <Row>
                <Col sm={12} md={6}>
                    <h5>Quadriceps (Front)</h5>
                    <ImageQuads
                        quadColorLeft={quadColorLeft}
                        quadColorRight={quadColorRight}
                        viewBox={zoomLevels.quad[quadZoomLevel]}
                    />
                    <ButtonGroup style={{ width: "100%" }}>
                        <Button
                            variant="secondary"
                            onClick={() => setZoomLevel(true, true)} // If user wants to zoom in
                            disabled={quadZoomLevel === 2} // If max zoom level reached
                        >
                            Zoom In
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setZoomLevel(true, false)} // If user wants to zoom out
                            disabled={quadZoomLevel === 0} // If min zoom level reached
                        >
                            Zoom Out
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col sm={12} md={6}>
                    <h5>Hamstrings (Back)</h5>
                    <ImageHams
                        hamsColorLeft={hamsColorLeft}
                        hamsColorRight={hamsColorRight}
                        viewBox={zoomLevels.hams[hamsZoomLevel]}
                    />
                    <ButtonGroup style={{ width: "100%" }}>
                        <Button
                            variant="secondary"
                            onClick={() => setZoomLevel(false, true)}
                            disabled={hamsZoomLevel === 2}
                        >
                            Zoom In
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setZoomLevel(false, false)}
                            disabled={hamsZoomLevel === 0}
                        >
                            Zoom Out
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    <CSVUploadButton />
                    <TealButton
                        text="Run Simulation"
                        className="mx-2"
                        onClick={playHeatmap}
                    />
                    <TealButton href="/finish" text="Finish Session"/>
                </Col>
                
            </Row>
        </Container>
    );
};


export default TwoDHeatmap;
