const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true 
    },
    title:{
        type:String,
        required:true 
    },
    body:{
        type:String ,
        required:true 
    },
    read:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Notifications',NotificationSchema);