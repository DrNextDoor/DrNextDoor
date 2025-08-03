import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Book from '../../components/Book.jsx'
import { API } from '../../utils/utils.js'

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
        getDoctors()
    }, [])
  return (
    <>
      <div className='row g-2'>
        {
            doctors.length > 0? (
                doctors.map((doctor) => (
                    <div className='col-md-4' key={doctor._id}>
                        <Book doctor={doctor} />
                    </div>
                ))
            ) : (
                <h2>No Appointments Booked Till Now</h2>
            )
        }

      </div>
    </>
  )
}

export default Appointments