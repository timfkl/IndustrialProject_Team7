// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from './logo.svg';
// import './App.css';
// import Navbar from './components/Navbar';
// import {Container} from 'react-bootstrap';
// import React, {useState} from 'react';
// import LoginForm from './LoginForm';

// function Welcome() {
//   const adminUser = {
//     email: "test@test.com",
//     password: "test123"
//   }

//   const [user, setUser] = useState({email: "", password: ""});
//   const [error, setError] = useState("");
  
//   const Login = details => {
//     console.log(details);

//     if(details.email == adminUser.email && details.password == adminUser.password) {
//       console.log("User Logged In");
//       setUser({
//         email: details.name,
//         password: details.password
//       });
//     } else {
//       console.log("Wrong details");
//       alert("Wrong Details");
//     }

//   }

//   const Logout = () => {
//     console.log("User Logged Out");
//     setUser({
//       email: "",
//       password: ""
//     });
//     window.location.reload();
//   }

//   return (
//     <div className="LoginPage">
//       <div className="container">
//           <div className = "row">
//             <div className = "col-lg-4">
//             </div>
//             <div className="col-lg-4">
//             {(user.email != "") ? (
//                 <div className = "welcome">
//                   <h2>Welcome bro, <span>{user.name}</span></h2>
//                   <button onClick={Logout}>Logout</button>
//                 </div>
//               ) : (
//                 <LoginForm Login={Login} error={error}/>
//               )}
//           </div>
//           <div className="col-lg-4">

//           </div>
//           </div>
//         </div>
//       </div>



//   );
// }

// export default Welcome;
