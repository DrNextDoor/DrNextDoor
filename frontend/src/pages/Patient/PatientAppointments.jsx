import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../../utils/utils.js';
import { useAuth } from '../../context/AuthPatient.jsx';

const PatientAppointments = () => {
  const {token}=useAuth()
  const { id } = useParams();
  const [appointments, setAppointments] = useState(null);

  const getAppointments = async () => {
    try {
      const response = await axios.get(`${API}/patient/myAppointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      setAppointments(response.data)

    } catch (err) {
      alert(err.response?.data?.message || 'Failed to book appointment');
    }
  };

  useEffect(() => {
    getAppointments();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Appointments</h2>
      {!appointments ? (
        <div className="alert alert-info">You haven't booked any appointments yet.</div>
      ) : (
        <div className="row">
          {appointments.map((appt) => (
            <div className="col-md-6 mb-4" key={appt._id}>
              <div className="card shadow-sm">
                <div className="card-body d-flex">
                  <img
                    src={`${API}/uploads/doctors/${appt.doctorId.profileImage}`}
                    alt="Doctor"
                    className="rounded-circle me-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 className="card-title">{appt.doctorId.name}</h5>
                    <p className="mb-1"><strong>Specialization:</strong> {appt.doctorId.specialization}</p>
                    <p className="mb-1"><strong>Date:</strong> {appt.date}</p>
                    <p className="mb-1"><strong>Slot:</strong> {appt.slot}</p>
                    <p className="mb-0"><strong>Status:</strong> {appt.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PatientAppointments

