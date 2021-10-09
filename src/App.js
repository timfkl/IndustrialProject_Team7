import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";
//import pages to link to
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/NavigationBar"; //navbar component

// Allows the user to move between the pages.
function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                {/* Normal paths that the public can access */}
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />

                {/* Only logged in users can access */}
                <PrivateRoute path="/dashboard" component={Dashboard} />
                
                {/* Defaults to homepage */}
                <Route component={About} />
            </Switch>
        </Router>
    );
}

// Creates a route so that only logged in users can access them.
const PrivateRoute = (props) => {
    const location = useLocation();

    return localStorage.getItem("user_type_ID") ? (
        <Route {...props} />
    ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
    );

    // If user is logged in go to page specifed or else redirect to login page.
};

export default App;
