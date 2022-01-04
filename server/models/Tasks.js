const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
    },
    initiativeName: {
      type: String,
      required: true,
    },
    tasks: [{taskName: String, loginTime: String, logoutTime:String, hoursWorked:String}]
  });
  
  const TaskModel = mongoose.model("Tasks", TaskSchema);
  module.exports = TaskModel;