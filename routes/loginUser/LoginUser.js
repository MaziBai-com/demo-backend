const express = require('express')
const Users = require('../../models/User')
const FetchUser = require('../FetchUser')
const router = express.Router() 

router.get('/getuserinfo', FetchUser , async (req,res)=>{
    let success = false 
    try {
        const user = await Users.findById(req.user.id);
        success = true 
        res.status(200).json({success,user})
    } catch (error) {
        res.status(401).json({success,msg:"Internal Server Error"})
        console.log(error.message)
    }
})

module.exports = router 