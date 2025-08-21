const validator=require('validator')
const patientModel=require('./../models/Patient.model.js')
const Doctor=require('./../models/Doctor.js')
const Appointment=require('../models/Appointment.model.js')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


//Patient registration
const patientRegister=async(req,res)=>{
    try{
        
        const {name,email,password,address}=req.body
        if(!name || !password || !email){
            return res.status(400).send({message:"Please enter all details"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).send({message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.status(400).send({message:"Please enter a strong password"})
        }
        const existingPatient = await patientModel.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        const image = req.file?.filename || "default_patient.png";
        const addr=JSON.parse(address)

        const patientData={
            name,
            email,
            password,
            image,
            address:addr
        }

        const salt=await bcrypt.genSalt(10)
        patientData.password=await bcrypt.hash(password,salt)
        
        let patient=await patientModel.create(patientData)
        const token=jwt.sign({id:patient._id},process.env.JWT_SECRET)
        res.status(200).send({token})
    }
    catch(err){
        res.status(400).send({"message":err.message})
    }
}

//Patient login
const patientLogin=async(req,res)=>{
    try{ 
        let { email, password } = req.body
        let patient = await patientModel.findOne({email})
        if(patient){
            const isMatch=await bcrypt.compare(password,patient.password)
            
            if(isMatch){
                let token = jwt.sign({id: patient._id, email: patient.email}, process.env.JWT_SECRET)
                res.status(200).send({token: token, patient: patient})
            } else {
                res.status(400).send({message: "Invalid Credentails"})
            }
        } else {
            res.status(400).send({message: "Patient does not exist"})
        }
    
    } catch(error) {
        res.status(500).send({message: "Server Error"})
    }
}

//getting patient data
const getPatientData=async(req,res)=>{
    try{
        const patientId=req.patientId    
           
        const patientData=await patientModel.findOne({_id:patientId})
        let modPatient={
            ...patientData.toObject(),
            image:process.env.PATIENT_URL+patientData.image
        }
        if(modPatient){
            res.status(200).send(modPatient)
            
        }
        else{
            res.status(404).send({"message": "Invalid id"})
        }
    }
    catch(error){
        res.status(500).send({message: "Server Error"})
    }
}

const updateProfile = async (req, res) => {
    try {
       const {patientId}=req
       let patient=req.body
       if (req.file?.filename) {
        patient.image = req.file.filename;
    }       
       patient=await patientModel.findOneAndUpdate({_id:patientId},patient)
        
        res.status(200).send({ patient });

    } catch (error) {
        res.status(500).send({ message: "Server Error", error: error.message });
    }
};

//get all approved doctors
const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find({ approved: "approved" }).select('-password'); // filter by approved
      const doctorList = doctors.map(doctor => ({
        ...doctor.toObject(),
        profileImage: process.env.DOCTOR_URL + doctor.profileImage,
      }));
      res.status(200).send(doctorList);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Server Error' });
    }
  };
  

async function getDrById(req, res){
    try {
        let { id } = req.params        
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

async function bookAppointment(req,res){
    try{
        const {doctorId,date,slot}=req.body
        const patientId=req.patientId
        const existing=await Appointment.findOne({doctorId,date,slot})
        if(existing){8
            return res.status(400).send({message:"Doctor is already booked"})
        }

        const newAppointment=await Appointment.create({
            doctorId,
            patientId,
            date,
            slot,
            status:'Scheduled'
        })
        

        res.status(201).send({ message: "Appointment booked successfully.", newAppointment });

    }
    catch(error){
        res.status(500).send({message:"Server error",error:error.message})
    }
}

async function myAppointments(req,res){
    const patientId=req.patientId
    try{
        const appoinments=await Appointment.find({patientId:patientId}).populate('doctorId','-password')     
           
        if(!appoinments){
            return res.status(404).send({message:"No appoinments booked"})
        }
        return res.status(200).send(appoinments)
    }
    catch(error){
        return res.status(500).send({message:"Server error",error:error.message})
    }
}

//delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const patientId = req.patientId;
    const appointment = await Appointment.findOne({ patientId: patientId });
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found or unauthorized" });
    }
    await Appointment.deleteOne({ patientId:patientId });

    res.status(200).send({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

module.exports={patientRegister,
    patientLogin,
    getPatientData,
    updateProfile,
    getAllDoctors,
    getDrById,
    bookAppointment,
    myAppointments,
    deleteAppointment
}