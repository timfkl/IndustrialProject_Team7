import React, { useState } from "react";
import { Alert, Container, Form, FloatingLabel, Button } from "react-bootstrap";
import axios from "axios";
// import './Login.css';

//stylised login page
const Login = () => {
    const [error, setError] = useState(""); //seter for errors not in use. Could add catch errors if needed.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_PATH = "http://localhost/projects/api/login.php";

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

        axios({
            method: "POST",
            url: `${API_PATH}`,
            headers: { "content-type": "application/json" },
            data: {
                email: email,
                password: password
            },
        })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                setError(error.message);
                console.log(error);
            });

        // for (let key in users) {
        //     if (users[key].email === email && users[key].password === password) {
        //         localStorage.setItem("user", users[key].email);
        //         localStorage.setItem("userTypeID", users[key].userTypeID);
        //         return;
        //     }
        // }
        // setError("The details you have entered are incorrect.")
    }

    return (
        //Login form.
        <Container>
            <Alert variant="danger" style={{ display: error !== "" ? "block" : "none", margin: 10, textAlign: 'center' }} onClose={() => {setError("")}} dismissible>
                {error}
            </Alert>

            <div className="position-absolute top-50 start-50 translate-middle" style={{ minWidth: '30%', maxWidth: '90%', padding: '2rem', backgroundColor: 'white', borderRadius: 10 }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3"></Form.Group>
                    <FloatingLabel label="Email address" className="mb-3">
                        <Form.Control name="email" type="email" placeholder="name@example.com" onChange={e => { setEmail(e.target.value) }} />
                    </FloatingLabel>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Password">
                            <Form.Control name="password" type="password" placeholder="Password" onChange={e => { setPassword(e.target.value) }} />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ display: 'flex', justifySelf: 'center' }} >
                        Sign in
                    </Button>
                </Form>

            </div>

        </Container>
    );
};

export default Login;


// action={API_PATH} method="POST"