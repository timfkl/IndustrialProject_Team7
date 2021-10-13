import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import GoalUploadButton from "../components/GoalUploadButton";
import CSVUploadButton from "../components/CSVUploadButton";
import CSVToArray from "../scripts/CSVToArray";
import "./Progress.css";
import { Dropdown } from "react-bootstrap";

//function selects a random task from a list & ensures that tasks aren't repeated and are different from previous
const selectRandomTask = (currentTask1, currentTask2, currentTask3) => {
    //the list of tasks
    var tasks = [
        "Drink a glass of water",
        "Read a chapter of a good book",
        "Try a new recipe",
        "Have a good breakfast",
        "10+ Minute walk",
        "8 hours of sleep",
        "Watch something funny",
        "Clean your house",
        "Analyse your stress levels",
        "Make a gratitude list",
    ];

    var task = tasks[Math.floor(Math.random() * tasks.length)]; //select random task
    while (task === currentTask1 || task === currentTask2 || task === currentTask3) {
        //ensure task hasn't just been done
        task = tasks[Math.floor(Math.random() * tasks.length)];
    }
    return task;
};

//function takes 3 random tasks and load them into the html
const loadTasks = () => {
    if (
        document.querySelector("#task1:checked") !== null &&
        document.querySelector("#task2:checked") !== null &&
        document.querySelector("#task3:checked") !== null
    ) {
        //check that all 3 checkboxes are checked
        var task1 = document.getElementById("task1label").innerHTML; //3 checker variables, used to ensure tasks don't repeat instantly
        var task2 = document.getElementById("task2label").innerHTML;
        var task3 = document.getElementById("task3label").innerHTML;

        //find each label for the checkboxes and call function select a new one
        document.getElementById("task1label").innerHTML = selectRandomTask(task1, task2, task3);
        task1 = document.getElementById("task1label").innerHTML; //set the new task as the checker variable
        document.getElementById("task2label").innerHTML = selectRandomTask(task1, task2, task3);
        task2 = document.getElementById("task2label").innerHTML;
        document.getElementById("task3label").innerHTML = selectRandomTask(task1, task2, task3);
        document.getElementById("task1").checked = false;
        document.getElementById("task2").checked = false;
        document.getElementById("task3").checked = false;
    }
};

const collectAnswers = () => {
    // here we take the checkboxes and store them
    //so the physio can tell if person is emotionally progressing too
    var radiosSleep = document.getElementsByName("sleep"); //the sleep checkboxes
    var radiosDrive = document.getElementsByName("drive");
    var radiosStress = document.getElementsByName("stress");
    var radiosMood = document.getElementsByName("mood");

    //variables to set from the checkboxes
    var sleep = "unselected";
    var stress = "unselected";
    var drive = "unselected";
    var mood = "unselected";

    sleep = getRadioResults(radiosSleep);
    drive = getRadioResults(radiosDrive);
    stress = getRadioResults(radiosStress);
    mood = getRadioResults(radiosMood);
    //send check-in results to database here
    console.log(sleep, drive, stress, mood);
    document.getElementById("submitButton").innerHTML = "Submitted";
};

const getRadioResults = (radios) => {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            return radios[i].id;
        }
    }
};

