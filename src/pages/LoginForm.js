import React, {useState} from 'react';
 import './App.css';


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

function Login() {
  const adminUser = {
    email: "test@test.com", //hard codded login details.
    password: "test123"
  }

  const [user, setUser] = useState({email: "", password: ""});
  const [error, setError] = useState("");//seter for errors not in use. Could add catch errors if needed.
  
  const Login = details => {
    console.log(details);

    if(details.email == adminUser.email && details.password == adminUser.password) { //if the submitted details of the login match, call setter to update details.
      console.log("User Logged In");
      setUser({
        email: details.name,
        password: details.password
      });
    } else {
      console.log("Wrong details");
      alert("Wrong Details");
    }

  }

  const Logout = () => { //If logout button is clicked, set the login details to blank and reload the page. Results starting back at login page.
    console.log("User Logged Out");
    setUser({
      email: "",
      password: ""
    });
    window.location.reload();
  }

  return ( //Split login page into 3 cols in order to center login and maybe add content to the side if needed later.
    <div className="LoginPage">
      <div className="container">
          <div className = "row">
            <div className = "col-lg-4">
            </div>
            <div className="col-lg-4">
            {(user.email != "") ? ( //If the email is not blank (the user has succesfully submitted the correct details), change the elements on the page to display the welcome page. Might be simpler to take user to new html file instead.
                <div className = "welcome">
                  <h2>Welcome bro, <span>{user.name}</span></h2>
                  <button onClick={Logout}>Logout</button>
                </div>
              ) : (
                <LoginForm Login={Login} error={error}/>
              )}
          </div>
          <div className="col-lg-4">

          </div>
          </div>
        </div>
      </div>



  );
}

export default App;
