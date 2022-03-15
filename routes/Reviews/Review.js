const express = require('express')
const router = express.Router() 

const Reviews = require('../../models/Review') 

// middleware 
const FetchUser = require('../FetchUser');

// ROUTER 01 :: SECURED ROUTE :: ADD REVIEW 
router.post('/add',FetchUser ,async(req,res)=>{
    const userId = req.user.id;
    let success = true  
    try {
        let review = new Reviews({
            user: userId,
            review: req.body.review,
            rating: req.body.rating 
        }) 
        let newReview = await review.save()
        success = true 
        res.status(200).json({success,newReview})
    } catch (error) {
        res.status(401).json({success,msg:"Internal Server Error"})
        console.log(error.message)
    }
})
router.get('/getall',async (req,res)=> {
    try {
        let reviews = await Reviews.find()
        res.status(200).json(reviews)
    } catch (error) {
        res.status(401).json({success,msg:"Internal Server Error"})
        console.log(error.message)
    }
})
module.exports = router 