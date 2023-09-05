const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt = require('bcrypt');

//signup
router.post("/signup",async (req,res)=>{
    try {
        
        //genrate new pwd
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        //create new user
        const newUser = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        // save user
        const user=newUser.save();
        return res.status(200).json( user.username)
    } catch (error) {
        return res.status(400).json(error)
        
    }
});

//login
router.post("/login",async (req,res)=>{
    try {
        //find user
        const user=await User.findOne({username:req.body.username})
        
        console.log(user)

        //validate pwd
        if(user){

        
        const validPassword=await bcrypt.compare(req.body.password,user.password)
       if(validPassword){
        

        //send res
        res.status(200).json({_id:user._id,username:user.username})
       }
       else{
        res.status(400).json({ err: "Incorrect username or password" });
       }
    }
    else {
        //if !foundUser:
        res.status(400).json({ err: "Incorrect username or password" });
    }
    }catch(error)
    {
        return res.status(500).json(error)
    }
               

});

module.exports=router