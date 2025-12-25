import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from './../../utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import loginBack from './../../assets/login-back.jpg'
import { FaHospitalUser } from "react-icons/fa";
import { useAuth } from '../../context/AuthPatient'


const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const res = await axios.post(`${API}/patient/login`, { email, password })
            login(res.data)
            setEmail("")
            setPassword("")
            navigate("/")
        } catch (error) {
            setMessage("Invalid Credentials")
        }

        setLoading(false)
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
                    .patient-login-card {
                        background: rgba(0, 0, 0, 0.6);
                        color: white;
                        padding: 60px 40px;
                        border-radius: 20px;
                        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
                        max-width: 520px;
                        width: 100%;
                        height: 500px;
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

                    .login-btn {
                        width: 100%;
                        padding: 12px;
                        background-color: white;
                        color: black;
                        font-weight: bold;
                        border: none;
                        border-radius: 10px;
                        transition: all 0.3s ease;
                    }

                    .login-btn:hover {
                        color: #e6e6e6;
                        background-color:grey
                    }

                    .message-text {
                        color: #ff4d4d;
                        text-align: center;
                        margin-top: 10px;
                        font-weight: bold;
                    }

                    .forgot-link {
                        font-size: 14px;
                        color: #ccc;
                        text-align: right;
                        margin-top: 5px;
                        cursor: pointer;
                    }

                    .forgot-link:hover {
                        text-decoration: underline;
                        color: white;
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
                    @media (max-width: 991px) {
                        .patient-login-card {
                            padding: 30px 20px;
                            max-width: 420px;
                        }
                    }

                    @media (max-width: 767px) {
                        .patient-login-card {
                            padding: 25px 15px;
                            width: 90%;
                            height: auto;
                        }

                        .forgot-link {
                            text-align: center;
                        }

                        .container-fluid {
                            padding: 0 10px;
                        }
                    }

                    @media (max-width: 575px) {
                        .patient-login-card h2 {
                            font-size: 22px;
                        }

                        .patient-login-card p {
                            font-size: 13px;
                        }

                        .login-btn {
                            padding: 10px;
                            font-size: 14px;
                        }
                    }
                `}
            </style>

            <div className="container-fluid">
                <div className="row align-items-center" style={{ height: "87vh" }}>
                    <div className="col-md-7 d-none d-md-block"></div>
                    <div className="col-md-5 d-flex justify-content-center align-items-center">
                        <div className="patient-login-card">
                            <div>
                                <div className="text-center mb-4">
                                    <FaHospitalUser size={40} style={{ color: 'white' }} />
                                    <h2 className="mt-2">Welcome,Login Here</h2>
                                    <p style={{ fontSize: "14px", color: "#bbb" }}>
                                        Please login to access your dashboard
                                    </p>
                                </div>

                                {message && <p className="message-text">{message}</p>}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="forgot-link">Forgot password?</div>
                                    <button type="submit" className="login-btn mt-4" disabled={loading}>
                                        {loading ? "Logging in..." : "Log In"}
                                    </button>
                                </form>
                            </div>
                            <div className="text-center" style={{ fontSize: "12px", color: "#aaa", marginTop: "10px" }}>
                                © 2025 DrNextDoor • All rights reserved
                            </div>
                            
                            <div className="text-center" style={{ fontSize: "15px", color: "white", marginTop: "10px" }}>
                                <p>New to DrNextDoor..?? <Link to="/register" style={{color:"white",textDecoration:"none"}}>Register here</Link></p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
