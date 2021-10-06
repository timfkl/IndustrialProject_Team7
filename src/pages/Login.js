import React, { useState } from "react";
import LoginForm from "../components/LoginForm";

//stylised login page
const Login = () => {
    const users = {
        physio: {
            email: "physio@test.com", //hard codded login details.
            password: "physio123",
            userTypeID: 1
        },
        injured: {
            email: "injured@test.com", //hard codded login details.
            password: "injured123",
            userTypeID: 2
        },
        athlete:{
            email: "athlete@test.com", //hard codded login details.
            password: "athlete123",
            userTypeID: 3
        }
    };

    const [user, setUser] = useState({ email: "", password: "", userTypeID: 0 });
    const [error, setError] = useState(""); //seter for errors not in use. Could add catch errors if needed.

    const Login = (details) => {
        console.log(details);

        if (details.email == adminUser.email && details.password == adminUser.password) {
            //if the submitted details of the login match, call setter to update details.
            console.log("User Logged In");
            setUser({
                email: details.name,
                password: details.password,
            });
        } else {
            console.log("Wrong details");
            alert("Wrong Details");
        }
    };

    const Logout = () => {
        //If logout button is clicked, set the login details to blank and reload the page. Results starting back at login page.
        console.log("User Logged Out");
        setUser({
            email: "",
            password: "",
        });
        window.location.reload();
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
                            <LoginForm Login={Login} error={error} />
                        )}
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
