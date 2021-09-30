import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Common from './Common';


//styles and exports a basic menu bar
const Navbar = () => {
    return (
        <StyledMenu>
            <StyledLink to="/login">  Login  </StyledLink>
            <StyledLink to="/about">  About  </StyledLink>
            <StyledLink to="/contact">  Contact  </StyledLink>
        </StyledMenu>     
    )
}

//styling for menu
const StyledMenu = styled.div`
    position: fixed    
    top:0;
    width:100%
    @media screen and (min-width: 790px) {
        width: 60%;
    }
    background-color: #f59e6e;
    display:flex;
    flex-direction: row;
    `
//use styling from common.js for links
const StyledLink = styled(Link)`
    ${Common}
    font-size: clamp(20px, 30px, 40px);

    &:hover{
        tranisiont: 2s all ease-in-out;
        color: #195a5c;
        background-color: #F26C23;
    }
`;

export default Navbar;