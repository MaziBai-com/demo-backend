const express = require('express')
const router = express.Router()
const multer = require('multer')

const FetchUser  = require('./FetchUser')
const Users = require('../models/User')
const Maids = require('../models/Maid') 

const maid = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/maid/');
    },
    filename:function(req,file,cb){
        cb(null, Date.now().toString()+ '_'+file.originalname)
    }
})
const user = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/user/');
    },
    filename:function(req,file,cb){
        cb(null, Date.now().toString()+ '_'+file.originalname)
    }
})
const fileFilter = (req,res,cb)=>{
    if(req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/jpg'){
        cb(null,true);
    }else{
        res.status(400).json({success:false,msg:"Please Select a Correct format"})
    }
}

const userupload = multer({storage:user})
// ROUTE to upload image of user 
router.put('/user', FetchUser , userupload.single('photo') , async(req,res) => {
    try {
        console.log(req.file)
        let user = await Users.findByIdAndUpdate(req.user.id) 
        user.userImg = req.file.path
        const updatedProfile = await user.save()
        console.log(user.userImg)
        res.status(200).json({success:true, profile:updatedProfile})    
    } catch (error) {
        res.status(401).json({success:false,msg:"Internal Server Error"})
        console.log(error.message);
    }
})
// ROUTE to upload image of maid 
const maidupload = multer({storage:maid})
router.put('/maid', FetchUser ,maidupload.single('photo') , async(req,res) => {
    try {
        const userId = req.user.id ; 
        let profile = await Maids.findByIdAndUpdate(userId)
        profile.userImg = req.file.path 
        const updatedProfile = await profile.save()  
        res.status(200).json({success:true})    
    } catch (error) {
        res.status(401).json({success,msg:"Internal Server Error"})
        console.log(error.message);
    }
})
module.exports = router 

// front end validation is required for this images