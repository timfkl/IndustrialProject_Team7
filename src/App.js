import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import CSVUploadButton from './components/CSVUploadButton'

function App() {
  return (
    <div className="App">

      <Navbar/>
      <CSVUploadButton/>

    </div>
  );
}

export default App;
