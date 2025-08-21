import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DoctorCard from '../../components/DoctorCard.jsx'
import { API } from '../../utils/utils.js'

const AdminHomme = () => {
    const [doctors, setDoctors] = useState([])

    const getDoctors = async () => {
        try {
            const  data  = await axios.get(`${API}/admin/allDoctors`)
            setDoctors(data.data)
            console.log(doctors);
            
        } catch (error) {
            console.error(error);
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
                    <div className='col-md-4' key={doctor._id} >
                        <DoctorCard doctor={doctor} />
                    </div>
                ))
            ) : (
                <h2>No Doctors Found</h2>
            )
        }

      </div>
    </>
  )
}

export default AdminHomme
