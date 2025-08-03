import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import { API } from '../../utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthPatient'
import loginBack from './../../assets/login-back.jpg'

const AdminLogin = () => {

    const { loginAdmin } = useAuth()
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")
        
        try {
            let email = emailRef.current.value
            let password = passwordRef.current.value
            let data = await axios.post(`${API}/admin/login`, {email, password})
            console.log(data.data);
            
                setMessage("Login Successful")
                const { token, name } = data.data;
                loginAdmin(token, name) // Assuming you have a login function in your context
                navigate("/"); // or wherever you go post-login
              
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
                    .admin-login-card {
                        background: rgba(0, 0, 0, 0.6);
                        color: white;
                        padding: 30px 40px;
                        border-radius: 20px;
                        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
                        max-width: 520px;
                        width: 100%;
                        height: 350px;
                        animation: fadeIn 0.5s ease-in-out;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-top: 100px;
                        margin-left : 55%;
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
                        margin-top: 10px;
                    }

                    .login-btn:hover {
                        background-color: #e6e6e6;
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

      <div className="row">
        <div className="col-md-6 mx-auto">
            <div className="admin-login-card card">
                    <div className="card-header">
                        <h3>Admin Login</h3>
                        <p>{message}</p>
                    </div>
                    <div className="card-body">
                        <form method="post" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="Email"
                                ref = {emailRef}
                                required
                            />
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Password"
                                ref = {passwordRef}
                                required
                            />
                            {!loading && (
                                <input
                                    type="submit"
                                    value="Login"
                                    className="login-btn btn btn-primary"
                                />
                            )}        
                        </form>
                    </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminLogin
