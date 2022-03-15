const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const { body, validationResult } = require('express-validator');

// middleware 
const FetchUser = require('../FetchUser')
const FetchAdmin = require('../FetchAdmin')
// importing user model 
const Users = require('../../models/User')

// ROUTE 01 : Register a User


router.post('/register', 
[
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors); 
        return res.status(401).json({ success:false , msg: "Email or Password Error" })
    }
    let success = false
    // checking if already exists 
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        return res.status(401).json({ success: success, msg: "Email already registered" })
    }
    // hashing the password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    try {
        user = new Users({
            firstName:req.body.firstName,
            lastName:'',
            email: req.body.email,
            password:hashedPassword,
            phone:'',
            gender:'',
            DOB:'',
            village:'',
            street:'',
            mandal:'',
            zip:'',
            district:'',
            state:'',
            userImg:'uploads/user/default_image.png'
        })
        const newUser = await user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.status(200).json({ success, authToken });

    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error" })
        console.log(error.message)
    }
})
// ROUTE 02 : Login a User 
router.post('/login', 
[
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], 

async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:false ,msg: "Username or Password Error" })
    }

    let success = false
    try {
        let user = await Users.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ success, msg: "User Not Exists" })
        }
        let comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(401).json({ success, msg: "Email or Password Error" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.status(200).json({ success, authToken });
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error" })
        console.log(error.message)
    }
})

// ROUTE TO EDIT THE FIELDS 
router.put('/edit', FetchUser, [
    body('fullName').isLength({ min: 1 }),
    body('phone').isLength({ min: 1 }),
], async (req, res) => {
    const id = req.user.id
    let success = false
    try {
        let user = await Users.findByIdAndUpdate(id)
        if (!user) {            
            return res.status(400).json({ success: success, msg: "User Not Found" })
        }
        const { firstName , lastName , gender , DOB , village , mandal , district , state , zipcode , userImg , phone  } = req.body
        if(firstName){
            user.firstName = firstName
        }
        if(lastName){
            user.lastName = lastName
        }
        if(gender){
            user.gender = gender 
        }
        if(DOB){
            user.DOB = DOB 
        }
        if(mandal){
            user.mandal = mandal
        }
        if(village){
            user.mandal = mandal
        }
        if(district){
            user.district = district
        }
        if(state){
            user.state = state
        }
        if(zipcode){
            user.zipcode = zipcode
        }
        if(userImg){
            user.userImg = userImg 
        }
        if(phone){
            user.phone = phone 
        }
        const updatedUser = await user.save()
        res.status(200).json({ success: true, user: updatedUser })
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error" })
        console.log(error.message)
    }
})

// route for getting all the user info 
router.get('/getall', FetchAdmin ,async (req, res) => {
    const users = await Users.find();
    if (users) {
        res.status(200).json({success:true,users});
    }
    else {
        res.status(401).json({success:false , msg:"Internal server error "})
    }
})


// Google Login 
const { OAuth2Client } = require('google-auth-library')

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "746130167111-n7o5qnpn9gns3m0nf75dk72tfton7239.apps.googleusercontent.com"

const client = new OAuth2Client(CLIENT_ID)

router.post('/googlelogin', async (req, res) => {
    try {
            const tokenId  = req.body.tokenId;
            const result = await client.verifyIdToken({ idToken: tokenId, audience: CLIENT_ID })
         
                const email_verified = result.payload.email_verified;
                const name = result.payload.name ; 
                const email = result.payload.email ; 
                const image = result.payload.picture ; 
                let user ; 
                console.log(result.payload); 
                success = false ; 
                if (email_verified) {
                    user = await Users.findOne({ email: email });
                    if (user) {
                        // already in database 
                        const data = {
                            user: {
                                id: user.id
                            }
                        }
                        console.log('logining user')
                        const authToken = jwt.sign(data, JWT_SECRET)
                        success = true
                        res.status(200).json({ success, authToken });
                    }
                    else {
                        // we need to create a user with the same details 
                        let generatedPassword = email + '12345'; 
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(generatedPassword, salt)
                        try {
                            user = new Users({
                                email: email,
                                firstName: name,
                                password: hashedPassword,
                                userImg: image
                            })
                            console.log(user); 
                            const newUser = await user.save();
                            const data = {
                                user: {
                                    id: user.id
                                }
                            }
                            const authToken = jwt.sign(data, JWT_SECRET)
                            success = true
                            res.status(200).json({ success, authToken });
                        } catch (error) {
                            res.status(401).json({ success, msg: "Internal Server Error" })
                            console.log(error.message)
                        }
                    }

                }
                else{
                    console.log('email not verified'); 
                    res.status(404).json({success:false , msg:"Email Not Verified"})
                }
            } catch (error) {
                res.status(400).json({success:false , msg: "Internal Server Error" });
                console.log(error.msg); 
                return;
            }
})

module.exports = router 