const FetchAdmin = (req,res,next)=>{
    // GET USER FROM JWT TOKEN 
    try {
        const email = req.header('Admin');
        if(email === 'admin@mazibai.com'){
            next()
        }else{
            res.status(400).json({success:false,msg:"you are not an admin"})
        }
    } catch (error) {
        res.status(401).json({success:false,msg:"Internal Server Error"})
        console.log(error.message)
    }
    
}
module.exports = FetchAdmin 