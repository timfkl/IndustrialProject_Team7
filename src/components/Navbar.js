import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//styles and exports a basic menu bar
const Navbar = () => {

    return (
        <StyledMenu>
            <StyledLink to="/">  Home  </StyledLink>
            <StyledLink to="/login">  Login  </StyledLink>
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
//styling for link
const StyledLink = styled(Link)`
    colour: #2A888A;
    padding:10px;
    text-decoration:none;
    font-size: clamp(30px, 40px, 70px);
    transition: .2s all ease-in-out;
    
    user-select:none;
    
    &:hover{
        tranisiont: 2s all ease-in-out;
        color: #2A888A;
    }
`;

export default Navbar;