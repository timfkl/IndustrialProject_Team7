import React, { useState } from "react";

//stylised login page
const Login = () => {
    const [details, setDetails] = useState({ email: "", password: "" });

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

    const handleChange = e => {
        //Without this handle change function the code won't actually update the login details in order to check if it matches.
        const { name, value } = e.target;
        setDetails((details) => ({ ...details, [name]: value }));
    }

    const handleSubmit = e => {
        //Handles form submission. Prevents page from reloading in order to save the data. Then passes the details through to Login func.
        e.preventDefault();
        submitDetails(details); 
    }

    const [error, setError] = useState(""); //seter for errors not in use. Could add catch errors if needed.

    const checkDetails = details => {
        console.log(details);

        for (let key in users) {
            if (users[key].email === details.email && users[key].password === details.password) {
                localStorage.setItem("user", users[key].email);
                localStorage.setItem("userTypeID", users[key].userTypeID);
                console.log("User Logged In");
            }
        }

        console.log("Wrong details");
        alert("Wrong Details");
    };

    return (
        //Login form.
        <form onSubmit={handleSubmit}>
            <div className="form-inner">
                <h3>Login:</h3>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={handleChange} />
                </div>
                <input type="submit" value="login" />
            </div>
        </form>
    );
};

export default Login;
