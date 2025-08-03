import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../../utils/utils.js';

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
      console.log(id);
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
    getDoctorDetails();
  }, [id]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!doctor) return <p>No doctor data found</p>;

  return (
    <div className='row g-3'>
      <h2>Doctor Details</h2>
      <div className='col-md-4'>
        <img
          src={`${API}/uploads/doctors/${doctor.profileImage}`}
          className='img-fluid rounded'
          alt={doctor.name}
          style={{ height: '95%', width: '80%', objectFit: 'cover' }}
        />
      </div>

      <div className='col-md-8' style={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
        <h3>Doctor Information</h3>
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Degree:</strong> {doctor.degree}</p>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Experience:</strong> {doctor.experience}</p>
        <p><strong>Bio:</strong> {doctor.bioMessage}</p>
        <p><strong>Slots:</strong></p>
        {doctor.slots && typeof doctor.slots === 'object' ? (
  <div className='d-flex flex-wrap gap-2'>
    
    {Object.entries(doctor.slots).map(([key, value], index) => (
      <button
        key={index}
        className={`btn ${selectedSlot === `${key}: ${value}` ? 'btn-success' : 'btn-outline-primary'}`}
        onClick={() => setSelectedSlot(`${key}: ${value}`)}
      >
        {key}: {value}
      </button>
      ))}
    </div>
    ) : (
      <p>No available slots.</p>
    )}
        <div className="mt-4">
          <button className='btn btn-primary' onClick={handleBookAppointment} disabled={!selectedSlot}>
            Book Appointment
          </button>
          {successMessage && <p className="text-success mt-3">{successMessage}</p>}

        </div>
      </div>
    </div>
  );
};

export default BookAppointments

