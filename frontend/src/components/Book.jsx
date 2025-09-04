import React from 'react'
import { Link } from 'react-router-dom'

const Book = ({doctor}) => {

    if (!doctor) return null;
    let { _id, profileImage, name, specialization } = doctor
    

  return (
    <>
    <style>
      {`
      .card {
            background: rgba(0, 0, 0, 0.6);
            align-items: center;
            height: 350px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 10px;
            overflow: hidden;
            width: 100%;
            max-width: 350px;
            margin: 20px;
          }

          .card-img-top {
            height: 200px;       
            width: 100%;        
            object-fit: cover;  
            display: block;
          }
          .card-body {
            color: white;
            text-align: center;
            padding: 10px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .details {
            margin-top: auto;
          }

          

          @media (max-width: 600px) {
            .card {
              height: 300px;
            }
            .card-img-top {
              height: 150px;
            }
          }
      `}
    </style>
      <div className="card">
        <img src={`${profileImage}`} className="card-img-top" alt={name} style={{ width: 'cover', padding: '5px'}} />
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
