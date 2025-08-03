// src/pages/DoctorDashboard.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import loginBack from './../../assets/login-back.jpg';
import { useEffect}  from 'react';

const DoctorDashboard = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${loginBack})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment='fixed',
    document.body.style.overflow='hidden'
  }, []);
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <h1 style={{display:'flex',alignContent:'center',justifyContent:'center'}}>Welcome, Doctor👨‍⚕️</h1>
        <p style={{display:'flex',alignContent:'center',justifyContent:'center',fontSize: '16px',lineHeight: '1.6',color: '#555',fontFamily: 'Segoe UI, sans-serif',marginTop: '10px'}}>
        Your dashboard is your control center.<br />
        Here you can manage appointments, view patient details,<br />
        and keep your profile up-to-date with ease.
       </p>
      </div>
    </div>
  );
};

export default DoctorDashboard;

