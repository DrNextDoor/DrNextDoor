const mongoose=require('mongoose')

const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    address:{
        type:Object,
        default:{State:'',District:''}
    },
    gender:{
        type:String,
        default:"Not selected"
    },
    dob:{
        type:String,
        default:"Not selected"
    },
    phone:{
        type:String,
        default:"0000000000"
    },
    appointmemts:{
        type:Object,
        default:{}
    }
})

const patientModel=mongoose.model('Patients',patientSchema)
module.exports=patientModel