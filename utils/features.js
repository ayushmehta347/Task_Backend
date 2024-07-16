
const jwt =require('jsonwebtoken');
exports.token=(newUser,res,message,status)=>{
    const token=jwt.sign({_id :newUser._id},process.env.JWT_SECRET);
    
    res.status(status);
     res.json({token,message});
 } 


 ///send normal jwt response
 //how to add in headers