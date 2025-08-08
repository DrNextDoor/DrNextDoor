const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Doctor = require('../models/Doctor');


// Register a new doctor( This is an extra code, doctor registraion will be handled by admin only)
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, experience, bioMessage } = req.body;
    const profileImage = req.file?.filename;
    
    if (!name || !email || !password || !specialization || !experience || !bioMessage || !profileImage || !location) {
      return res.status(400).send({ message: "All fields including profile image are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({ message: "Please enter a valid email address" });
    }

    if (password.length < 8) {
      return res.status(400).send({ message: "Password must be at least 8 characters long" });
    }

    let doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(400).send({ message: 'Doctor already exists' });
    }

    doctor = new Doctor({
      name,
      email,
      password,
      specialization,
      experience,
      bioMessage,
      profileImage,
      location
    });
     //Hash the password
    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(password, salt);

    await doctor.save();

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({ token ,doctor});
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Server Error' });
  }
};

// Login doctor
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).send({ message: "Please enter all required fields" });
    }

    let doctor = await Doctor.findOne({ email });
    console.log(doctor.approved);
    
    if(doctor.approved!=='approved')
      {
        return res.status(400).send({ message: "you are not approved by admin" })
      }
    if (!doctor) {
      return res.status(400).send({ message: "Doctor does not exist" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({ token, doctor});
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Server Error' });
  }
};




module.exports = { registerDoctor, loginDoctor };
