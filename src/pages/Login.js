import React from 'react';
import { Link } from 'react-router-dom';

//stylised login page
const Login = () => {
    return (
       
        <header>
            <div className="Container">
                <h5>Login Page</h5>
                <p>Username: enter</p>
                <p>Password: ****</p>
                <Link to="/loggedin"> Submit </Link> 
            </div>
        </header>      
    )
}
export default Login