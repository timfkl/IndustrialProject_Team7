import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Common from '../components/Common';
import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar'
import GoalUploadButton from '../components/GoalUploadButton';
import CSVUploadButton from '../components/CSVUploadButton'
import CSVToArray from '../scripts/CSVToArray'
import './Progress.css'
import { Dropdown } from 'react-bootstrap';

const Progress = () => {

    // Create use state goal, and setGoal which modifies its value
    const [goal, setGoal] = useState(localStorage.getItem("goal1") ? localStorage.getItem("goal1"): 0 );

    // Create use state goal, and setMuscleGroup which modifies its value, muscle group 1 is default when page reloads
    const [selectedMuscleGroup, setMuscleGroup] = useState(1);

    const [activeActivationArray, setActiveActivationArray] = useState(1);

    // This will be the biggest max from the csv, hardcoded example for now
    var currentMax = 0

    // An array of comma delimited stats from the csv
    var csvArray 

    // Set to true when the goal is reached, otherwise left undefined, so confetti is hidden
    var showConfetti 

    // An array to store activation stats, removing the dates and time from the csvArray
    var arrayOfActivations = []
    
    // If the user has uploaded a csv - it is stored in local
    if(localStorage.getItem("csv"+activeActivationArray)){
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(localStorage.getItem("csv"+activeActivationArray))
        // Now remove the first entry of the csv array which is just formatting info
        csvArray.shift()
        // Go through the csvArray, take the second element of each array within the array (the activation readings) and add them to a new array 
        csvArray.forEach(element => {
            arrayOfActivations.push(parseInt(element[1])) 
        });(console.log(arrayOfActivations))
    }
    

    // Save that new array to local
    localStorage.setItem("arrayOfActivations", arrayOfActivations)

    // If there is an array of activations in local
    if(localStorage.getItem("arrayOfActivations")){
        // Go through each entry of the array, and find the biggest number, save this to a var called 'currentMax' which is the athlete's personal activation record
        for (var i = 0; i < arrayOfActivations.length; i++) {
            if (currentMax < arrayOfActivations[i] ) {
                currentMax = arrayOfActivations[i];
            }
        }
    }

    // Progression is the client's maximum activation record / their goal * 100 - this isthen shown on the progression bar
    var progression = (currentMax / goal) * 100

    if(progression>=100 && goal != (undefined || 0)){
        showConfetti = true
    }

    // When a muscle group is selected, go to local storage and find "goal + muscle group value", set goal to be that
    const getMuscleGroup = (muscleGroup) => {
        setMuscleGroup (muscleGroup)
        setGoal(localStorage.getItem("goal"+muscleGroup))
        setActiveActivationArray(muscleGroup)
    };

    return (
       
        <header> 
            <div className="confetti" style={{ visibility: showConfetti != undefined? 'visible': 'hidden'}}>
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


            <div className="Container">
            <GoalUploadButton/>
            <CSVUploadButton/>
            <ProgressBar animated now={progression} />



            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    Select a Muscle Group to View
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {getMuscleGroup(1)}}>1</Dropdown.Item>
                    <Dropdown.Item onClick={() => {getMuscleGroup(2)}}>2</Dropdown.Item>
                    <Dropdown.Item onClick={() => {getMuscleGroup(3)}}>3</Dropdown.Item>
                    <Dropdown.Item onClick={() => {getMuscleGroup(4)}}>4</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <h5>You are viewing muscle group: {selectedMuscleGroup}</h5>
            <h5>Your current goal is: {goal}</h5>
            <h5>Your current personal record is: {currentMax}</h5>
            <StyledLink to="/LoggedIn"> Back </StyledLink>
            </div>

        </header>

    )
}

//use styling from common.js for links
const StyledLink = styled(Link)`
    ${Common}
    
`;

export default Progress