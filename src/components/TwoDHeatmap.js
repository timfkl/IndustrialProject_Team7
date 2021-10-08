import { Container, Row, Col, Button } from "react-bootstrap";
import imgFront from "../assets/front.jpg";
import imgBack from "../assets/back.jpg";
import CSVToArray from "../scripts/CSVToArray";
import h337 from "heatmap.js";

// Takes in html/jsx id, source image and function call for onLoad and returns an image wrapped in a div with those parameters set.
const DataImage = ({ id, src, onLoad }) => {
    return (
        // Container for h337 heatmap instances.
        <div id={id}>
            <img src={src} alt="" width="100%" style={{ zIndex: -1 }} onLoad={onLoad} />
        </div>
    );
};

// This component contains the heatmap and methods to run the heatmap.
const TwoDHeatmap = () => {
    let isRunning = false;

    // Stores important attributes of the heatmap instance.
    let heatmapConfig = {
        quad_left: {
            instance: undefined, // h337 instance
            data: [],
            x: 0,
            y: 0,
        },
        quad_right: {
            instance: undefined,
            data: [],
            x: 0,
            y: 0,
        },
        hams_left: {
            instance: undefined,
            data: [],
            x: 0,
            y: 0,
        },
        hams_right: {
            instance: undefined,
            data: [],
            x: 0,
            y: 0,
        },
    };

    // Simulates data on the heatmap.
    const playHeatmap = () => {
        if (isRunning) return;

        // Simulates data on each point on the left quad muscle.
        if (localStorage.getItem("quad_left")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            heatmapConfig["quad_left"].data = CSVToArray(localStorage.getItem("quad_left"));
            simulateDataOnPoint("quad_left");
        }

        // Simulates data on each point on the right quad muscle.
        if (localStorage.getItem("quad_right")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            heatmapConfig["quad_right"].data = CSVToArray(localStorage.getItem("quad_right"));
            simulateDataOnPoint("quad_right");
        }

        // Simulates data on each point on the left hamstring.
        if (localStorage.getItem("hams_left")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            heatmapConfig["hams_left"].data = CSVToArray(localStorage.getItem("hams_left"));
            simulateDataOnPoint("hams_left");
        }

        // Simulates data on each point on the right hamstring.
        if (localStorage.getItem("hams_right")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            heatmapConfig["hams_right"].data = CSVToArray(localStorage.getItem("hams_right"));
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
    const createHeatmapInstance = (container) => {
        return h337.create({
            // only container is required, the rest will be defaults
            container: document.getElementById(container),
            blur: 0,
            radius: 20,
            minOpacity: 0.7,
            gradient: {
                // From green to red.
                0: "green",
                0.2: "#EDD74B",
                0.4: "#F2B62E",
                0.6: "#DB8535",
                0.8: "#F25B2E",
                0.95: "#E82C3D",
            },
        });
    };

    // Runs when the window resizes so the heatmap can respond to the changes.
    const onImageResize = () => {
        const imageFrontSize = [
            document.querySelector("#imageFront").clientWidth,
            document.querySelector("#imageFront").clientHeight,
        ];
        const imageBackSize = [
            document.querySelector("#imageBack").clientWidth,
            document.querySelector("#imageBack").clientHeight,
        ];

        // Sets the points so that they are in the same position when the images resize.
        heatmapConfig["quad_left"].x = Math.floor((2 / 5) * imageFrontSize[0]);
        heatmapConfig["quad_left"].y = Math.floor((2 / 5) * imageFrontSize[1]);

        heatmapConfig["quad_right"].x = Math.floor((3 / 5) * imageFrontSize[0]);
        heatmapConfig["quad_right"].y = Math.floor((2 / 5) * imageFrontSize[1]);

        heatmapConfig["hams_left"].x = Math.floor((2 / 5) * imageBackSize[0]);
        heatmapConfig["hams_left"].y = Math.floor((2 / 5) * imageBackSize[1]);

        heatmapConfig["hams_right"].x = Math.floor((3 / 5) * imageBackSize[0]);
        heatmapConfig["hams_right"].y = Math.floor((2 / 5) * imageBackSize[1]);
    };
    window.onresize = onImageResize; // Runs when the browser resizes.

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <DataImage
                        id={"imageFront"}
                        src={imgFront}
                        onLoad={() => {
                            onDataImageLoad(true);
                        }}
                    />
                </Col>
                <Col sm={6}>
                    <DataImage
                        id={"imageBack"}
                        src={imgBack}
                        onLoad={() => {
                            onDataImageLoad(false);
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={playHeatmap}>Run</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default TwoDHeatmap;
