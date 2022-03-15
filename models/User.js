const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    password:{
        type:String,
        required:true 
    },
    userImg:{
        type:String
    },
    gender:{
        type:String
    },
    DOB:{
        type:String
    },
    village:{
        type:String
    },
    mandal:{
        type:String
    },
    district:{
        type:String
    },
    state:{
        type:String
    },
    zipcode:{
        type:String
    },
    phone:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Users',UserSchema);