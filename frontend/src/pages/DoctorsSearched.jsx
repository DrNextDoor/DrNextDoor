import React, { useRef, useState } from 'react'
import DoctorCard from './../components/DoctorCard'
import axios from 'axios'
import { API } from './../utils/utils'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const DoctorsSearched = () => {
    const {loc}=useParams()
    const [doctors,setDoctors]=useState([])
    const [error,setError]=useState("")
    

    const handleSubmit=async()=>{
        setError("")
        try{
            let data=await axios.get(`${API}/patient/searchDoc?addr=${loc}`)
            setDoctors(data.data)
            
        }
        catch(error){
            console.log(error);
            setError("No Doctors found")
        }
    }
    useEffect(()=>{
        handleSubmit()
    },[loc])
  return (
    <>
        <div className='row mt-4 ms-4'>
        {
            error.length > 0? (
                <p className='text-danger'>No Doctors Found</p>
            ) : (
                doctors.map(doctor => (
                    <div className="col-md-4">
                        <DoctorCard doctor={doctor} />
                    </div>
                ))
            )
        }
        </div> 
    </>
  )
}

export default DoctorsSearched
