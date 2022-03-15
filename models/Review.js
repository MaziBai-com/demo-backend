const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
        // type:String,
        // required:true,
        // unique:false
    },
    review:{
        type:String,
        required:true 
    },
    rating:{
        type:Number,
        max:5,
        required:true 
    }, 
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Reviews',ReviewSchema);