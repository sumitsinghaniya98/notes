const {User} = require("../models/User.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require('dotenv').config();

const signup = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const hashed_password = bcrypt.hashSync(password, 10);
        const new_user = new User({
            email: email,
            password: hashed_password
        })
        await new_user.save();
        res.status(200).send({message: 'Signup successfully'})
        
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
}

const login = async(req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email});
        if(!user){
            res.status(401).send({message:"User not found"});
            return
        }

        const correct_password = bcrypt.compareSync(password, user.password)
        if(correct_password){
            const jwt_token = jwt.sign({userID: user._id}, process.env.JWT_SECRET)
            res.status(200).send({message:"Login Successful", token:jwt_token})
        }
    } catch (error) {
        res.status(500).send({message:"Internal server error"})
    }
}

module.exports ={signup, login}