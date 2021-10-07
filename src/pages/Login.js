import React, { useState } from "react";
import { Alert, Container, Form, FloatingLabel, Button } from "react-bootstrap";
import axios from "axios";

//stylised login page
const Login = () => {
    const [error, setError] = useState(false); //seter for errors not in use. Could add catch errors if needed.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_PATH = "";

    //hard codded login details.
    const users = {
        physio: {
            email: "physio@test.com",
            password: "physio123",
            userTypeID: 1
        },
        injured: {
            email: "injured@test.com",
            password: "injured123",
            userTypeID: 2
        },
        athlete:{
            email: "athlete@test.com",
            password: "athlete123",
            userTypeID: 3
        }
    };

    const handleSubmit = e => {
        //Handles form submission. Prevents page from reloading in order to save the data. Then passes the details through to Login func.
        e.preventDefault();

        for (let key in users) {
            if (users[key].email === email && users[key].password === password) {
                localStorage.setItem("user", users[key].email);
                localStorage.setItem("userTypeID", users[key].userTypeID);
                return;
            }
        }

        setError(true);
    }

    return (
        //Login form.
        <Container>
            <Alert variant="danger" style={{ display: error ? "block" : "none", margin: 10, textAlign: 'center' }}>
                The details you have entered are incorrect.
            </Alert>

            <Form name="login" className="position-absolute top-50 start-50 translate-middle" onSubmit={handleSubmit}>
                <Form.Group className="mb-3"></Form.Group>
                <FloatingLabel label="Email address" className="mb-3">
                    <Form.Control name="email" type="email" placeholder="name@example.com" onChange={e => { setEmail(e.target.value) }} />
                </FloatingLabel>
                <Form.Group className="mb-3">
                    <FloatingLabel label="Password">
                        <Form.Control name="password" type="password" placeholder="Password" onChange={e => { setPassword(e.target.value) }} />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="primary" type="submit" style={{ alignSelf: 'center' }} >
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Login;

{/* <div className="LoginPage">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-inner">
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <input type="submit" value="login" />
                        </div>
                    </form>
                </div>
            </div> */}