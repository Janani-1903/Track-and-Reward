import '../App.css';
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { StateContext } from "../Helpers/Contexts";

export default function Profile() {

  const { setPageState, userName } = useContext(StateContext );
  const [listOfInitiatives, setListOfInitiatives] = useState([]);
  const [chosenValue, setChosenValue] = useState("");
  const [chosenState, setChosenState] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getInitiatives").then((response) => {
      setListOfInitiatives(response.data);
    });
  }, []);

  const submitChosen = () => {
    Axios.post("http://localhost:3001/chosenInitiative", {
        userName : userName,
        chosenInitiative : chosenValue,
    }).then((response) =>{
      setChosenState(response.data.message);
    });
  }

    return(
        <div className="App">
          <div className='displayInitiatives'>
          <h2>Initiatives</h2>
          <label>--Choose an initiative--</label>
          <br></br>
            <select onChange={(e) => {setChosenValue(e.target.value)}}> 
            <option>--Select--</option>
            {listOfInitiatives.map((Initiatives) => 
            <option value= {Initiatives.initiativeName}>
            {Initiatives.initiativeName}, 
            {Initiatives.initiativeDescription}, 
            {Initiatives.initiativeStatus}
            </option>)}
            </select>
            <button onClick={submitChosen}> Subscribe </button>
            <h4>{chosenState}</h4>

        </div>
        <div className='displayButtons'>
            <br></br>
            <button class="button" onClick={() => { setPageState("newIni"); }}>Create new initiative</button>
            <br></br><br></br>
            <button class="button" onClick={() => { setPageState("task"); }}>Enter Task</button>
            <br></br><br></br>
            <button class="button" onClick={() => { setPageState("regin"); }}>Logout</button>
            <br></br><br></br>
        </div>
    </div>
    );
}
