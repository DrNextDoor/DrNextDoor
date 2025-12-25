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
      body {
        min-height: 100vh;
        overflow-x: hidden;
      }

      .page-wrapper {
        min-height: calc(100vh - 70px);
        display: flex;
        align-items: center;
      }

      .myImg {
        object-fit: cover;
        border-radius: 50%;
        width: 75%;
        cursor: pointer;
      }

      .patient-login-card {
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 18px 28px;
        border-radius: 20px;
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
        max-width: 520px;
        width: 100%;
        animation: fadeIn 0.5s ease-in-out;
      }

      .form-row {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }

      .form-row label {
        width: 110px;
        margin-right: 10px;
      }

      .form-row input,
      .form-row select {
        flex: 1;
        height: 32px;
        padding: 4px 8px;
        background: transparent;
        border: 1px solid #555;
        color: white;
      }

      .form-row select option {
        background-color: #555;   /* grey background */
        color: white;
      }

      .update-btn {
        width: 100%;
        background: white;
        color: black;
        font-weight: bold;
        font-size: 20px;
        border-radius: 6px;
        border: none;
        padding: 5px;
      }

      .update-btn:hover {
        background: #ccc;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (max-width: 768px) {
        .page-wrapper {
          padding: 20px 10px;
        }

        .row.w-100 {
          flex-direction: column;
        }

        .myImg {
          width: 160px;
          margin-bottom: 20px;
        }

        .patient-login-card {
          padding: 16px;
          border-radius: 15px;
        }

        .form-row {
          flex-direction: column;
          align-items: flex-start;
        }

        .form-row label {
          width: 100%;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .form-row input,
        .form-row select {
          width: 100%;
          height: 38px;
        }

        .update-btn {
          font-size: 18px;
          padding: 10px;
        }
      }
      @media (min-width: 769px) and (max-width: 992px) {
        .myImg {
          width: 60%;
        }

        .patient-login-card {
          max-width: 480px;
        }
      }
    `}
    </style>

    <div className="container page-wrapper">
      <div className="row w-100 align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            hidden
            onChange={(e) => {
              if (e.target.files[0]) {
                const preview = URL.createObjectURL(e.target.files[0]);
                setPatient({ ...patient, image: preview });
              }
            }}
          />

          <img
            src={patient.image}
            alt="Profile"
            className="myImg"
            title="Click to change profile picture"
            onClick={() => document.getElementById("profileImage").click()}
          />
        </div>

        <div className="col-md-6 d-flex justify-content-center">
          <div className="patient-login-card">
            <div className="text-center mb-3">
              <FaHospitalUser size={40} />
              <h2 className="mt-2">Edit your profile</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label>Name</label>
                <input ref={nameRef} />
              </div>

              <div className="form-row">
                <label>Email</label>
                <input ref={emailRef} />
              </div>

              <div className="form-row">
                <label>Gender</label>
                <select ref={genderRef}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-row">
                <label>DOB</label>
                <input type="date" ref={dobRef} />
              </div>

              <div className="form-row">
                <label>Phone</label>
                <input type="number" ref={phoneRef} />
              </div>

              <div className="form-row">
                <label>State</label>
                <select value={state} onChange={handleStateChange}>
                <option value="">Select</option>
                  {Object.keys(stateDistrictData).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label>District</label>
                <select value={dist} onChange={(e) => setDist(e.target.value)}>
                  <option value="">Select</option>
                  {dists.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <button className="update-btn" type="submit">
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>

            <div className="text-center mt-3" style={{ fontSize: "12px", color: "#aaa" }}>
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
