const Todo = require('../models/Todo');
const User=require('../models/User')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {token} = require('../utils/features');


exports.signup=async(req,res)=>{

  try{
  const { name,email,password,confirmPassword }=req.body;

  //let user=await User.findOne({ email });
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
     
    }

     const existingUser = await User.findOne({ email });
    if (existingUser) {
      
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    token(newUser,res,"Registered Successfully",201);
  }catch (error) {
    console.error('Signup failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
  }


exports.login=async(req,res,next)=>{

  try{
    const{name,email,password}=req.body;

    let user=await User.findOne({ email });
    if (!user) {
      return res.status(404)
      .json({ message: 'User not found' });
    }
     
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401)
      .json({ message: 'Invalid Password' });
    }
    
    token(user,res,`welcome,${user.name}`,200);
  } catch (error) {
    console.error('Signin failed:', error);
    res.status(500).json({ message: 'Server error' });
  }

}
exports.logout = (req, res) => {
    
    res.status(200).json({
        success: true,
        user: req.user
    });
};
