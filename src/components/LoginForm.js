import React, {useState} from 'react';


function LoginForm({Login}) {
    
    function handleChange(e) {//Without this handle change function the code won't actually update the login details in order to check if it matches.
        const {name,value} = e.target;
        setDetails(details=> ({...details, [name]: value}));
    }

    function handleSubmit(e) {//Handles form submission. Prevents page from reloading in order to save the data. Then passes the details through to Login func.
        e.preventDefault();  
        Login(details);
    }

    const [details, setDetails] = useState({email: "", password:""});
    
    return (//Login form.
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

export default LoginForm;
