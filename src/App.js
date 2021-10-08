import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";
//import pages to link to
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import LoggedIn from "./pages/LoggedIn";
import Progress from "./pages/Progress";
import Navbar from "./components/NavigationBar"; //navbar component

// Allows the user to move between the pages.
function App() {

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />
                
                <PrivateRoute path="/loggedin" component={LoggedIn} />
                <PrivateRoute path="/progress" component={Progress} />
                <Route component={About} />
            </Switch>
        </Router>
    );
}

const PrivateRoute = (props) => {
    const location = useLocation();
    const authLogin = localStorage.getItem('user_name');
    console.log("authLogin", authLogin);
    console.log(useLocation());
  
    return authLogin ? (
      <Route {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    );
  };

export default App;