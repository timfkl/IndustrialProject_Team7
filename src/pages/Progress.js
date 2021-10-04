import React from 'react';
import { Link } from 'react-router-dom';
import Common from '../components/Common';
import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar'
import GoalUploadButton from '../components/GoalUploadButton';
import CSVUploadButton from '../components/CSVUploadButton'

const Progress = () => {

    var goal = localStorage.getItem("goal")

    // This will be the biggest max from the csv, hardcoded example for now
    var currentMax = 269

    var progression = (currentMax / goal) * 100

    return (
       
        <header> 
            <div className="Container">
            <h5>You're Doing great!</h5>
            <h5>Your current goal is: {goal}</h5>
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