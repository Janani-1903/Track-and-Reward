import '../App.css';
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { StateContext } from "../Helpers/Contexts";

export default function NewInitiative() {
  const [listOfInitiatives, setListOfInitiatives] = useState([]);
  const [initiativeName, setIniName] = useState("");
  const [initiativeDescription, setIniDesc] = useState("");
  const [initiativeStatus, setInistat] = useState("");
  const [creationStatus,setCreationStatus] = useState("");

  const { setPageState, userName } = useContext(StateContext);


  useEffect(() => {
    Axios.get("http://localhost:3001/getInitiatives").then((response) => {
      setListOfInitiatives(response.data);
    });
  }, []);

  const createInitiative = () => {
    Axios.post("http://localhost:3001/createInitiative", {
        creator : userName,
        initiativeName : initiativeName,
        initiativeDescription : initiativeDescription,
        initiativeStatus : initiativeStatus,
    }).then((response) =>{
        setListOfInitiatives([
            ...listOfInitiatives,
            {
              userName,initiativeName,initiativeDescription,initiativeStatus,
            },
          ]);
      setCreationStatus(response.data.message);
      setPageState("profile");
    })
  }


  return(
      <div className='App'>
      <div className='addInitiatives'>
          <h2>Add initiatives</h2>
        <label>Intiative name</label>
        <input type="text" onChange={(event) => { setIniName(event.target.value); }}/>
        <label>Intiative Description</label>
        <input type="text" onChange={(event) => { setIniDesc(event.target.value); }}/>
        <label>Intiative Status</label>
        <input type="text" onChange={(event) => { setInistat(event.target.value); }}/>
        <button class='button' onClick={createInitiative}> Create </button>
      </div>
      <h3>{creationStatus}</h3>
      </div>
  );
}