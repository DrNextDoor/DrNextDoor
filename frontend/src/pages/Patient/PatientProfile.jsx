import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../utils/utils'
import { useAuth } from '../../context/AuthPatient'
import loginBack from './../../assets/login-back.jpg'
import { Link } from 'react-router-dom'

const PatientProfile = () => {
  const [patient, setPatient] = useState(null)
  const {token} =useAuth() 


  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`${API}/patient/getById`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      setPatient(response.data)
      
    } 
    catch (error) {
      console.error('Error fetching patient data:', error)
    }
  }
  useEffect(() => {
    fetchPatientData(),
            document.body.style.backgroundImage = `url(${loginBack})`
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundRepeat = 'no-repeat'
            document.body.style.backgroundPosition = 'center'
  }, [])

  if (!patient) return <div>Loading profile...</div>

  return (
    <div>
      <style>
        {`
          .patient-profile {
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 60px 40px;
            border-radius: 20px;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
            max-width: 520px;
            width: 100%;
            height: 450px;
            animation: fadeIn 0.5s ease-in-out;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
            @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    <div className="p-4" style={{display:"flex",flexDirection:"row"}}>
      <div style={{width:"50%"}}>
        {patient.image && <img src={`${patient.image}`} alt="Profile" style={{width:"90%"}} className="w-32 h-32 rounded-full mt-2" />}
      </div>
      <div className='patient-profile text-light rounded-5 p-4' style={{width:"50%"}}>
        <p><strong>{patient.name}</strong></p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Address:</strong>{patient.address.line1},{patient.address.line2}</p>
        <p><strong>Gender:</strong>{patient.gender}</p>
        <p><strong>Date of birth:</strong>{patient.dob}</p>
        <p><strong>Phone no:</strong>{patient.phone}</p>
        <p><strong>Appointments:</strong>{patient.appointments?patient.appointments:"No appointments made"}</p>
      </div>
    </div>
    <button><Link to='/updateProfile'>Edit your profile</Link></button>
    </div>
  )
}

export default PatientProfile
