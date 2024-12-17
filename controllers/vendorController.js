const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const dotEnv = require("dotenv");


dotEnv.config();

const secretKey = process.env.SECRET;

// register or signUp
const vendorRegister = async(req, res) => {
    const { username, email, password } = req.body;
    
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("email already taken")
        }
        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // store in DB through instance creation
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });

        await newVendor.save();
        res.status(201).json({message: "Vendor Register Successful"})
        console.log('registered');
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal Server err"});
    }
}

// login
const vendorLogin = async(req, res) => {
    const {email, password } = req.body;
    try{
        const vendor= await Vendor.findOne({email});
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({error: "Invaild username and password"});
        }
        const token = jwt.sign({vendorId : vendor._id}, secretKey, {expiresIn: "24h"});
        res.status(200).json({success: "Login successful", token});
        console.log(email, "this is token", token);
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server err" });  
    }
}


const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.json({ vendors });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getVendorById = async(req, res )=>{
    const vendorId = req.params.id;
    try{
        const vendor = await Vendor.findById(vendorId).populate("firm");
        if(!vendor){
            return res.status(404).json({error: "Vendor not found"});
        }
        res.status(200).json({vendor});
    }catch (err) {
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
}

module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById};