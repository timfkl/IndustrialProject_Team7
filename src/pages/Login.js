import React, { useState } from "react";
import LoginForm from "../components/LoginForm";

//stylised login page
const Login = () => {
    
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
        //Split login page into 3 cols in order to center login and maybe add content to the side if needed later.
        <div className="LoginPage">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        {user.email != "" ? ( //If the email is not blank (the user has succesfully submitted the correct details), change the elements on the page to display the welcome page. Might be simpler to take user to new html file instead.
                            <div className="welcome">
                                <h2>
                                    Welcome bro, <span>{user.name}</span>
                                </h2>
                                <button onClick={Logout}>Logout</button>
                            </div>
                        ) : (
                            <LoginForm submitDetails={checkDetails} error={error} />
                        )}
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
