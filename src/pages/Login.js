import React from 'react';
import { Link } from 'react-router-dom';
import Common from '../components/Common';
import styled from 'styled-components';

//stylised login page
const Login = () => {
    return (
       
        <header>
            <div className="Container">
                <h5>Login Page</h5>
                <p>Username: enter</p>
                <p>Password: ****</p>
                <StyledLink to="/loggedin"> Submit </StyledLink> 
            </div>
        </header>      
    )
}

//use styling from common.js for links
const StyledLink = styled(Link)`
    ${Common}
`;
export default Login