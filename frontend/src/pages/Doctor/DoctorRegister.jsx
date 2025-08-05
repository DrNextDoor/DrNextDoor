// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUserMd } from 'react-icons/fa';
// import loginBack from './../assets/login-back.jpg';
// import axios from 'axios';

// const DoctorRegister = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     specialization: '',
//     experience: '',
//     bioMessage: '',
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setProfileImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);
  
//     if (!profileImage) {
//       setMessage('Please upload a profile image');
//       setLoading(false);
//       return;
//     }
  
    
  
//     try {
//       const data = new FormData();
//     data.append('name', formData.name);
//     data.append('email', formData.email);
//     data.append('password', formData.password);
//     data.append('specialization', formData.specialization);
//     data.append('experience', formData.experience);
//     data.append('bioMessage', formData.bioMessage);
//     data.append('profileImage', profileImage); // ✅ 
//     console.log(data);
    
//     let response=await axios.post('http://localhost:5000/api/doctors/register',data)
  
//     if (response.status === 200 || response.status === 201) {
//       setMessage('Submitted successfully! Awaiting admin approval.');
//         setTimeout(() => {
//           navigate('/DoctorLogin');
//         }, 1000);
//       } else {
//         setMessage(data.message || 'Something went wrong');
//       }
  
//     } catch (error) {
//       console.error('Registration failed:', error);
//       setMessage('Registration failed. Try again.');
//     }
  
//     setLoading(false);
//   };
  

//   useEffect(() => {
//     document.body.style.backgroundImage = `url(${loginBack})`;
//     document.body.style.backgroundSize = 'cover';
//     document.body.style.backgroundRepeat = 'no-repeat';
//     document.body.style.backgroundPosition = 'center';
//   }, []);

//   return (
//     <>
//       <style>
//         {`
//           .doctor-register-card {
//             background: rgba(0, 0, 0, 0.6);
//             color: white;
//             padding: 50px 40px;
//             border-radius: 20px;
//             box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
//             max-width: 600px;
//             width: 100%;
//             height: 760px;
//             animation: fadeIn 0.5s ease-in-out;
//           }

//           .form-control {
//             background-color: #121212;
//             border: 1px solid #333;
//             color: white;
//             height: 45px;
//             font-size: 16px;
//             margin-bottom: 15px;
//             padding: 10px;
//             border-radius: 8px;
//           }

//           .form-control::placeholder {
//             color: #bbb;
//           }

//           .login-btn {
//             width: 100%;
//             padding: 12px;
//             background-color: white;
//             color: black;
//             font-weight: bold;
//             border: none;
//             border-radius: 10px;
//             transition: all 0.3s ease;
//           }

//           .login-btn:hover {
//             background-color: #e6e6e6;
//           }

//           .message-text {
//             color: #00ff99;
//             text-align: center;
//             margin-top: 10px;
//             font-weight: bold;
//           }

//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}
//       </style>

//       <div className="container-fluid">
//         <div className="row align-items-center" style={{ height: "100vh" }}>
//           <div className="col-md-7"></div>
//           <div className="col-md-5 d-flex justify-content-center align-items-center">
//             <div className="doctor-register-card">
//               <div className="text-center mb-4">
//                 <FaUserMd size={40} style={{ color: 'white' }} />
//                 <h2 className="mt-2">Doctor Registration</h2>
//                 <p style={{ fontSize: "14px", color: "#bbb" }}>
//                   Fill the form to apply as a doctor. Admin will review and approve your account.
//                 </p>
//               </div>

//               {message && <p className="message-text">{message}</p>}

//               <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="name"
//                   placeholder="Name"
//                   onChange={handleChange}
//                   value={formData.name}
//                   required
//                 />
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   placeholder="Email"
//                   onChange={handleChange}
//                   value={formData.email}
//                   required
//                 />
//                 <input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   placeholder="Password"
//                   onChange={handleChange}
//                   value={formData.password}
//                   required
//                 />
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="specialization"
//                   placeholder="Specialization"
//                   onChange={handleChange}
//                   value={formData.specialization}
//                   required
//                 />
//                 <input
//                   type="number"
//                   className="form-control"
//                   name="experience"
//                   placeholder="Experience (Years)"
//                   onChange={handleChange}
//                   value={formData.experience}
//                   required
//                 />
//                 <textarea
//                   name="bioMessage"
//                   className="form-control"
//                   placeholder="Short Bio"
//                   onChange={handleChange}
//                   value={formData.bioMessage}
//                   required
//                   style={{ height: '80px' }}
//                 ></textarea>
//                 <input
//                   type="file"
//                   className="form-control"
//                   onChange={handleFileChange}
//                   required
//                 />
//                 <button type="submit" className="login-btn mt-3" disabled={loading}>
//                   {loading ? 'Submitting...' : 'Submit for Approval'}
//                 </button>
//               </form>

//               <div className="text-center" style={{ fontSize: "12px", color: "#aaa", marginTop: "10px" }}>
//                 © 2025 DrNextDoor • All rights reserved
//               </div>
//             </div>
//           </div> 
//         </div>
//       </div>
//     </>
//   );
// };

// export default DoctorRegister;


// DoctorRegister.jsx
/*import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginBack from './../assets/login-back.jpg';

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

      const res = await axios.post('http://localhost:5000/api/doctors/register', data, {
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
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Doctor Registration</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required /><br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required /><br />
        <input name="specialization" placeholder="Specialization" onChange={handleChange} required /><br />
        <input name="experience" placeholder="Experience" type="number" onChange={handleChange} required /><br />
        <textarea name="bioMessage" placeholder="Bio" onChange={handleChange} required /><br />
        <input type="file" onChange={handleFileChange} required /><br />
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default DoctorRegister;*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginBack from './../../assets/login-back.jpg';
import { FaUserMd } from 'react-icons/fa';

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

      const res = await axios.post('https://dr-next-door.vercel.app/api/doctors/register', data, {
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


