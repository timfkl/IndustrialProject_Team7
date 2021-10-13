import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import LoginButton from './LoginButton';
import DashboardButton from './DashboardButton';

// Displays navigation bar.
const NavigationBar = () => {

    return (
        <Navbar bg="light" expand="sm">
            <Container fluid>
                {/* Displays Theo health name */}
                <Navbar.Brand href="/about">
                    <img
                        src={`${process.env.PUBLIC_URL}/logo_name.png`}
                        height="30"
                        className="d-inline-block align-top"
                        alt="Theo Health"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                {/* Links collapse into a togglable container on smaller screens */}
                <Navbar.Collapse id="navbarScroll" style={{ marginLeft: 10 }}>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "30%" }}
                        navbarScroll
                    >
                        <Nav.Link href="/about">Home</Nav.Link>
                        {/* <Nav.Link href="/about">About</Nav.Link> */}
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <DashboardButton/>
                    <LoginButton/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;