import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API,stateDistrictData } from "../../utils/utils";
import { useAuth } from "../../context/AuthPatient";
import { useNavigate, useParams } from "react-router-dom";
import loginBack from './../../assets/login-back.jpg'
import { FaHospitalUser } from "react-icons/fa";


const UpdateProfile = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const genderRef = useRef();
  const dobRef = useRef();
  const phoneRef = useRef();
  const [state,setState]=useState("")
  const [dist,setDist]=useState("")
  const [dists,setDists]=useState([])

   const handleStateChange=(e)=>{
    const selectedState=e.target.value
    setState(selectedState)
    setDists(stateDistrictData[selectedState] || [])
    setDist("")
  }

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`${API}/patient/getById`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setPatient(data);

      if(nameRef.current) nameRef.current.value = data.name || "";
      if(emailRef.current) emailRef.current.value = data.email || ""
      if(genderRef.current) genderRef.current.value = data.gender || "";
      if(dobRef.current) dobRef.current.value = data.dob || "";
      if(phoneRef.current) phoneRef.current.value = data.phone  || "";
      setState(data.address?.State);
      setDists(stateDistrictData[data.address?.State] || [])
      setDist(data.address?.District);      
      
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    fetchPatientData();
    document.body.style.backgroundImage = `url(${loginBack})`
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundPosition = 'center'
    
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setMessage("")

    const formData = new FormData();
  formData.append("name", nameRef.current.value);
  formData.append("email", emailRef.current.value);
  formData.append("gender", genderRef.current.value);
  formData.append("dob", dobRef.current.value);
  formData.append("phone", phoneRef.current.value);
  formData.append("address[State]", state);
  formData.append("address[District]", dist);
  const fileInput = document.getElementById("profileImage");
  if (fileInput.files[0]) {
    formData.append("image", fileInput.files[0]);
  }

    try {
      
      await axios.put(`${API}/patient/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/patientProfile")
      setLoading(false)

    } 
    catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (!patient) return <p>Loading...</p>;

  return (
    <>
    <style>
                {`
                  .myImg{
                    object-fit: cover;
                    border-radius: 50%;
                  }
                    
                    .patient-login-card {
                        background: rgba(0, 0, 0, 0.6);
                        color: white;
                        padding: 10px 40px;
                        border-radius: 20px;
                        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
                        max-width: 520px;
                        width: 100%;
                        height: 570px;
                        animation: fadeIn 0.5s ease-in-out;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-top:-90px
                    }

                    .form-control {
                        border: 1px solid #333;
                        color: white;
                        height: 45px;
                        font-size: 16px;
                        background-color:transparent;
                        border: 0px;
                    }

                    .form-control::placeholder {
                        color: #bbb;
                    }

                    .update-btn {
                        width: 100%;
                        background-color: white;
                        color: black;
                        font-weight: bold;
                        border: none;
                        border-radius: 10px;
                        transition: all 0.3s ease;
                        font-size:20px;
                        border-radius: 5px;
                    }

                    .update-btn:hover {
                        color: #e6e6e6;
                        background-color:grey
                    }

                    .message-text {
                        color: #ff4d4d;
                        text-align: center;
                        margin-top: 10px;
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
                `}
            </style>
      <div className="container-fluid row"> 
                      <div className="row align-items-center">
                        <div style={{width:"50%"}} className="col-md-6">
                            {patient.image && <img src={`${patient.image}`} alt="Profile" style={{width:"80%"}} className="myImg rounded-full mt-2" />}
                        </div>
                        <div className="col-md-5 d-flex justify-content-center align-items-center" >
                              <div className="patient-login-card mt-5">
                                  <div>
                                      <div className="text-center mb-4">
                                          <FaHospitalUser size={40} style={{ color: 'white' }} />
                                          <h2 className="mt-2">Edit your profile</h2>
                                      </div>
      
                                      {message && <p className="message-text">{message}</p>}
                                      <form onSubmit={handleSubmit} className="form-control">

                                      <div className="mb-3">
                                        <label>Name: </label>
                                        <input ref={nameRef} />
                                      </div>

                                      <div className="mb-3">
                                        <label>Email: </label>
                                        <input ref={emailRef} />
                                      </div>
 
                                        <div className="mb-3">
                                        <label>Gender: </label>
                                        <select ref={genderRef}>
                                          <option value="">Select</option>
                                          <option value="male">Male</option>
                                          <option value="female">Female</option>
                                        </select>
                                        </div>


                                        <div className="mb-3">
                                        <label>DOB: </label>
                                        <input type="date" ref={dobRef} />
                                        </div>

                                        <div className="mb-3">
                                        <label>Profile: </label>
                                        <input type="file" id="profileImage"/>
                                        </div>

                                        <div className="mb-3">
                                        <label>Phone: </label>
                                        <input ref={phoneRef} type="number"/>
                                        </div>

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

                                        <div className="mb-3">
                                        <button type="submit" className="update-btn">Update</button>
                                        </div>

                                      </form>
                                      
                                  </div>
                                  <div className="text-center" style={{ fontSize: "12px", color: "#aaa" }}>
                                      © 2025 DrNextDoor • All rights reserved
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
    </>
    
  );
};

export default UpdateProfile;
