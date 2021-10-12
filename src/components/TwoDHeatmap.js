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

    // Runs when the images have been loaded. Sets the h337 instances to each point.
    const onDataImageLoad = (isFront) => {
        if (isFront) {
            heatmapConfig["quad_left"].instance = createHeatmapInstance("imageFront");
            heatmapConfig["quad_right"].instance = createHeatmapInstance("imageFront");
        } else {
            heatmapConfig["hams_left"].instance = createHeatmapInstance("imageBack");
            heatmapConfig["hams_right"].instance = createHeatmapInstance("imageBack");
        }
        onImageResize(); // Saves the size of the images.
    };

    // Takes in container as html/jsx id and returns an h337 instance that has been configured.
    // const createHeatmapInstance = (container) => {
    //     return h337.create({
    //         // only container is required, the rest will be defaults
    //         container: document.getElementById(container),
    //         blur: 0,
    //         radius: 20,
    //         minOpacity: 0.7,
    //         gradient: {
    //             // From green to red.
    //             0: "green",
    //             0.2: "#EDD74B",
    //             0.4: "#F2B62E",
    //             0.6: "#DB8535",
    //             0.8: "#F25B2E",
    //             0.95: "#E82C3D",
    //         },
    //     });
    // };


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
