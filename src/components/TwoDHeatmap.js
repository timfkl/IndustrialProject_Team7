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
                        className="ms-2"
                        onClick={playHeatmap}
                    />
                </Col>
                <Col>
                    <heatmapStats />
                </Col>
            </Row>
        </Container>
    );
};


const heatmapStats = ({run}) => {
    // If there is an array of activations in local
    var firstArray = [];
    var secondArray = [];
    var thirdArray = []
    var fourthArray = [];
    let quadRMax = 0;
    let quadLMax = 0;
    let hamsRMax = 0;
    let hamsLMax = 0;
    let quadLAvg = 0;
    let quadRAvg = 0;
    let hamsLAvg = 0;
    let hamsRAvg = 0;
    let quadLStDev = 0;
    let quadRStDev = 0;
    let hamsLStDev = 0;
    let hamsRStDev = 0;
    function run() {
        
        //Some storage brute forcing follows (after an attempt at being elegant)
        //First Array
        if (localStorage.getItem("quad_left")) {
            var tempFirstArray = CSVToArray(sessionStorage.getItem("quad_left"));
            tempFirstArray.shift()
            tempFirstArray.forEach(element => {
                firstArray.push(parseInt(element[1]))
            });
        }
        //Second Array
        if (localStorage.getItem("quad_right")) {
            var tempSecondArray = CSVToArray(sessionStorage.getItem("quad_right"));
            tempSecondArray.shift()
            tempSecondArray.forEach(element => {
                secondArray.push(parseInt(element[1]))
            });
        }
        //Third Array
        if (localStorage.getItem("hams_left")) {
            var tempThirdArray = CSVToArray(sessionStorage.getItem("hams_left"));
            tempThirdArray.shift()
            tempThirdArray.forEach(element => {
                thirdArray.push(parseInt(element[1]))
            });
        }
        //Fourth Array
        if (localStorage.getItem("hams_right")) {
            var tempFourthArray = CSVToArray(sessionStorage.getItem("hams_right"));
            tempFourthArray.shift()
            tempFourthArray.forEach(element => {
                fourthArray.push(parseInt(element[1]))
            });
        }








        
        quadLMax = getGreatest(firstArray, quadLMax);
        quadRMax = getGreatest(secondArray, quadRMax);
        hamsLMax = getGreatest(thirdArray, hamsLMax);
        hamsRMax = getGreatest(fourthArray, hamsRMax);

        quadLAvg = getAverage(firstArray);
        quadRAvg = getAverage(secondArray);
        hamsLAvg = getAverage(thirdArray);
        hamsRAvg = getAverage(fourthArray);

        quadLStDev = getStDev(firstArray, quadLAvg);
        quadRStDev = getStDev(secondArray, quadRAvg);
        hamsLStDev = getStDev(thirdArray, hamsLAvg);
        hamsRStDev = getStDev(fourthArray, hamsRAvg);
    }
    return (
        <p> Quad Left Max Activation:  {quadLMax} <br />
            Quad Right Max Activation:  {quadRMax} <br />
            Hamstring Left Max Activation: {hamsLMax} <br />
            Hamstring Right Max Activation: {hamsRMax} <br />
            <br />
            Quad Left Avg. Activation:  {quadLAvg} <br />
            Quad Right Avg. Activation:  {quadRAvg} <br />
            Hamstring Left Avg. Activation: {hamsLAvg} <br />
            Hamstring Right Avg. Activation: {hamsRAvg} <br />
            <br />
            Quad Left Avg. Std. Deviation:  {quadLStDev} <br />
            Quad Right Avg. Std. Deviation:  {quadRStDev} <br />
            Hamstring Left Avg. Std. Deviation: {hamsLStDev} <br />
            Hamstring Right Avg. Std. Deviation: {hamsRStDev} <br />
        </p>);


    function getGreatest(activationsArray, areaMax) {
        // If there is an array of activations in local
        if (activationsArray != null) {
            // Go through each entry of the array, and find the biggest number, and return it. It is the athlete's personal activation record
            for (var i = 0; i < activationsArray.length; i++) {
                if (areaMax < parseInt(activationsArray[i])) {
                    areaMax = activationsArray[i];
                }
            }
            //localStorage.setItem("Max1", Max1)
            return areaMax;
        }
        return -1;
    }

    function getAverage(activationsArray) {
        // If there is an array of activations in local
        let avgCount = 0;
        if (activationsArray != null) {
            // Go through each entry of the array, and find the biggest number, and return it. It is the athlete's personal activation record
            for (var i = 0; i < activationsArray.length; i++) {
                if (!isNaN(parseInt(activationsArray[i]))) {
                    avgCount = (parseInt(activationsArray[i]) + avgCount);
                }

            }
            //localStorage.setItem("Max1", Max1)
            return parseInt(avgCount / activationsArray.length);
        }
        return -1;
    }

    function getStDev(activationsArray, avg) {
        // If there is an array of activations in local
        let stDev = 0;
        let sum = 0;
        if (activationsArray != null) {
            // Go through each entry of the array, and find the biggest number, and return it. It is the athlete's personal activation record
            for (var i = 0; i < activationsArray.length; i++) {
                if (!isNaN(parseInt(activationsArray[i]))) {
                    var value = parseInt(activationsArray[i]);
                    var squared = (value - avg) ** 2;
                    sum = sum + squared;
                }
            }
            stDev = Math.sqrt((sum / activationsArray.length));
            return Number(stDev.toPrecision(5));
        }
        return -1;
    }

};


export default TwoDHeatmap;