const Progress = () => {
    // Create use state goal, and setGoal which modifies its value
    const [goal, setGoal] = useState(
        sessionStorage.getItem("goal1") ? sessionStorage.getItem("goal1") : 0
    );

    // Create use state selectedMuscleGroup, setMuscleGroup which modifies its value, muscle group 1 is default when page reloads
    const [selectedMuscleGroup, setMuscleGroup] = useState(1);

    // Create use state musclePRDisplay - the PR of the specific muscle group, setMusclePRDisplay which modifies its value, muscle group 1's PR is default when page reloads
    const [musclePRDisplay, setMusclePRDisplay] = useState(
        sessionStorage.getItem("Max1") ? sessionStorage.getItem("Max1") : 0
    );

    // This will be the biggest max from the csv
    var Max1 = 0;
    var Max2 = 0;
    var Max3 = 0;
    var Max4 = 0;

    // An array of comma delimited stats from the csv
    var csvArray;

    // Set to true when the goal is reached, otherwise left undefined, so confetti is hidden
    var showConfetti;

    // Arrays to store activation stats, removing the dates and time from the csvArray
    var arrayOfActivations1 = [];
    var arrayOfActivations2 = [];
    var arrayOfActivations3 = [];
    var arrayOfActivations4 = [];

    // If the user has uploaded a csv - it is stored in local
    if (sessionStorage.getItem("quad_left")) {
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(sessionStorage.getItem("quad_left"));
        // Now remove the first entry of the csv array which is just formatting info
        csvArray.shift();
        // Go through the csvArray, take the second element of each array within the array (the activation readings) and add them to a new array
        csvArray.forEach((element) => {
            arrayOfActivations1.push(parseInt(element[1]));
        });
        console.log(arrayOfActivations1);
    }

    // If the user has uploaded a csv - it is stored in local
    if (sessionStorage.getItem("quad_right")) {
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(sessionStorage.getItem("quad_right"));
        // Now remove the first entry of the csv array which is just formatting info
        csvArray.shift();
        // Go through the csvArray, take the second element of each array within the array (the activation readings) and add them to a new array
        csvArray.forEach((element) => {
            arrayOfActivations2.push(parseInt(element[1]));
        });
        console.log(arrayOfActivations2);
    }

    // If the user has uploaded a csv - it is stored in local
    if (sessionStorage.getItem("hams_left")) {
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(sessionStorage.getItem("hams_left"));
        // Now remove the first entry of the csv array which is just formatting info
        csvArray.shift();
        // Go through the csvArray, take the second element of each array within the array (the activation readings) and add them to a new array
        csvArray.forEach((element) => {
            arrayOfActivations3.push(parseInt(element[1]));
        });
        console.log(arrayOfActivations3);
    }

    // If the user has uploaded a csv - it is stored in local
    if (sessionStorage.getItem("hams_right")) {
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(sessionStorage.getItem("hams_right"));
        // Now remove the first entry of the csv array which is just formatting info
        csvArray.shift();
        // Go through the csvArray, take the second element of each array within the array (the activation readings) and add them to a new array
        csvArray.forEach((element) => {
            arrayOfActivations4.push(parseInt(element[1]));
        });
        console.log(arrayOfActivations4);
    }

    // Save that new array to local
    sessionStorage.setItem("arrayOfActivations1", arrayOfActivations1);

    // Save that new array to local
    sessionStorage.setItem("arrayOfActivations2", arrayOfActivations2);

    // Save that new array to local
    sessionStorage.setItem("arrayOfActivations3", arrayOfActivations3);

    // Save that new array to local
    sessionStorage.setItem("arrayOfActivations4", arrayOfActivations4);

    // If there is an array of activations in local
    if (sessionStorage.getItem("arrayOfActivations1")) {
        // Go through each entry of the array, and find the biggest number, save this to a var called 'Max1' which is the athlete's personal activation record
        for (var i = 0; i < arrayOfActivations1.length; i++) {
            if (Max1 < arrayOfActivations1[i]) {
                Max1 = arrayOfActivations1[i];
            }
        }
        sessionStorage.setItem("Max1", Max1);
    }

    // If there is an array of activations in local
    if (sessionStorage.getItem("arrayOfActivations2")) {
        // Go through each entry of the array, and find the biggest number, save this to a var called 'Max2' which is the athlete's personal activation record
        for (var i = 0; i < arrayOfActivations2.length; i++) {
            if (Max2 < arrayOfActivations2[i]) {
                Max2 = arrayOfActivations2[i];
            }
        }
        sessionStorage.setItem("Max2", Max2);
    }

    // If there is an array of activations in local
    if (sessionStorage.getItem("arrayOfActivations3")) {
        // Go through each entry of the array, and find the biggest number, save this to a var called 'Max3' which is the athlete's personal activation record
        for (var i = 0; i < arrayOfActivations3.length; i++) {
            if (Max3 < arrayOfActivations3[i]) {
                Max3 = arrayOfActivations3[i];
            }
        }
        sessionStorage.setItem("Max3", Max3);
    }

    // If there is an array of activations in local
    if (sessionStorage.getItem("arrayOfActivations4")) {
        // Go through each entry of the array, and find the biggest number, save this to a var called 'Max4' which is the athlete's personal activation record
        for (var i = 0; i < arrayOfActivations4.length; i++) {
            if (Max4 < arrayOfActivations4[i]) {
                Max4 = arrayOfActivations4[i];
            }
        }
        sessionStorage.setItem("Max4", Max4);
    }

    // When a muscle group is selected, go to local storage and find "goal + muscle group value", set goal to be that
    const getMuscleGroup = (muscleGroup) => {
        setMuscleGroup(muscleGroup);
        setGoal(sessionStorage.getItem("goal" + muscleGroup));

        // Set the pr to be displayed to that of the max of that muscle group
        if (muscleGroup == 1) {
            setMusclePRDisplay(Max1);
        }
        if (muscleGroup == 2) {
            setMusclePRDisplay(Max2);
        }
        if (muscleGroup == 3) {
            setMusclePRDisplay(Max3);
        }
        if (muscleGroup == 4) {
            setMusclePRDisplay(Max4);
        }
    };

    let selectedMuscleGroupName;

    if (selectedMuscleGroup === 1) {
        selectedMuscleGroupName = "Left Quadriceps";
    } else if (selectedMuscleGroup === 2) {
        selectedMuscleGroupName = "Right Quadriceps";
    } else if (selectedMuscleGroup === 3) {
        selectedMuscleGroupName = "Left Hamstring";
    } else {
        selectedMuscleGroupName = "Right Hamstring";
    }

    // Progression is the client's maximum activation record / their goal * 100 - this is then shown on the progression bar
    var progression = (musclePRDisplay / goal) * 100;

    if (progression >= 100 && goal != (undefined || 0)) {
        showConfetti = true;
    }

    return (
        <header>
            {/* Confetti for achieving a goal */}
            <div
                className="confetti"
                style={{ visibility: showConfetti != undefined ? "visible" : "hidden" }}
            >
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
            </div>

            {/* This area allows the user to set a goal, upload a csv and see their progress and PR for each muscle group */}
            <div className="Container">
                <GoalUploadButton />
                <CSVUploadButton />
                <ProgressBar animated now={progression} style={{ width: "50vw" }} />

                <h5>You are viewing muscle group: {selectedMuscleGroupName}</h5>
                <h5>Your current personal record is: {musclePRDisplay}</h5>
                <h5>Your current goal is: {goal}</h5>

                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        Select a Muscle Group to View
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => {
                                getMuscleGroup(1);
                            }}
                        >
                            Left Quadriceps
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                getMuscleGroup(2);
                            }}
                        >
                            Right Quadriceps
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                getMuscleGroup(3);
                            }}
                        >
                            Left Hamstring
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                getMuscleGroup(4);
                            }}
                        >
                            Right Hamstring
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* entire well being section */}
            <div className="WellBeing" style={{ height: "100px", margin: "30px" }}>
                {/* - Check in section, monitors users current feelings */}
                <div
                    className="CheckIn"
                    style={{
                        display: "inline-flex",
                        margin: "10px",
                        width: "300px",
                        height: "200px",
                        float: "left",
                        border: "3px solid #195a5c",
                    }}
                >
                    <ul style={{ listStyleType: "none", display: "static" }}>
                        <h6 style={{ textDecoration: "underline" }}>Check-in</h6>
                        <div style={{ textAlign: "left" }}>
                            {/* 4 radio buttons for sleep, drive, stress and modd */}
                            <li>
                                Sleep: <input type="radio" name="sleep" id="good" /> Good{" "}
                                <input type="radio" name="sleep" id="ok" />
                                Ok <input type="radio" name="sleep" id="bad" />
                                Bad
                            </li>
                            <li style={{ paddingTop: "8px" }}>
                                Drive: <input type="radio" name="drive" id="good" /> Good{" "}
                                <input type="radio" name="drive" id="ok" />
                                Ok <input type="radio" name="drive" id="bad" />
                                Bad
                            </li>
                            <li style={{ paddingTop: "8px" }}>
                                Stress: <input type="radio" name="stress" id="good" /> Good{" "}
                                <input type="radio" name="stress" id="ok" />
                                Ok <input type="radio" name="stress" id="bad" />
                                Bad
                            </li>
                            <li style={{ paddingTop: "8px", paddingBottom: "10px" }}>
                                Mood: <input type="radio" name="mood" id="good" /> Good{" "}
                                <input type="radio" name="mood" id="ok" />
                                Ok <input type="radio" name="mood" id="bad" />
                                Bad
                            </li>
                            {/* button to collect check in answers */}
                            <li>
                                <button
                                    onClick={collectAnswers}
                                    id="submitButton"
                                    style={{
                                        color: "#195a5c",
                                        backgroundColor: "#f59e6e",
                                        float: "none",
                                    }}
                                >
                                    Submit
                                </button>
                            </li>
                        </div>
                    </ul>
                </div>

                {/* - Tasks section, gives users tasks for mental wellbeing */}
                <div
                    className="WellBeingTasks"
                    style={{
                        margin: "10px",
                        width: "300px",
                        height: "200px",
                        float: "right",
                        border: "3px solid #195a5c",
                    }}
                >
                    <h6 style={{ display: "inline-block", textDecoration: "underline" }}>
                        Well Being Tasks{" "}
                    </h6>
                    <br />
                    <div className="tasks" style={{ textAlign: "left" }}>
                        {" "}
                        {/* the list of tasks */}
                        <ul style={{ listStyleType: "none", display: "static" }}>
                            <li>
                                <input type="checkbox" id="task1" />
                                <label id="task1label" for="task1">
                                    {" "}
                                    Eat a good breakfast
                                </label>
                            </li>
                            <li>
                                <input type="checkbox" id="task2" />
                                <label id="task2label" for="task2">
                                    {" "}
                                    10+ Minute walk
                                </label>
                            </li>
                            <li>
                                <input type="checkbox" id="task3" />
                                <label id="task3label" for="task3">
                                    {" "}
                                    8 hours of sleep
                                </label>
                            </li>
                        </ul>
                    </div>
                    <p style={{ color: "#f59e6e" }}>Complete all three for new tasks</p>
                    {/* button for getting a new set of tasks */}
                    <button
                        onClick={loadTasks}
                        style={{ color: "#195a5c", backgroundColor: "#f59e6e" }}
                    >
                        Get new tasks
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Progress;
