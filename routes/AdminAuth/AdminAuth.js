const express = require('express')
const router = express.Router() 

const { body, validationResult } = require('express-validator');
// importing user model 
const Admin = require('../../models/Admin')
// ROUTE 02 : Login a Admin 
router.post('/login',async (req,res)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({success:false,msg:"All fields are required !"})
    } 
    try {
        const {email , password } = req.body 
        let admin = await  Admin.findOne({email:email});
        if(!admin){
            return res.status(401).json({success:false,msg:"Username or Password Error"})
        }
        if(admin.password === password){
            return res.status(200).json({success:true,admin:{email , password}})
        }else{
            return res.status(401).json({success:false,msg:"Login Failed"})
        }
    } catch (error) {
        res.status(401).json({success:false,msg:"Internal Server Error"})
        console.log(error.message)
    } 
})
router.post('/register',async(req,res)=>{
    let admin = new Admin({
        email:req.body.email,
        password:req.body.password
    })
    let newadmin = await admin.save()
    res.send(newadmin)
})
module.exports  = router 