import React from "react";
import { Carousel, Card, CardGroup, Container, Row, Col, Button, Nav } from "react-bootstrap";
import { changeData, Line } from '../components/LineChartWellBeing';
import CSVToArray from "../scripts/CSVToArray";

function selectRandomTask(currentTask1, currentTask2, currentTask3) {
    //function selects a random task from a list & ensures that tasks aren't repeated and are different from previous
    var tasks = ['Drink a glass of water', 'Read a chapter of a good book', 'Try a new recipe', 'Eat a good breakfast', 
    '10+ Minute walk', '8 hours of sleep', 'Watch something funny', 'Clean home', 'Analyse your stress levels', 
    'Make a gratitude list']; //the list of tasks

    var task = tasks[Math.floor(Math.random() * tasks.length)]; //select random
    while (task === currentTask1 || task === currentTask2 || task === currentTask3 ) { //ensure task hasn't just been done
        task = tasks[Math.floor(Math.random() * tasks.length)];
    }
    return task;
}

function loadTasks() {
    //function takes 3 random tasks and load them into the html
    if (document.querySelector('#task1:checked') !== null && document.querySelector('#task2:checked') !== null 
    && document.querySelector('#task3:checked') !== null) { //check that all 3 checkboxes are checked
        var task1 = document.getElementById("task1label").innerHTML; //3 checker variables, used to ensure tasks don't repeat instantly
        var task2 = document.getElementById("task2label").innerHTML;
        var task3 = document.getElementById("task3label").innerHTML;

    //find each label for the checkboxes and call function select a new one
    document.getElementById("task1label").innerHTML = selectRandomTask(task1, task2, task3);
    task1= document.getElementById("task1label").innerHTML; //set the new task as the checker variable
    document.getElementById("task2label").innerHTML = selectRandomTask(task1, task2, task3);
    task2= document.getElementById("task2label").innerHTML;
    document.getElementById("task3label").innerHTML = selectRandomTask(task1, task2, task3);
    document.getElementById("task1").checked = false
    document.getElementById("task2").checked = false
    document.getElementById("task3").checked = false}
}

function collectAnswers() {
    //here we take the checkboxes and store them
    //so the physio can tell if person is emotionally progressing too
    var radiosSleep = document.getElementsByName('sleep'); //the sleep checkboxes
    var radiosDrive = document.getElementsByName('drive'); 
    var radiosStress = document.getElementsByName('stress'); 
    var radiosMood = document.getElementsByName('mood'); 
   
    //variables to set from the checkboxes
    var sleep = 'unselected';
    var stress = 'unselected'; 
    var drive = 'unselected';
    var mood = 'unselected';

    sleep = getRadioResults(radiosSleep);
    drive = getRadioResults(radiosDrive);
    stress = getRadioResults(radiosStress);
    mood = getRadioResults(radiosMood);
    //send check-in results to database here
    console.log(sleep, drive, stress, mood)
    changeData(2,2,2,2);
    document.getElementById('submitButton').innerHTML = "Submitted"; 
}

function getRadioResults(radios) {

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // return radio that is checked
            return radios[i].id;
        }
    }
}

