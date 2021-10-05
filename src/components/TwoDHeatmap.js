import { Container, Row, Col, Button } from "react-bootstrap";
import imgFront from "../assets/front.jpg";
import imgBack from "../assets/back.jpg";
import CSVToArray from "../scripts/CSVToArray";
import h337 from "heatmap.js";

// Takes in html/jsx id, source image and function call for onLoad and returns an image wrapped in a div with those parameters set.
const DataImage = ({ id, src, onLoad }) => {
    return (
        <div id={id}>
            <img
                src={src}
                alt=""
                width="100%"
                style={{ zIndex: -1 }}
                onLoad={onLoad}
            />
        </div>
    );
};

// This component contains the heatmap and methods to run the heatmap.
const TwoDHeatmap = () => {
    let heatmapQuadLeft, heatmapQuadRight, heatmapHamsLeft, heatmapHamsRight; // Stores instances of h337 heatmap.
    let isRunning = false;

    // Simulates data on the heatmap.
    const playHeatmap = () => {
        if (isRunning) return;

        // Simulates data on each point on the heatmap.
        if (localStorage.getItem("left_quad")) {
            // Gets the specified sensor data saved in localstorage and converts to array.
            simulateDataOnPoint(
                CSVToArray(localStorage.getItem("left_quad")),
                heatmapQuadLeft,
                [210, 220],
                "lq"
            );
        }

        if (localStorage.getItem("right_quad")) {
            simulateDataOnPoint(
                CSVToArray(localStorage.getItem("right_quad")),
                heatmapQuadRight,
                [330, 220],
                "rq"
            );
        }

        if (localStorage.getItem("left_hamstring")) {
            simulateDataOnPoint(
                CSVToArray(localStorage.getItem("left_hamstring")),
                heatmapHamsLeft,
                [220, 210],
                "lh"
            );
        }

        if (localStorage.getItem("right_hamstring")) {
            simulateDataOnPoint(
                CSVToArray(localStorage.getItem("right_hamstring")),
                heatmapHamsRight,
                [330, 210],
                "rh"
            );
        }

        isRunning = true; // To prevent this method from running again when not finished.
    };

    // Simulates data on each point. Takes in the data array [date, value], the h337 instance and position. Name is for debugging.
    async function simulateDataOnPoint(
        array,
        heatmapInstance,
        position,
        name = ""
    ) {
        for (let i = 1; i < array.length; i++) {
            // Sets the value and position for the point on the heatmap.
            heatmapInstance.setData({
                min: 0,
                max: 1025,
                data: [
                    {
                        x: position[0],
                        y: position[1],
                        value: parseInt(array[i][1]),
                    },
                ],
            });

            console.log(`${name}: ${array[i][1]}`);

            // Adds delay according to timestamp data.
            await new Promise((resolve) =>
                setTimeout(
                    resolve,
                    array[i + 1] === undefined
                        ? 0
                        : Date.parse(array[i + 1][0]) - Date.parse(array[i][0])
                )
            );
        }
    }

    // Runs when the images have been loaded. Sets the h337 instances to each point.
    const onDataImageLoad = (isFront) => {
        if (isFront) {
            heatmapQuadLeft = createHeatmapInstance("imageFront");
            heatmapQuadRight = createHeatmapInstance("imageFront");
        } else {
            heatmapHamsLeft = createHeatmapInstance("imageBack");
            heatmapHamsRight = createHeatmapInstance("imageBack");
        }
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
                0: "green",
                0.2: "#EDD74B",
                0.4: "#F2B62E",
                0.6: "#DB8535",
                0.8: "#F25B2E",
                0.95: "#E82C3D",
            },
        });
    };

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