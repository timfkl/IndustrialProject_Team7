import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Theme } from '../scripts/theme';

// Custom login button component.
const LoginButton = () => {
    return (
        <Button
            href="/login"
            variant="warning"
            style={{
                backgroundColor: Theme.colors.orange,
                borderColor: Theme.colors.orange
            }}
        >
            Sign in
        </Button>
    );
}

// Displays navigation bar.
const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="sm">
            <Container fluid>
                {/* Displays Theo health name */}
                <Navbar.Brand href="/">
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
                        <Nav.Link href="/">Home</Nav.Link>
                        {/* <Nav.Link href="/about">About</Nav.Link> */}
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <LoginButton/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;