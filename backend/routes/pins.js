const express=require('express');
const router=express.Router();
const Pin=require('../models/Pin');

//create a pin
router.post("/createpin",async (req,res)=>{
    const newPin=new Pin(req.body);
    try {
        const savedPin=await newPin.save();
       return  res.status(200).json(savedPin)
    } catch (error) {
       return res.status(400).json(error)
    }
});
//get pins
router.get("/getpins", async(req,res)=>{
    try {
        const pins=await Pin.find();
        return  res.status(200).json(pins)
        
    } catch (error) {
        return  res.status(400).json(error)
        
    }

})
module.exports=router