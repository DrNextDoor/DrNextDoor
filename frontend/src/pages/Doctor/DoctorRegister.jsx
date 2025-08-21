import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginBack from './../../assets/login-back.jpg';
import { FaUserMd } from 'react-icons/fa';
import {API,stateDistrictData} from '../../utils/utils'

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    experience: '',
    bioMessage: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
    const [state,setState]=useState("")
    const [dist,setDist]=useState("")
    const [dists,setDists]=useState([])

    const handleStateChange=(e)=>{
        const selectedState=e.target.value
        setState(selectedState)
        setDists(stateDistrictData[selectedState] || [])
        setDist("")
    }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append('profileImage', profileImage);
      data.append("address[State]", state);
      data.append("address[District]", dist);

      const res = await axios.post(`${API}/api/doctors/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Registration successful!');
      setTimeout(() => navigate('/DoctorLogin'), 1500);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Registration failed.');
    }

    setLoading(false);
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${loginBack})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      minHeight: '90vh',
      padding: '50px'
    }}>
      <div className="doctor-register-card">
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <FaUserMd size={40} style={{ color: 'white' }} />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Doctor Registration</h2>
        {message && <p className="message-text">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input className="form-control" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="form-control" name="email" placeholder="Email" type="email" onChange={handleChange} required />
          <select value={state} onChange={handleStateChange}>
            <option value="">Select State</option>
            {Object.keys(stateDistrictData).map((selectState) => (
            <option key={selectState} value={selectState}>{selectState}</option>
            ))}
          </select>                   
          <select value={dist} onChange={(e)=>setDist(e.target.value)}>
            <option value="">Select District</option>
            {dists.map((district) => (
            <option key={district} value={district}>{district}</option>
            ))}
          </select> 
          <input className="form-control" name="password" placeholder="Password" type="password" onChange={handleChange} required />
          <input className="form-control" name="specialization" placeholder="Specialization" onChange={handleChange} required />
          <input className="form-control" name="experience" placeholder="Experience" type="number" onChange={handleChange} required />
          <textarea className="form-control" name="bioMessage" placeholder="Bio" onChange={handleChange} required />
          <input className="form-control" type="file" onChange={handleFileChange} required />
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      <style>{`
        .doctor-register-card {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
          max-width: 500px;
          width: 90%;
          animation: fadeIn 0.5s ease-in-out;
        }

        .form-control {
          background-color: #121212;
          border: 1px solid #333;
          color: white;
          height: 45px;
          font-size: 16px;
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 8px;
          width: 100%;
        }

        .form-control::placeholder {
          color: #bbb;
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          background-color: white;
          color: black;
          font-weight: bold;
          border: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .login-btn:hover {
          background-color: #e6e6e6;
        }

        .message-text {
          color: #00ff99;
          text-align: center;
          margin-bottom: 15px;
          font-weight: bold;
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
      `}</style>
    </div>
  );
};

export default DoctorRegister;


