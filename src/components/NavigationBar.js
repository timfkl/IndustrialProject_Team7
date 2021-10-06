import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Common from './Common';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Theme } from '../scripts/theme';

//styles and exports a basic menu bar
const NavigationBar = () => {
    return (
        <Navbar style={{ backgroundColor: Theme.colors.orange }} >
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
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

export default NavigationBar;