import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../utils/utils.js';
import { useAuth } from '../../context/AuthPatient.jsx';
import loginBack from './../../assets/login-back.jpg'

const PatientAppointments = () => {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState(null);

  const getAppointments = async () => {
    try {
      const response = await axios.get(`${API}/patient/myAppointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(response.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch appointments');
    }
  };

  const deleteAppointment = async (id) => {
  try {
    await axios.delete(`${API}/patient/delAppointment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAppointments(prev => prev.filter(appt => appt._id !== id));
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to cancel appointment');
  }
};

  useEffect(() => {
    document.body.style.backgroundImage = `url(${loginBack})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    getAppointments();
  }, [appointments]);

  return (
    <>
      <style>
        {`
          .appointments-container {
            padding: 40px 5px;
          }

          .appt-title {
            font-weight: 600;
            color: #02010dff;
            font-size: 32px;
            margin-bottom: 20px;
            border-bottom: 2px solid #555;
            padding-bottom: 10px;
          }

          .appt-card {
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
            width: 100%;
            animation: fadeIn 0.5s ease-in-out;
            display: flex;
            align-items: center;
            gap: 30px;
          }

          .appt-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 45px rgba(0, 0, 0, 0.6);
          }

          .appt-img {
            width: 250px;
            height: 250px;
            object-fit: cover;
            border-radius: 50%;
            border: 3px solid #8d969fff;
            flex-shrink: 0;
          }

          .appt-info {
            flex-grow: 1;
          }

          .appt-info p {
            margin: 4px 0;
            font-size: 20px;
            color: #ddd;
          }

          .appt-info p strong {
            color: #fff;
          }

          .no-appt {
            background: rgba(0, 0, 0, 0.6);
            color: #ccc;
            padding: 20px;
            border-radius: 12px;
            font-size: 25px;
          }

          .del-appt{
            padding-top:2px;
            margin-top: 5px;
          }

        `}
      </style>

      <div className="appointments-container">
        <h2 className="appt-title">My Appointments</h2>

        {!appointments || appointments.length === 0 ? (
          <div className="no-appt">You haven't booked any appointments yet...!! <Link to="/appointments" style={{color:"white",textDecoration:"none"}}>Book now</Link></div>
        ) : (
          <div className="row g-4">
            {appointments.map((appt) => (
              <div className="col-md-6" key={appt._id}>
                <div className="appt-card">
                  <img
                    src={`${API}/uploads/doctors/${appt.doctorId.profileImage}`}
                    alt="Doctor"
                    className="appt-img"
                  />
                  <div className="appt-info">
                    <h3>{appt.doctorId.name}</h3>
                    <p><strong>Specialization:</strong> {appt.doctorId.specialization}</p>
                    <p><strong>Date:</strong> {appt.date}</p>
                    <p><strong>Slot:</strong> {appt.slot}</p>
                    <p><strong>Status:</strong> {appt.status}</p>
                    <button
                      className="del-appt btn btn-dark"
                      onClick={() => deleteAppointment(appt._id)}
                    >
                    <p style={{fontSize:"20px"}}>Cancel</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PatientAppointments;
