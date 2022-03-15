const express = require('express')
const router = express.Router() 

const FetchAdmin = require('../FetchAdmin');
const Users = require('../../models/User'); 
// middleware 
const FetchUser = require('../FetchUser');
const Notifications = require('../../models/Notifications')
// ROUTER 01 :: SECURED ROUTE :: ADD REVIEW 
router.post('/add' ,async(req,res)=>{
    let success = false  
    const {email , title , body } = req.body ; 
    try {
        if( !email || !title || !body ){
            return res.status(200).json({success:false,msg:"Connot Add Notification"})
        }
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            let newNotification = new Notifications({
                email:req.body.email,
                title:req.body.title,
                body:req.body.body,
                read:false 
            })
            let notif = await newNotification.save() 
            res.status(200).json({success:true , notification:notif})
    } catch (error) {
        res.status(401).json({success:false,msg:"Internal  Server Error"})
        console.log(error.message)
    }
})
router.delete('/delete/:id',FetchUser ,async (req,res)=>{
    let success = false  
    const id = req.params.id ; 
    if(!id){
        return res.status(200).json({success:false,msg:"Connot Delete Notification"})
    }
    try {
        const notification = await Notifications.findByIdAndDelete(id) 
        if(!notification){
            return res.status(401).json({success:false , msg:"notification not available"})
        } 
        res.status(200).json({success:true,msg:"deleted"}); 
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error deleting notifications " })
        console.log(error.message)
    }
})
router.get('/getuser',FetchUser ,async (req,res)=>{
    try {
        const user = await Users.findById(req.user.id); 
        const notifications = await Notifications.find({email:user.email}).sort({date:-1})
        if(!notifications){
            return res.status(401).json({success:false , msg:"notification not available"})
        } 
        res.status(200).json({success:true,data:notifications}); 
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error deleting notifications " })
        console.log(error.message)
    }
})
module.exports = router 