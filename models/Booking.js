const mongoose = require('mongoose')
const BookingSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    firstName:{
        type:String 
    },
    lastName:{
        type:String 
    },
    preferGender:{
        type:String
    },
    phone:{
        type:String,
        required:true 
    },
    address:{
        type:Object,
        required:true 
    },
    status:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true 
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Bookings',BookingSchema);