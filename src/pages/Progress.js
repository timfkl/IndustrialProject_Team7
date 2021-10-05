import React from 'react';
import { Link } from 'react-router-dom';
import Common from '../components/Common';
import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar'
import GoalUploadButton from '../components/GoalUploadButton';
import CSVUploadButton from '../components/CSVUploadButton'
import CSVToArray from '../scripts/CSVToArray'
import './Progress.css'

const Progress = () => {

    // Get the goal from local storage  
    var goal = localStorage.getItem("goal")

    // This will be the biggest max from the csv, hardcoded example for now
    var currentMax = 0

    // An array of comma delimited stats from the csv
    var csvArray 

    // Set to true when the goal is reached, otherwise left undefined, so confetti is hidden
    var showConfetti 

    // An array to store activation stats, removing the dates and time from the csvArray
    var arrayOfActivations = []
    
    // If the user has uploaded a csv - it is stored in local
    if(localStorage.getItem("csv")){
        // Call the CSVToArray method in 'scripts', which returns the csv as an array
        csvArray = CSVToArray(localStorage.getItem("csv"))
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

    if(progression>=100){
        showConfetti = true
    }

    return (
       
        <header> 
            <div class="confetti" style={{ visibility: showConfetti != undefined? 'visible': 'hidden'}}>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
            </div>

            <div className="Container">
            <h5>You're Doing great!</h5>
            <h5>Your current goal is: {goal}</h5>
            <h5>Your current PR is: {currentMax}</h5>
            <GoalUploadButton/>
            <CSVUploadButton/>
            <ProgressBar animated now={progression} />
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