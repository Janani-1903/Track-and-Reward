const mongoose = require("mongoose");

const initiativeSchema = new mongoose.Schema({
    creator: {
      type: String,
      required: true,
    },
    initiativeName: {
      type: String,
      required: true,
    },
    initiativeDescription: {
      type: String,
      required: true,
    },
    initiativeStatus: {
      type: String,
      required: true,
    },
    users: [{userName :{type: String, unique:true}}],
  });
  
  const iniModel = mongoose.model("Initiatives", initiativeSchema);
  module.exports = iniModel;