import axios from 'axios'
import React, { useRef, useState } from 'react'
import { API } from '../utils/utils.js'
// import { useAuth } from '../context/AuthContext'

const AddDoctor = () => {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    // const { token } = useAuth()
    const token = "your_token_here" // Replace with actual token or from context

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const specializationRef = useRef()
    const experienceRef = useRef()
    const bioMessageRef = useRef()
    const approvedRef = useRef()
    const profileImageRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        const docData = new FormData()
        docData.append("name", nameRef.current.value)
        docData.append("email", emailRef.current.value)
        docData.append("password", passwordRef.current.value)
        docData.append("specialization", specializationRef.current.value)
        docData.append("experience", experienceRef.current.value)
        docData.append("bioMessage", bioMessageRef.current.value)
        docData.append("approved", approvedRef.current.value)

        // Only try to append image if it's selected
        if (profileImageRef.current && profileImageRef.current.files.length > 0) {
            docData.append("profileImage", profileImageRef.current.files[0])
        }

        try {
            const data = await axios.post(`${API}/admin/addDoctor`, docData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(data)
            setLoading(false)
            setMessage("Doctor added successfully")

            // Reset the form
            nameRef.current.value = ""
            emailRef.current.value = ""
            passwordRef.current.value = ""
            specializationRef.current.value = ""
            experienceRef.current.value = ""
            bioMessageRef.current.value = ""
            approvedRef.current.value = "approved"
            profileImageRef.current.value = null

        } catch (error) {
            setLoading(false)
            setMessage(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <>
            <div className='row'>
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h3>Add Doctor Details By-Admin</h3>
                            <p>{message}</p>
                        </div>
                        <div className="card-body">
                            <form method="post" onSubmit={handleSubmit}>
                                Doctor Name :
                                <input type="text" className="form-control" ref={nameRef} required />
                                Doctor Email :
                                <input type="email" className="form-control" ref={emailRef} required />
                                Doctor Password :
                                <input type="password" className="form-control" ref={passwordRef} required />
                                Doctor Specialization :
                                <input type="text" className="form-control" ref={specializationRef} required />
                                Doctor Experience :
                                <input type="text" className="form-control" ref={experienceRef} required />
                                Doctor Bio Message :
                                <input type="text" className="form-control" ref={bioMessageRef} required />
                                Doctor Status :
                                <select className="form-control" ref={approvedRef} required>
                                    <option value="approved">approved</option>
                                    <option value="not approved">not approved</option>
                                </select>
                                Doctor Profile Image :
                                <input type="file" className="form-control" ref={profileImageRef} required />
                                <br />
                                {!loading && <button type="submit" className="btn btn-primary">Add Doctor</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDoctor
