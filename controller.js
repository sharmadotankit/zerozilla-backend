const UserModel = require("./Models/User");
const AgencyModel = require("./Models/Agency");
const ClientModel = require("./Models/Client");
const {  validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const JET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw {
        message: "Please enter valid data",
      };
    }

    let user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      throw {
        message: "User already exists",
      };
    }

    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    user = await UserModel.create({
      email: req.body.email,
      name: req.body.name,
      password: secPass,
    });

    let data = {
      id: user._id,
      email: user.email,
    };

    jwtOptions = { expiresIn: "720h" };

    let authToken = jwt.sign(data, JET, jwtOptions);

    let jwtUserResponse = await UserModel.findByIdAndUpdate(
      user._id,
      { token: authToken },
      { new: true }
    );

    delete jwtUserResponse.token;
    delete jwtUserResponse.password;

    res.status(201).json({
      status: true,
      data: jwtUserResponse,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
      data: err,
    });
  }
};

const login = async(req,res)=>{
    try{
        let {email,password}=req.body;
        if(!email || !password){
            res.status(401).json({
                status:false,
                statusCode:401,
                message:"Invalid email and password provided"
            })
        }
        let user = await UserModel.findOne({email});

        if(!user){
            throw{
                message:"Email is not registered."
            }
          }

        let passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            throw { message: "Wrong Credentials" };
        }
        let data ={
            user:{
                id:user._id,
                email: user.email,
            }
        }

        let jwtOptions = { expiresIn: '720h' }

        let authToken = jwt.sign(data,JET,jwtOptions);
        let jwtUserResponse = await UserModel.findOneAndUpdate({_id:user._id},{token:authToken},{new:true}).select('-password');;

        res.status(200).json({
            status:true,
            statusCode:200,
            message:"Login Successful",
            data:jwtUserResponse,
        })
    }catch(err){
        res.status(400).json({
            status:false,
            statusCode:400,
            message:err.message,
            error:err,
        })
    }

}

const createAgencyAndClient = (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      status:false,
      statusCode:400,
      message:"Something went wrong while creating agency and client",
      error:err,
  })
  }
};

const updateClient = (req, res) => {
  try {
  } catch (err) {

    res.status(400).json({
      status:false,
      statusCode:400,
      message:"Something went wrong while updating client",
      error:err,
  })

  }
};

const getTopClientForAgency = (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      status:false,
      statusCode:400,
      message:"Something went wrong while getting top client",
      error:err,
  })

  }
};

module.exports = {
  createUser,
  createAgencyAndClient,
  updateClient,
  getTopClientForAgency,
  login,
};
