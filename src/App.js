import 'bootstrap/dist/css/bootstrap.min.css';
import  './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
//import pages to link to
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import LoggedIn from "./pages/LoggedIn";
import Progress from "./pages/Progress"
import Navbar from "./components/Navbar"; //navbar component
import AthleteList from './pages/AthleteList'; // List of athletes for physiotherapist

//route the contact and login pages to the js files
function App() {
    return (
        <div className="App">
          <Router>
            <Navbar />
            <Switch>
              <Route path="/contact" component={Contact}/>
              <Route path="/login" component={Login}/>
              <Route path="/about" component={About}/>
              <Route path="/loggedin" component={LoggedIn}/>
              <Route path="/progress" component={Progress}/>
              <Route path="/athletelist" component={AthleteList}/>
            </Switch>
          </Router>
        </div>
    );
}

export default App
