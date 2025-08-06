import React from 'react'
import { Link } from 'react-router-dom'

const Book = ({doctor}) => {

    if (!doctor) return null;
    let { _id, profileImage, name, specialization } = doctor
    console.log(profileImage);
    

  return (
    <>
    <style>
      {`
        .card{
          background:rgba(0,0,0,0.6);
          align-items:center;
        }
        .card-body{
          color:white;
          justify-items:center;
        }
        .details{
          margin-left:25%;
        }
      `}
    </style>
      <div className="card">

        <img src={`${profileImage}`} className="card-img-top" alt={name} style={{height: '95%', width: 'cover', padding: '5px'}} />
        <div className="card-body">
            <h5 className="card-title">Name: {name}</h5>
            <h4 className="card-title">Specialization: {specialization}</h4>
            <Link to={`/doctors/${_id}`} className="details btn btn-dark">See Details</Link>
        </div>
      </div>
      
    </>
  )
}

export default Book
