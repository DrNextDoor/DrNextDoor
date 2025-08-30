
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../../utils/utils.js';

const DrDetailsAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDoctorDetails = async () => {

    console.log(id);
    setLoading(true);
    try {
      console.log(id);
      const res = await axios.get(`${API}/admin/doctors/${id}`);
      setDoctor(res.data);
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
      //navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, [id]);

  const handleAccept = async (id) => {
    try {
      console.log(id);
      await axios.put(`${API}/admin/accept/${id}`, { approved: 'approved' });
      alert(`Doctor accepted`);
      getDoctorDetails(); // Refresh the data
    } catch (err) {
      console.error(err);
      alert("Failed to accept doctor");
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.delete(`${API}/admin/decline/${id}`);
      alert(`Doctor Removed`);
      navigate("/admin/allDoctors"); // Navigate away after deleting
    } catch (err) {
      console.error(err);
      alert("Failed to decline doctor");
    }
  };

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
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Experience:</strong> {doctor.experience}</p>
        <p><strong>Bio:</strong> {doctor.bioMessage}</p>
        <p><strong>Address: </strong>{doctor.address.District}, {doctor.address.State}</p>

        {doctor.approved !== 'approved' ? (
        <>
          <button className='btn btn-success me-2' onClick={() => handleAccept(doctor._id)}>Accept</button>
          <button className='btn btn-danger' onClick={() => handleDecline(doctor._id)}>Decline</button>
        </>
        ) : (
        <>
          {/* <button className='btn btn-primary me-2' onClick={() => navigate(`/admin/update/${doctor._id}`)}>Update</button> */}
          <button className='btn btn-danger' onClick={() => handleDecline(doctor._id)}>Delete</button>
        </>
       )}
      </div>
    </div>
  );
};

export default DrDetailsAdmin;

