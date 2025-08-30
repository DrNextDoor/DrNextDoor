
const { default: mongoose } = require('mongoose')
const bcrypt = require('bcryptjs');
const Doctor = require('./../models/Doctor.js')
const Admin = require('./../models/Admin.js')
const jwt = require('jsonwebtoken')

async function addDoctor(req, res) {
    try {
        let {name,email,password,specialization,experience,bioMessage,approved,appointments,address,slots} = req.body;  // Extract doctor data
        const image = req.file?.filename
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        const doctorData={
            name,
            email,
            password,
            specialization,
            experience,
            bioMessage,
            approved,
            appointments,
            address,
            slots,
            profileImage:image
        }

        const salt=await bcrypt.genSalt(10)
        doctorData.password=await bcrypt.hash(password,salt)

        let Dr = await Doctor.create(doctorData);  // Save to database
        res.status(201).send(Dr);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find().select('-password'); // omit password
      let doctorList = doctors.map(doctor => (
        {
            ...doctor.toObject(),
            profileImage:process.env.DOCTOR_URL+doctor.profileImage,
        }
      ))
      res.status(200).send(doctorList);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Server Error' });
    }
  };

async function getDrById(req, res){
    try {
        let { id } = req.params
        console.log(id)
        let doctor = await Doctor.findOne({_id: id})  //_id is the database id of the user
        if(doctor){
            res.send(doctor)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

// async function updateDr(req, res){
//     try{
//         let doctor = req.body
//         let { id } = req.params
//         console.log(doctor)
//         doctor = await Doctor.findOneAndUpdate({_id: id}, doctor, {new: true})
//         if(doctor){
//             res.status(200).send(doctor)
//         } else {
//             res.status(404).send({"message": "Invalid id"})
//         }
//     } catch (error) {
//         res.status(400).send({"message": error.message})
//     }
// }
  
const acceptDoctor = async (req, res) => {
    try {
      let doc = await Doctor.findByIdAndUpdate(req.params.id, { approved : 'approved' });
      res.send({ message: 'Doctor accepted' , doc});
    } catch (err) {
      res.status(500).send({ message: 'Server error' });
    }
  };

const declineDoctor = async (req, res) => {
    try {
        console.log(req.params.id)
      await Doctor.findByIdAndDelete(req.params.id);
      res.send({ message: 'Doctor declined and removed' });
    } catch (err) {
      res.status(500).send({ message: 'Server error' });
    }
  };
  
async function deleteDoctor(req, res){
    try{
        let { id } = req.params
        let doctor = await Doctor.findOneAndDelete({_id: id})
        if(doctor){
            res.status(200).send(doctor)
        } else {
            res.status(404).send({"message": "Invalid id"})
        }
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

async function adminlogin(req, res) {
    try{ 
        let { email, password } = req.body
        let admin = await Admin.findOne({email})
        if(admin){
            console.log(admin);
            
            // const isMatch = await bcrypt.compare(password, admin.password);
            if (admin.password=== password) {
                let token = jwt.sign({id: admin._id, email: admin.email}, process.env.JWT_SECRET)
                res.status(200).send({token: token, name: admin.name})
            } else {
                res.status(400).send({message: "Invalid Credentails"})
            }
        } else {
            res.status(400).send({message: "Invalid Credentails"})
        }

    } catch(error) {
        res.status(500).send({message: "Server Error"})
    }
}

  module.exports = {
    addDoctor,
    deleteDoctor,
    getAllDoctors,
    getDrById,
    acceptDoctor,
    declineDoctor,
    adminlogin
  };