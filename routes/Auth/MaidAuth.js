const express = require('express')
const router = express.Router() 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const { body, validationResult } = require('express-validator');
// importing user model 
const Maids  = require('../../models/Maid')

// ROUTE 01 : Register a User
router.post('/register', [
    body('email','Invalid Email').isEmail(),
    body('password','Password should be atleast 5 characters').isLength({min:5})
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    let success = false 
    // checking if already exists 
    let user = await Maids.findOne({email:req.body.email});
    if(user){
        return res.status(401).json({success:success , msg:"Email already registered"})
    }
    // hashing the password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password , salt)
    try {
        let {email  , fullName , gender , status , age  , phone , service } = req.body 
        user = new Maids({
            email:email,
            password:hashedPassword,
            fullName:fullName,
            gender:gender,
            userImg : 'uploads\\maid\\default_image.png',
            status : status,
            age:age,
            phone:phone,
            service : service
        })
        const newUser = await user.save();
        const data = {
            user:{
                id:user.id 
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        success = true 
        res.status(200).json({success,authToken});  
        
    } catch (error) {
        res.status(401).json({success,msg:"Internal Server Error"})
        console.log(error.message)
    }
})
// ROUTE 02 : Login a User 
router.get('/login',[
    body('email','Invalid Email').isEmail(),
    body('password','Password should be atleast 5 characters').isLength({min:5})
], async (req,res)=>{
    let success = false 
    try {
        let user = await Maids.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({success,msg:"User Not Exists"})
        }
        let comparePassword = await bcrypt.compare(req.body.password ,user.password)
        if(!comparePassword){
            return res.status(401).json({success,msg:"Email or Password Error"})
        }
        const data = {
            user:{
                id:user.id 
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        success = true 
        res.status(200).json({success,authToken});
    } catch (error) {
        res.status(401).json({success,msg:"Internal Server Error"})
        console.log(error.message)
    } 
})




// route for getting all the user info 
router.get('/getall',async(req,res)=>{
    const maids = await Maids.find();
    if(maids){
        res.status(200).json(maids);  
    }
    else{
        res.status(401).json("Internal server error ")
    }
})

module.exports  = router 