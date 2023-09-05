const mongoose = require('mongoose');
//const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:3,
        max:15,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default:Date.now
    },
  
  });
module.exports= mongoose.model("User",UserSchema);
