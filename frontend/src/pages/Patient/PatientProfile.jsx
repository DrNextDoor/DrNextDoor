import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../utils/utils'
import { useAuth } from '../../context/AuthPatient'
import loginBack from './../../assets/login-back.jpg'
import { Link, useNavigate } from 'react-router-dom'

const PatientProfile = () => {
  const [patient, setPatient] = useState(null)
  const {token} =useAuth() 
  const navigate=useNavigate();

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
          .appt-title {
            font-weight: 600;
            color: #02010dff;
            font-size: 32px;
            margin-bottom: 20px;
            border-bottom: 2px solid #555;
            padding-bottom: 10px;
          }
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
          .patient-profile p {
            margin: 4px 0;
            font-size: 20px;
            color: #ddd;
          }
          .myImg{
            object-fit: cover;
            border-radius: 50%;
          }
          .edit{
            padding:10px;
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
    <h2 className="appt-title">My Profile</h2>
    <div className="p-4" style={{display:"flex",flexDirection:"row"}}>
      <div style={{width:"50%"}}>
        {patient.image && <img src={`${patient.image}`} alt="Profile" style={{width:"80%"}} className="myImg rounded-full mt-2" />}
      </div>
      <div className='patient-profile text-light rounded-5 p-4' style={{width:"50%"}}>
        <p><strong>Hello {patient.name}!!</strong></p>
        <p><strong>Email: </strong> {patient.email}</p>
        <p><strong>Gender: </strong>{patient.gender}</p>
        <p><strong>Date of birth: </strong>{patient.dob}</p>
        <p><strong>Address: </strong>{patient.address.District},{patient.address.State}</p>
        <p><strong>Phone no: </strong>{patient.phone}</p>
        <button className="edit btn btn-dark" onClick={()=>navigate('/updateProfile')}>
            Edit your profile
        </button>
      </div>
    </div>
    </div>
  )
}

export default PatientProfile
