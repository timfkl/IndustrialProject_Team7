import React from 'react';
import { Link } from 'react-router-dom';
import Common from '../components/Common';
import styled from 'styled-components';

const Progress = () => {
    return (
       
        <header> 
             <div className="Container">
            <h5>make progress</h5>
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