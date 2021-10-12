import { Container, Row, Col, Button } from "react-bootstrap";
import CSVToArray from "../scripts/CSVToArray";
import CSVUploadButton from "./CSVUploadButton";
import ImageQuads from "../assets/ImageQuads";
import ImageHams from "../assets/ImageHams";

// This component contains the heatmap and methods to run the heatmap.
const TwoDHeatmap = () => {
    let isRunning = false;

    // Simulates data on the heatmap.
    const playHeatmap = () => {
        if (isRunning) return;

        // Simulates data on each point on the left quad muscle.
        if (localStorage.getItem("csv1")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            heatmapConfig["quad_left"].data = CSVToArray(localStorage.getItem("csv1"));
            simulateDataOnPoint("quad_left");
        }

        // Simulates data on each point on the right quad muscle.
        if (localStorage.getItem("csv2")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            heatmapConfig["quad_right"].data = CSVToArray(localStorage.getItem("csv2"));
            simulateDataOnPoint("quad_right");
        }

        // Simulates data on each point on the left hamstring.
        if (localStorage.getItem("csv3")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            heatmapConfig["hams_left"].data = CSVToArray(localStorage.getItem("csv3"));
            simulateDataOnPoint("hams_left");
        }

        // Simulates data on each point on the right hamstring.
        if (localStorage.getItem("csv4")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            heatmapConfig["hams_right"].data = CSVToArray(localStorage.getItem("csv4"));
            simulateDataOnPoint("hams_right");
        }

        isRunning = true; // To prevent this method from running again when not finished.
    };

    // Simulates data on each point. Takes in the name of the key in heatmapConfig.
    async function simulateDataOnPoint(configName) {
        for (let i = 1; i < heatmapConfig[configName].data.length; i++) {
            // Sets the value and position for the point on the heatmap.
            heatmapConfig[configName].instance.setData({
                min: 0,
                max: 1025,
                data: [
                    {
                        x: heatmapConfig[configName].x,
                        y: heatmapConfig[configName].y,
                        value: parseInt(heatmapConfig[configName].data[i][1]),
                    },
                ],
            });

            console.log(`${configName}: ${heatmapConfig[configName].data[i][1]}`);

            // Adds delay according to timestamp data.
            await new Promise((resolve) =>
                setTimeout(
                    resolve,
                    // If reached the end of array do not set delay or else set delay according to milliseconds between current and next timestamps.
                    heatmapConfig[configName].data[i + 1] === undefined
                        ? 0
                        : Date.parse(heatmapConfig[configName].data[i + 1][0]) -
                              Date.parse(heatmapConfig[configName].data[i][0])
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
