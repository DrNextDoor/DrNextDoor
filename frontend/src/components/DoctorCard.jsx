import React from 'react'
import { Link } from 'react-router-dom'

const DoctorCard = ({doctor}) => {

    if (!doctor) return null;
    let { _id, profileImage, name, specialization } = doctor
    console.log(profileImage)

  return (
    <>
      <div className="card">
        <img src={`${profileImage}`} className="card-img-top" alt="..." style={{height: '95%', width: '80%'}} />
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h4 className="card-title">{specialization}</h4>
            <Link to={`/admin/doctors/${_id}`} className="btn btn-primary">See Details</Link>
        </div>
      </div>
    </>
  )
}

export default DoctorCard
