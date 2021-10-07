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

    const [musclePRDisplay, setMusclePRDisplay] = useState(localStorage.getItem("Max1") ? localStorage.getItem("Max1"): 0 )

    // This will be the biggest max from the csv, hardcoded example for now
    var Max1 = 0
    var Max2 = 0
    var Max3 = 0
    var Max4 = 0

    // An array of comma delimited stats from the csv
    var csvArray 

    // Set to true when the goal is reached, otherwise left undefined, so confetti is hidden
    var showConfetti 

    // An array to store activation stats, removing the dates and time from the csvArray
    var arrayOfActivations1 = []
    var arrayOfActivations2 = []
    var arrayOfActivations3 = []
    var arrayOfActivations4 = []
    
    // If the user has uploaded a csv - it is stored in local
    if(localStorage.getItem("csv1")){
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(localStorage.getItem("csv1"))
        // Now remove the first entry of the csv array which is just formatting info
        csvArray.shift()
        // Go through the csvArray, take the second element of each array within the array (the activation readings) and add them to a new array 
        csvArray.forEach(element => {
            arrayOfActivations1.push(parseInt(element[1])) 
        });(console.log(arrayOfActivations1))
    }

    // If the user has uploaded a csv - it is stored in local
    if(localStorage.getItem("csv2")){
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(localStorage.getItem("csv2"))
        // Now remove the first entry of the csv array which is just formatting info
        csvArray.shift()
        // Go through the csvArray, take the second element of each array within the array (the activation readings) and add them to a new array 
        csvArray.forEach(element => {
            arrayOfActivations2.push(parseInt(element[1])) 
        });(console.log(arrayOfActivations2))
    }

    // If the user has uploaded a csv - it is stored in local
    if(localStorage.getItem("csv3")){
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(localStorage.getItem("csv3"))
        // Now remove the first entry of the csv array which is just formatting info
        csvArray.shift()
        // Go through the csvArray, take the second element of each array within the array (the activation readings) and add them to a new array 
        csvArray.forEach(element => {
            arrayOfActivations3.push(parseInt(element[1])) 
        });(console.log(arrayOfActivations3))
    }

    // If the user has uploaded a csv - it is stored in local
    if(localStorage.getItem("csv4")){
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(localStorage.getItem("csv4"))
        // Now remove the first entry of the csv array which is just formatting info
        csvArray.shift()
        // Go through the csvArray, take the second element of each array within the array (the activation readings) and add them to a new array 
        csvArray.forEach(element => {
            arrayOfActivations4.push(parseInt(element[1])) 
        });(console.log(arrayOfActivations4))
    }
    

    // Save that new array to local
    localStorage.setItem("arrayOfActivations1", arrayOfActivations1)

    // Save that new array to local
    localStorage.setItem("arrayOfActivations2", arrayOfActivations2)

    // Save that new array to local
    localStorage.setItem("arrayOfActivations3", arrayOfActivations3)

    // Save that new array to local
    localStorage.setItem("arrayOfActivations4", arrayOfActivations4)



    // If there is an array of activations in local
    if(localStorage.getItem("arrayOfActivations1")){
        // Go through each entry of the array, and find the biggest number, save this to a var called 'Max1' which is the athlete's personal activation record
        for (var i = 0; i < arrayOfActivations1.length; i++) {
            if (Max1 < arrayOfActivations1[i] ) {
                Max1 = arrayOfActivations1[i];
            }
        }
        localStorage.setItem("Max1", Max1)
    }

    // If there is an array of activations in local
    if(localStorage.getItem("arrayOfActivations2")){
        // Go through each entry of the array, and find the biggest number, save this to a var called 'Max2' which is the athlete's personal activation record
        for (var i = 0; i < arrayOfActivations2.length; i++) {
            if (Max2 < arrayOfActivations2[i] ) {
                Max2 = arrayOfActivations2[i];
            }
        }
        localStorage.setItem("Max2", Max2)
    }

    // If there is an array of activations in local
    if(localStorage.getItem("arrayOfActivations3")){
        // Go through each entry of the array, and find the biggest number, save this to a var called 'Max3' which is the athlete's personal activation record
        for (var i = 0; i < arrayOfActivations3.length; i++) {
            if (Max3 < arrayOfActivations3[i] ) {
                Max3 = arrayOfActivations3[i];
            }
        }
        localStorage.setItem("Max3", Max3)
    }
    
    // If there is an array of activations in local
    if(localStorage.getItem("arrayOfActivations4")){
        // Go through each entry of the array, and find the biggest number, save this to a var called 'Max4' which is the athlete's personal activation record
        for (var i = 0; i < arrayOfActivations4.length; i++) {
            if (Max4 < arrayOfActivations4[i] ) {
                Max4 = arrayOfActivations4[i];
            }
        }
        localStorage.setItem("Max4", Max4)
    }


    // When a muscle group is selected, go to local storage and find "goal + muscle group value", set goal to be that
    const getMuscleGroup = (muscleGroup) => {
        setMuscleGroup (muscleGroup)
        setGoal(localStorage.getItem("goal"+muscleGroup))
        
        if (muscleGroup==1){
            setMusclePRDisplay(Max1)
        }
        if (muscleGroup==2){
            setMusclePRDisplay(Max2)
        }
        if (muscleGroup==3){
            setMusclePRDisplay(Max3)
        }
        if (muscleGroup==4){
            setMusclePRDisplay(Max4)
        }
    };



    // Progression is the client's maximum activation record / their goal * 100 - this isthen shown on the progression bar
    var progression = (musclePRDisplay / goal) * 100

    if(progression>=100 && goal != (undefined || 0)){
        showConfetti = true
    }



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
            <h5>Your current personal record is: {musclePRDisplay}</h5>
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