const heatmapStats = () => {
//function heatmapStats() {
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
    //run();
    //function run() {

        //Some storage brute forcing follows (after an attempt at being elegant)
        //First Array
        if (sessionStorage.getItem("quad_left")) {
            var tempFirstArray = CSVToArray(sessionStorage.getItem("quad_left"));
            tempFirstArray.shift()
            tempFirstArray.forEach(element => {
                firstArray.push(parseInt(element[1]))
            });
        }
        //Second Array
        if (sessionStorage.getItem("quad_right")) {
            var tempSecondArray = CSVToArray(sessionStorage.getItem("quad_right"));
            tempSecondArray.shift()
            tempSecondArray.forEach(element => {
                secondArray.push(parseInt(element[1]))
            });
        }
        //Third Array
        if (sessionStorage.getItem("hams_left")) {
            var tempThirdArray = CSVToArray(sessionStorage.getItem("hams_left"));
            tempThirdArray.shift()
            tempThirdArray.forEach(element => {
                thirdArray.push(parseInt(element[1]))
            });
        }
        //Fourth Array
        if (sessionStorage.getItem("hams_right")) {
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
        //}
        console.log(quadLMax);
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

const FinishSession = () => {
    return (
        <header>
             <Container className="WellBeing" style={{ height:'100px', marginTop:'50px'}}>   {/* entire well being section */}
            <Row>
                <Col sm={4}>              
            <div style = {{display: 'inline-block'}}>
                {/* - Check in section, monitors users current feelings */}
                <div className="CheckIn" style={{background: '#f8c097', display:'inline-block', margin:'10px', width:'500px', height:'310px', float:'left', border: '3px solid #195a5c'}}>
                    <ul style={{listStyleType: 'none', display: 'static'}}>
                        <h6 style={{textDecoration: 'underline'}}>Check-in</h6>
                        <h7>Please rate your levels of sleep, drive, stress and mood</h7>
                        <br/>
                        <div style={{paddingTop:'20px', float:'left'}}>
                        <h7>1 = Most positive </h7> </div>
                        <div style={{paddingTop:'20px',textAlign:'center'}}>
                        <h7> 5 = Least positive</h7> </div>
                        <div style={{paddingTop:'20px', textAlign:'left'}}>
                            {/* 4 radio buttons for sleep, drive, stress and mood, flip scale said to decrease answer bias  */}
                            <li style={{paddingTop:'8px'}}><b>Sleep: </b><input type="radio" name="sleep" id="1" /> 1 <input type="radio" name="sleep" id="2"/> 2 <input type="radio" name="sleep" id="3"/> 3 <input type="radio" name="sleep" id="4"/> 4 <input type="radio" name="sleep" id="5"/> 5 <i>Poor sleep quality</i></li>
                            <li style={{paddingTop:'8px'}}><b>Drive: </b><input type="radio" name="drive" id="1"/> 1 <input type="radio" name="drive" id="2"/> 2 <input type="radio" name="drive" id="3"/> 3 <input type="radio" name="drive" id="4"/> 4 <input type="radio" name="drive" id="5"/> 5 <i>Poor drive</i> </li>
                            <li style={{paddingTop:'8px'}}><b>Stress:</b><input type="radio" name="stress" id="1"/> 1 <input type="radio" name="stress" id="2"/> 2 <input type="radio" name="stress" id="3"/> 3 <input type="radio" name="stress" id="4"/> 4 <input type="radio" name="stress" id="5"/> 5 <i>Stress is high</i></li>
                            <li style={{paddingTop:'8px', paddingBottom: '15px'}}><b>Mood: </b><input type="radio" name="mood" id="1"/> 1 <input type="radio" name="mood" id="2"/> 2 <input type="radio" name="mood" id="3"/> 3 <input type="radio" name="mood" id="4"/> 4 <input type="radio" name="mood" id="5"/> 5 <i>Poor mood</i> </li>
                            {/* button to collect check in answers */}
                            <li><button onClick={collectAnswers} id='submitButton' style={{color: '#195a5c', backgroundColor:'#f59e6e', float:'none'}}>Submit</button></li>
                        </div>
                    </ul>
                </div>
                </div>
                </Col>
                <Col sm={4}>
                        {/* - Tasks section, gives users tasks for mental wellbeing */}
                <div className="WellBeingTasks" style={{background: '#9ed4d1', margin:'10px', width: '300px', height: '200px', float: 'right', border: '3px solid #195a5c'}}>
                    <h6 style={{ display: 'inline-block', textDecoration: 'underline'}}>Well Being Tasks </h6>
                    <br/>
                    <div class="tasks" style={{textAlign: 'left'}}> {/* the list of tasks */}
                        <ul style={{listStyleType: 'none', display: 'static'}}>
                            <li><input type="checkbox" id="task1"/>
                            <label id="task1label" for="task1"> Eat a good breakfast</label></li>
                            <li><input type="checkbox" id="task2"/>
                            <label id="task2label" for="task2"> 10+ Minute walk</label></li>
                            <li><input type="checkbox" id="task3"/>
                            <label id="task3label" for="task3"> 8 hours of sleep</label></li> 
                        </ul>             
                    </div>
                    <p style={{color: '#bb6820'}}>Complete all three for new tasks</p>
                    {/* button for getting a new set of tasks */}
                    <button onClick={loadTasks} style={{color: '#195a5c', backgroundColor:'#f59e6e'}}>Get new tasks</button>
                </div>
                </Col>
                <Col sm={4}>
                        <Button href="/progress">Complete Session</Button>
                        <div>
                            {heatmapStats()}
                        </div>
                    </Col>
            </Row>
        </Container>

            </header>


    );
};

export default FinishSession;
