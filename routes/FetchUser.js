const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'MY#SECRET@CODE$'
const FetchUser = (req,res,next)=>{
    // GET USER FROM JWT TOKEN 
    let success = false 
    const token = req.header('authToken');
    if(!token){
        return res.status(401).send({success , msg:"Invalid Token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user= data.user 
        next()
    } catch (error) {
        res.status(401).send({success,msg:"Internal Server Error"})
        console.log(error.message)
    }
}
module.exports = FetchUser 