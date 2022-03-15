const mongoose = require('mongoose')
const MaidSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    gender:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
    },
    userImg:{
        type:String
    },
    phone:{
        type:String,
        required:true 
    },
    service:{
        type:String,
        required:true 
    },
    DOB:{
        type:String 
    },
    address:{
        type:String 
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Maids',MaidSchema);