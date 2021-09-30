import React from 'react';
import { Link } from 'react-router-dom';
//for styling 
import styled from 'styled-components';
import Common from '../components/Common';


const LoggedIn = () => {
    return (
       
        <header> 
             <div className="Container">
            <h5>Athlete View</h5>
            <p>View your latest session here</p>
            <p>heatmap goes here</p> 
            <p> stats on the session </p>
            <StyledLink className="LinkContain" to="/progress"> Progress </StyledLink> 
            </div>
        </header>

    )
}

//use styling from common.js for links
const StyledLink = styled(Link)`
    ${Common}
`;

export default LoggedIn