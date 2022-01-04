const mongoose = require("mongoose");

const EmpSchema = new mongoose.Schema({
    empName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      },
  });
  
  const empModel = mongoose.model("Employees", EmpSchema);
  module.exports = empModel;