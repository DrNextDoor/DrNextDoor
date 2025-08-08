const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  profileImage: { type: String, required: true }, // Now required
  experience: { type: String, required: true },
  bioMessage: { type: String, required: true },
  approved:{type:String,default:"not approved"},
  appointments:{type:Object,default:{}},
  slots:{type:Object,default:{"morning":"6-9","evening":"5-6"}},
  location: {type: Object, required: true}, // Added location field
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;



