import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../../utils/utils.js';
import loginBack from './../../assets/login-back.jpg'

const BookAppointments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      alert('Please select a slot first');
      return;
    }
    
    const [slotType, slotTime] = selectedSlot.split(':');

    const appointmentData = {
      doctorId: id,
      date: new Date().toISOString().split('T')[0], // today's date
      slot: slotType+slotTime
    };

    try {
      const token = localStorage.getItem('patientToken'); 

      const response = await axios.post(`${API}/patient/bookAppointment`, appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage('Appointment booked successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to book appointment');
    }
  };

  const getDoctorDetails = async () => {

    setLoading(true);
    try {
      const res = await axios.get(`${API}/patient/getDrById/${id}`);
      setDoctor(res.data);
      
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${loginBack})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    getDoctorDetails();
  }, [id]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!doctor) return <p>No doctor data found</p>;

  return (
    <>
    <style>
      {`
          .title {
            font-weight: 600;
            color: #02010dff;
            font-size: 32px;
            margin-bottom: 20px;
            border-bottom: 2px solid #555;
            padding-bottom: 10px;
          }

          .doc-img{
            border-radius:50%;
            object-fit: cover;
            height:350px;
            width:350px;
            flex-shrink: 0;
            border: 1px solid black;
            justify-content:center;
          }

          .detail{
            background:rgba(56, 52, 52, 0.6);
            font-size:20px;
          }

          .doc-info{
            color:white
          }
      `}
    </style>
    <h2 className='title'>Doctor Details</h2>
    <div className='detail row g-3'>
      <div className='col-md-4 p-4'>
        <img
          src={`${API}/uploads/doctors/${doctor.profileImage}`}
          className='doc-img'
          alt={doctor.name}
        />
      </div>

      <div className='doc-info col-md-8' style={{ marginTop: '20px', padding: '10px' }}>
        <h3>Doctor Information</h3>
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Degree:</strong> {doctor.degree}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Experience:</strong> {doctor.experience}</p>
        <p><strong>Bio:</strong> {doctor.bioMessage}</p>
        <p><strong>Slots:</strong></p>
        {doctor.slots && typeof doctor.slots === 'object' ? (
  <div className='d-flex flex-wrap gap-2'>
    
    {Object.entries(doctor.slots).map(([key, value], index) => (
      <button
        key={index}
        className={`btn ${selectedSlot === `${key}: ${value}` ? 'btn-light' : 'btn-outline-dark'}`}
        onClick={() => setSelectedSlot(`${key}: ${value}`)}
      >
       <span> {key}: {value}</span>
      </button>
      ))}
    </div>
    ) : (
      <p>No available slots.</p>
    )}
        <div className="mt-4">
          <button className='btn btn-dark' onClick={handleBookAppointment} disabled={!selectedSlot}>
            Book Appointment
          </button>
          {successMessage && <p className="text-light mt-3">{successMessage}</p>}

        </div>
      </div>
    </div>
    </>
  );
};

export default BookAppointments

