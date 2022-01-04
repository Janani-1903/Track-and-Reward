const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const empModel = require("./models/Employee");
const iniModel = require("./models/Initiatives");
const taskModel = require("./models/Tasks");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://Janani19:Goodmorning@cluster0.zpfwc.mongodb.net/trackandreward?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

app.post("/register",async(req,res) => {
    const empName =req.body.empName;
    const userName=req.body.userName;
    const email=req.body.email;
    const password=req.body.password;

    const newEmployee = new empModel({ 
        empName : empName,
        userName : userName,
        email : email,
        password : password,
    })
    
    try{
        await newEmployee.save();
        res.send({message: "Successfully registered"});
    } catch(err)
    {
        console.log(err);
    }
})

app.post("/login", async (req,res) => {
    const userName=req.body.userName;
    const password=req.body.password;
    empModel.find({userName: userName , password:password}, (err, response) => {
        if (response.length>0) {
            res.send({message: "Successfully logged in"});
        } 
        else {
          res.send({ message: "Check Username and password" });
        }
      });
})

app.get("/getInitiatives", (req, res) => {
    iniModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });

  app.post("/chosenInitiative", async (req, res) => {
    const chosenInitiative = req.body.chosenInitiative;
    const userName = req.body.userName;

    await iniModel.findOneAndUpdate({ initiativeName : chosenInitiative },{$push : { users: {userName} }}, { new: true, upsert: true });
    res.send({message: "Initiative subscribed successfully"});
  });

app.post("/createInitiative", async (req, res) => {
  const creator = req.body.creator;
  const initiativeName = req.body.initiativeName;
  const initiativeDescription = req.body.initiativeDescription;
  const initiativeStatus = req.body.initiativeStatus;

  const newInitiative = new iniModel({ 
    creator : creator,
    initiativeName : initiativeName,
    initiativeDescription : initiativeDescription,
    initiativeStatus : initiativeStatus,
})

try{
    await newInitiative.save();
    res.send({message: "Initiative created successfully"});
} catch(err)
{
    console.log(err);
}
});

app.get("/getTasks", (req, res) => {
    taskModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });

app.post("/createTask", async (req, res) => {
  const userName = req.body.userName;
  const initiativeName = req.body.initiativeName;
  const taskName = req.body.taskName;
  const loginTime = req.body.loginTime;
  const logoutTime = req.body.logoutTime;
  const hoursWorked = req.body.hoursWorked;

await taskModel.findOneAndUpdate({ userName : userName, initiativeName: initiativeName },
  {$push : { tasks: {taskName : taskName, loginTime : loginTime, logoutTime : logoutTime,hoursWorked : hoursWorked} }}, 
  { new: true, upsert: true });
  res.send({message: "Task created successfully"});
});

app.listen(3001, () => {
    console.log("SERVER STARTED!");
  });