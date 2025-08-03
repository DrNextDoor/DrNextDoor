import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { useAuth } from '../context/AuthPatient';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    patient, token, logout,
    doctor, doctorToken, logoutDoctor,
    admin, adminToken, logoutAdmin
  } = useAuth();

  const handleLogout = () => {
    if(token)
      logout();
    if(adminToken)
      logoutAdmin();
    if(doctorToken)
      logoutDoctor();
    navigate('/');
  };

  let authLinks;
  
  if (token) {
    // Patient is logged in
    
    authLinks = (
      <>
        <li className="nav-item">
          <Link className="nav-link fs-5" to="/appointments">Book Appointment</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link fs-5" to="/query">Ask a Question</Link>
        </li>
      </>
    );
  } else if (doctorToken) {
    // Doctor is logged in
    authLinks = (
      <>
        <li className="nav-item">
          <Link className="nav-link fs-5" to="/appointments">Appointments</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link fs-5" to="/query">Ask a Question</Link>
        </li>
      </>
    );
  }
  else if (adminToken) {
    // Admin is logged in
    authLinks = (
      <>
        <li className="nav-item">
          <Link className="nav-link fs-5" to="/admin/allDoctors">All Doctors</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link fs-5" to="/query">Ask a Question</Link>
        </li>
      </>
    ); 
  }
  else {
    // No one is logged in 
    authLinks = (
      <>
        <li className="nav-item">
          <Link className="nav-link fs-5" to="/login">Log In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-5" to="/doctorLogin">Doctor Log In</Link>
        </li>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          .custom-input::placeholder {
            color: black;
            opacity: 1;
          }
          .cursor-pointer {
            cursor: pointer;
          }
          .dropdown-menu-custom p:hover {
            background-color: #333;
            cursor: pointer;
            border-radius: 4px;
            padding: 5px;
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg bg-dark text-light" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/">DrNextDoor</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-3">
              {authLinks}
              <li className="nav-item mx-3">
                <Link className="nav-link fs-5" to="/about">About-Us</Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link fs-5" to="/contact">Contact-Us</Link>
              </li>
              {!token && !doctorToken && !adminToken &&(
              <li className="nav-item mx-3">
                <Link className="nav-link fs-5" to="/admin/login">Admin Panel</Link>
              </li>
              )}
              
            </ul>

            <form className="form-inline d-flex align-items-center p-2">
              <input
                className="form-control mr-2 custom-input"
                type="search"
                placeholder="Enter Location"
                style={{
                  width: '300px',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              />
              <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>

            <div className="ms-auto d-flex align-items-center gap-4 mx-3">
              {token || doctorToken || adminToken? (
                <div className="position-relative">
                  <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                    <FaUserCircle className="text-white" size={30} />
                    <FaChevronDown className="text-white" size={14} />
                  </div>
              
                  {showDropdown && token && (
                    <div className="position-absolute bg-dark text-light p-2 mt-2 rounded shadow dropdown-menu-custom" style={{ right: 0 }}>
                      <p className="mb-1"><Link to='/patientProfile' style={{ color: 'white', textDecoration: 'none' }}>My Profile</Link></p>
                      <p className="mb-1"><Link to='/patientAppointments' style={{ color: 'white', textDecoration: 'none' }}>My Appointments</Link></p>
                      <p className="mb-1"><Link to='/updateProfile' style={{ color: 'white', textDecoration: 'none' }}>Edit Profile</Link></p>
                      <p className="mb-0" onClick={handleLogout}>Logout</p>
                    </div>
                  )}
                  {showDropdown && doctorToken && (
                    <div className="position-absolute bg-dark text-light p-2 mt-2 rounded shadow dropdown-menu-custom" style={{ right: 0 }}>
                      <p className="mb-1"><Link to='/patientProfile' style={{ color: 'white', textDecoration: 'none' }}>My Profile</Link></p>
                      <p className="mb-1"><Link to='/patientAppointments' style={{ color: 'white', textDecoration: 'none' }}>My Appointments</Link></p>
                      <p className="mb-1"><Link to='/updateProfile' style={{ color: 'white', textDecoration: 'none' }}>Edit Profile</Link></p>
                      <p className="mb-0" onClick={handleLogout}>Logout</p>
                    </div>
                  )}
                  {showDropdown && adminToken && (
                    <div className="position-absolute bg-dark text-light p-2 mt-2 rounded shadow dropdown-menu-custom" style={{ right: 0 }}>
                      <p className="mb-0" onClick={handleLogout}>Logout</p>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-secondary px-4 py-2 rounded-pill"
                >
                  Create Account
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
