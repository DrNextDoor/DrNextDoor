import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Book from '../../components/Book.jsx'
import { API } from '../../utils/utils.js'
import loginBack from './../../assets/login-back.jpg'

const Appointments = () => {
    const [doctors, setDoctors] = useState([])

    const getDoctors = async () => {
        try {
            const  data  = await axios.get(`${API}/patient/getAllDoctors`)
            setDoctors(data.data)
            console.log(doctors);
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        document.body.style.backgroundImage = `url(${loginBack})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        getDoctors()
    }, [])
  return (
    <>
        <style>
            {`
                .all-doc {
                    box-shadow: 0 30px 58px rgba(37, 32, 32, 0.5);
                    padding:20px;
                }
                .appt-title {
                    font-weight: 600;
                    color: #02010dff;
                    font-size: 32px;
                    margin-bottom: 20px;
                    border-bottom: 2px solid #555;
                    padding-bottom: 10px;
                }
            `}
        </style>

        {doctors.length > 0? (
            <>
            <h2 className="appt-title">All Doctors</h2>
            <div className='all-doc row g-3'>
                { doctors.map((doctor) => (
                    <div className='doc-card col-md-4' key={doctor._id}>
                        <Book className='doc' doctor={doctor} />
                    </div>
                ))
                }
            </div>
            </>
            ) : (
                <h2>No Doctors Available</h2>
            )
        }

    </>
  )
}

export default Appointments