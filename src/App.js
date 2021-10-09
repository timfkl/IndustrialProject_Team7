import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";
//import pages to link to
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import LoggedIn from "./pages/LoggedIn";
import Progress from "./pages/Progress";
import AthleteList from "./pages/AthleteList";
import Navbar from "./components/NavigationBar"; //navbar component

// Allows the user to move between the pages.
function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                {/* Normal paths that the public can access */}
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />

                {/* Only logged in users can access */}
                <PrivateRoute path="/loggedin" component={LoggedIn} />
                <PrivateRoute path="/list" component={AthleteList} />
                <Route component={About} />
            </Switch>
        </Router>
    );
}

// Creates a route so that only logged in users can access them.
const PrivateRoute = (props) => {
    const location = useLocation();
    const userTypeID = localStorage.getItem("user_type_ID");

    

    // If user is logged in go to page specifed or else redirect to login page.
    return userTypeID ? (
        <Route {...props} />
    ) : (
        <Redirect
            to={{
                pathname: "/login",
                state: { from: location },
            }}
        />
    );
};

export default App;
