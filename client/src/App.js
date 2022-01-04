import './App.css';
import Regin from "./components/Regin";
import Profile from "./components/Profile";
import NewInitiative from "./components/NewInitiative";
import Task from "./components/Task";
import { useState } from "react";
import { StateContext } from "./Helpers/Contexts";
function App() {
  
  const [pageState, setPageState] = useState("regin");
  const [userName,setUserName] = useState("");

  return (
    <div className="App">
      <h1>Mr.Cooper Track and Reward</h1>
      <StateContext.Provider
        value={{ pageState, setPageState, userName, setUserName }}>
        {pageState === "regin" && <Regin />}
        {pageState === "profile" && <Profile />}
        {pageState === "newIni" && <NewInitiative />}
        {pageState === "task" && <Task />}

      </StateContext.Provider>
    </div>
  );
}

export default App;
  