import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { API,stateDistrictData } from '../../utils/utils'
import loginBack from './../../assets/login-back.jpg'
import { FaHospitalUser } from "react-icons/fa";
import defaultImage from './../../assets/default_patient.png'

const Register = () => {

    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const nameRef = useRef()
    const emailRef = useRef()
    const [state,setState]=useState("")
    const [dist,setDist]=useState("")
    const [dists,setDists]=useState([])
    const [password,setPassword]=useState("")
    const [confirmPass,setConfirmPass]=useState("")
    const [passwordMatch,setPasswordMatch]=useState(true)
    

    const handleStateChange=(e)=>{
        const selectedState=e.target.value
        setState(selectedState)
        setDists(stateDistrictData[selectedState] || [])
        setDist("")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!passwordMatch) {
            setMessage("Both passwords should match")
            setLoading(false)
            return
        }
        let name = nameRef.current.value
        let email = emailRef.current.value
        let addr={"State":state,"District":dist}
        try {   
            const response = await fetch(defaultImage)
        const blob = await response.blob()
        const file = new File([blob], "default_image.png", { type: blob.type })

        // Prepare form data
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("image", file) 
        formData.append("address",JSON.stringify(addr))

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        await axios.post(`${API}/patient/register`, formData, config)

            setMessage("Account Created")
            nameRef.current.value = ""
            emailRef.current.value = ""
            setPassword("")
            setConfirmPass("")
            document.getElementById("password").value=""
            document.getElementById("confirmPass").value=""

            
        } catch (error) {
            
            if(error.status === 400){
                setMessage(error.response.data.message)
            } else {
                setMessage("Something Wrong")
            }
            
        }
        setLoading(false)
    }
    const confirmPassword =(pass)=> {
        if(password!==pass){
            setPasswordMatch(false)
            setMessage("Both passwords should match")
        }
        else{
            setPasswordMatch(true)
            setMessage("")
        }
      } 
      useEffect(() => {
              document.body.style.backgroundImage = `url(${loginBack})`
              document.body.style.backgroundSize = 'cover'
              document.body.style.backgroundRepeat = 'no-repeat'
              document.body.style.backgroundPosition = 'center'
          }, [])
    return (
        <>
        <style>
                {`
                    .patient-signup-card {
                        background: rgba(0, 0, 0, 0.6);
                        color: white;
                        padding: 60px 40px;
                        border-radius: 20px;
                        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
                        max-width: 520px;
                        width: 100%;
                        height: 600px;
                        animation: fadeIn 0.5s ease-in-out;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .form-control {
                        background-color: #121212;
                        border: 1px solid #333;
                        color: white;
                        height: 45px;
                        font-size: 16px;
                    }

                    .form-control::placeholder {
                        color: #bbb;
                    }

                    .signup-btn {
                        width: 100%;
                        padding: 12px;
                        background-color: white;
                        color: black;
                        font-weight: bold;
                        border: none;
                        border-radius: 10px;
                        transition: all 0.3s ease;
                    }

                    .signup-btn:hover {
                        color: #e6e6e6;
                        background-color: grey;

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
    <div className='row'>
        <div className="col-md-6 mx-auto">
            <div className="patient-signup-card card" style={{marginLeft:"50%",height:"93%"}}>
                <div className="card-header">
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <FaHospitalUser size={40} style={{ color: 'white' }} />
                    </div>
                    <h3 className='text-center'>Welcome, Create an Account</h3>
                    <p className='message-text'>{message}</p>
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={handleSubmit}>
                        <input ref={nameRef} type='text' className='form-control mb-2' placeholder='Enter your Name' required /> 
                        <input ref={emailRef} type='email' className='form-control mb-2' placeholder='Enter your email' required />
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
                        <input type='password' className='form-control mb-2' 
                            placeholder='Enter password'
                            id="password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                            required /> 
                        <input type='password' className='form-control mb-2' 
                            placeholder='Confirm password' 
                            id="confirmPass"
                            onChange={(e)=>confirmPassword(e.target.value)}
                            required /> 
                        {
                            !loading && <input type='submit' value="Register" className='signup-btn btn btn-primary' />
                        }
                    </form>
                    <div className="text-center" style={{ fontSize: "12px", color: "#aaa", marginTop: "10px" }}>
                                © 2025 DrNextDoor • All rights reserved
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register