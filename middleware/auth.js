const User=require('../models/User.js')
const jwt=require('jsonwebtoken');

//handle ERROR (INVALID SIGNATURE)
exports.authenticated=async(req,res,next)=>{

const authHeader=req.headers['authorization']
const token=authHeader && authHeader.split(' ')[1]

if(token==null) return res.status(401)
.json({ message: 'Unauthorized: Token is required' })
try{
     const decoded=jwt.verify(token,process.env.JWT_SECRET);

     req.user=await User.findById(decoded._id);
     next();
}catch (error) {
    console.log("authentication error(token changed")
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}