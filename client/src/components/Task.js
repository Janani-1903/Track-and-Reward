import '../App.css';
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { StateContext } from "../Helpers/Contexts";

export default function Task() {
  const [listOfTasks, setListOfTasks] = useState([]);
  const [initiativeName, setInitiativeName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [taskCreationStatus,setTaskCreationStatus] = useState("");

  const { setPageState, userName } = useContext(StateContext);


  useEffect(() => {
    Axios.get("http://localhost:3001/getTasks").then((response) => {
      setListOfTasks(response.data);
    });
  }, []);

  const createTask = () => {
    Axios.post("http://localhost:3001/createTask", {
        userName : userName,
        initiativeName : initiativeName,
        taskName : taskName,
        loginTime : loginTime,
        logoutTime : logoutTime,
        hoursWorked : hoursWorked,
    }).then((response) =>{
        setListOfTasks([
            ...listOfTasks,
            {
              userName, initiativeName, taskName, loginTime, logoutTime, hoursWorked
            },
          ]);
      setTaskCreationStatus(response.data.message);
      setPageState("profile");
    })
  }


  return(
      <div className='App'>
      <div className='addInitiatives'>
          <h2>Add Tasks</h2>
        <label>Initiative name</label>
        <input type="text" onChange={(event) => { setInitiativeName(event.target.value); }}/>
        <label>Task</label>
        <input type="text" onChange={(event) => { setTaskName(event.target.value); }}/>
        <label>Login Time</label>
        <input type="time" onChange={(event) => { setLoginTime(event.target.value); }}/>
        <label>Logout Time</label>
        <input type="time" onChange={(event) => { setLogoutTime(event.target.value); }}/>
        <label>Number of hours worked</label>
        <input type="number" onChange={(event) => { setHoursWorked(event.target.value); }}/>
        <button class='button' onClick={createTask}> Create </button>
      </div>
      <h3>{taskCreationStatus}</h3>
      </div>
  );
}