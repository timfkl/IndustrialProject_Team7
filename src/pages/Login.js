import React, { useState } from "react";
import { Alert, Container, Form, FloatingLabel, Button } from "react-bootstrap";
import OrangeButton from '../components/OrangeButton'
import axios from "axios";

//stylised login page
const Login = () => {
    const [error, setError] = useState(""); //setter for errors not in use. Could add catch errors if needed.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_PATH = "http://localhost/projects/api/login.php"; // api url

    // If the user is already logged in send them to the dashboard.
    if (localStorage.getItem("user_name")) {
        window.location.href = "/loggedin";
    }

    // hard coded user user details.
    const users = {
        physio: {
            name: "Darlene Alderson",
            email: "physio@theohealth.com",
            password: "physio123",
            userTypeID: 1,
        },
        injured: {
            name: "Philip Price",
            email: "injured@theohealth.com",
            password: "injured123",
            userTypeID: 2,
        },
        athlete: {
            name: "Fernando Vera",
            email: "athlete@theohealth.com",
            password: "athlete123",
            userTypeID: 3,
        },
    };

    // Runs when the user submits.
    const handleSubmit = (e) => {
        //Handles form submission. Prevents page from reloading in order to save the data. Then passes the details through to Login func.
        e.preventDefault();

        // axios({
        //     method: "POST",
        //     url: `${API_PATH}`,
        //     headers: { "content-type": "application/json" },
        //     data: {
        //         email: email,
        //         password: password
        //     },
        // })
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         setError(error.message);
        //         console.log(error);
        //     });

        // Compares with hard coded details.
        for (let key in users) {
            if (users[key].email === email && users[key].password === password) {
                // Store username and user type id (1: physio, 2. injured athlete, 3. athlete)
                localStorage.setItem("user_name", users[key].name);
                localStorage.setItem("user_type_ID", users[key].userTypeID);
                window.location.href = "/loggedin"; // Redirect page.
                return;
            }
        }
        setError("The details you have entered are incorrect.");
    };

    return (
        //Login form.
        <Container>
            {/* Shows if the details entered are wrong */}
            <Alert
                variant="danger"
                style={{
                    display: error !== "" ? "block" : "none",
                    margin: 10,
                    textAlign: "center",
                }}
                onClose={() => {
                    setError("");
                }}
                dismissible
            >
                {error}
            </Alert>

            <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                    minWidth: "30%",
                    maxWidth: "90%",
                    padding: "2rem",
                    backgroundColor: "white",
                    borderRadius: 10,
                    textAlign: "center",
                }}
            >
                <img
                    src={`${process.env.PUBLIC_URL}/logo_name.png`}
                    alt=""
                    className="mb-3"
                    style={{ minWidth: "30%", maxWidth: "90%" }}
                />
                <h3 className="mb-5">Sign into your account</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3"></Form.Group>
                    <FloatingLabel label="Email address" className="mb-3">
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </FloatingLabel>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Password">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <OrangeButton text="Sign in" props={{ variant: "warning", type: "submit" }} />
                </Form>
            </div>
        </Container>
    );
};

export default Login;