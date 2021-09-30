import React from 'react';
import { Link } from 'react-router-dom';


const LoggedIn = () => {
    return (
       
        <header> 
             <div className="Container">
            <h5>Athlete View</h5>
            <p>View your latest session here</p>
            <p>heatmap goes here</p> 
            <p> stats on the session </p>
            <Link className="LinkContain" to="/progress"> Progress </Link> 
            </div>
        </header>

    )
}

export default LoggedIn