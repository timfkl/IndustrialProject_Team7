import React, {useState} from 'react';
 import './App.css';


function LoginForm({Login, error}) {
    
    function handleChange(e) {
        const {name,value} = e.target;
        setDetails(details=> ({...details, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();  
        Login(details);
    }

    const [details, setDetails] = useState({email: "", password:""});
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-inner">
                <h3>Login:</h3>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={handleChange}/>
                </div>
                <input type="submit" value= "login"/>
            </div>

        </form>
    )
}



export default LoginForm
