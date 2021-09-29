import 'bootstrap/dist/css/bootstrap.min.css';
import  './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//pages
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

//route the contact and login pages to the js files
function App() {
    return (
        <div className="App">
          <Router>
            <Navbar />
            <Switch>
              <Route path="/contact" component={Contact}/>
              <Route path="/login" component={Login}/>
            </Switch>
          </Router>
        </div>
    );
}

export default App
