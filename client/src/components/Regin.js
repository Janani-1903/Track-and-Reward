import '../App.css';
import { useState, useContext } from "react";
import Axios from "axios";
import { StateContext } from "../Helpers/Contexts";

export default function Regin() {

  const { setPageState, userName, setUserName } = useContext(StateContext );
  const [empNameReg,setEmpNameReg] = useState("");
  const [userNameReg,setUserNameReg] = useState("");
  const [emailReg,setEmailReg] = useState("");
  const [passwordReg,setPasswordReg] = useState("");
  const [regStatus,setRegStatus] = useState("");

  const [password,setPassword] = useState("");
  const [loginStatus,setLoginStatus] = useState("");

  const registerEmployee = () => {
    Axios.post("http://localhost:3001/register", {
        empName : empNameReg,
        userName : userNameReg,
        email : emailReg,
        password : passwordReg,
    }).then((response) =>{
      setUserName(userNameReg);
      setRegStatus(response.data.message);
      setPageState("profile");
    })
  }

  const login = () => {
    Axios.post("http://localhost:3001/login", {
        userName : userName,
        password : password,
    }).then((response) =>{
      setLoginStatus(response.data.message);
      setPageState("profile");
    })
  }

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Employee Name</label>
        <input type="text" onChange={(e) => {setEmpNameReg(e.target.value)}}/>
        <label>User name</label>
        <input type="text" onChange={(e) => {setUserNameReg(e.target.value)}} />
        <label>Email</label>
        <input type="text" onChange={(e) => {setEmailReg(e.target.value)}} />
        <label>Password</label>
        <input type="password" onChange={(e) => {setPasswordReg(e.target.value)}} />
        <button onClick={registerEmployee}>Register</button>
      </div>
      <h3>{regStatus}</h3>
      <div className="login"> 
        <h1>Login</h1>
        <label>User Name</label>
        <input type="text" onChange={(e) => {setUserName(e.target.value)}} />
        <label>Password</label>
        <input type="password" onChange={(e) => {setPassword(e.target.value)}} />
        <button onClick={login}>Login</button>
      </div>
      <h3>{loginStatus}</h3>
    </div>
  );
}