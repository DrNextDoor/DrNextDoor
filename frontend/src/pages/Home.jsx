import React from 'react'
import Header from '../components/Header'
import gyno from '../assets/gyno.jpg'
import ortho from '../assets/ortho.jpg'
import cardio from '../assets/cardio.jpg'
import dentist from '../assets/dentist.jpg'
import pedia from '../assets/pedia.webp'
import derma from '../assets/derma.jpg'
import ent from '../assets/ent.jpg'
import gastro from '../assets/gastro.jpeg'
import imuno from '../assets/imun.webp'
import nephro from '../assets/nephro.webp'
import med from '../assets/med.jpg'
import hermato from '../assets/hermato.png'
import psychia from '../assets/psychia.jpg'
import home2 from '../assets/phy-patient-1.jpg'
import home3 from '../assets/phy-pat-2.jpg'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Home = () => {
      const doctors = [
        {
          image: gyno,
          name: "Gynocologist",

          description: "Treatment of conditions affecting the Female reporoductive system."
        },
        {
          image: ortho,
          name: "Orthologists",
          description: "Specialization in musculoskeletal disorders and injuries."
        },
        {
          image: cardio,
          name: "Cardiologist",
          description: "Focus on heart health and wellness."
        },
        {
          image: dentist,
          name: "Dentist",
          description: "Dental care and oral health."
        },
        {
          image: pedia,
          name: "Pediatrician",
          description: "Child health and development."
        },
        {
          image: derma,
          name: "Dermatologist",
          description: "Skin, hair, and nail health."
        },
        {
          image: ent,
          name: "ENT Specialist",
          description: "Ear, nose, and throat health."
        },
        {
          image: gastro,
          name: "Gastroenterologist",
          description: "Digestive system health."
        },
        {
          image: imuno,
          name: "Immunologist", 
          description: "Immune system disorders and allergies."
        },
        {
          image: nephro,
          name: "Nephrologist",
          description: "Kidney health and diseases."
        },
        {
          image: med,
          name: "Internal Medicine",
          description: "Comprehensive care for adults."
        },
        {
          image: hermato,
          name: "Hematologist",
          description: "Blood disorders and diseases."
        },
        {
          image: psychia,
          name: "Psychiatrist",
          description: "Mental health and emotional well-being."
        }
        
      ];
  
  return (
    <>
      <style>
      {`
        .scroll-wrapper {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scroll-behavior: smooth;
        }

        .scroll-wrapper::-webkit-scrollbar {
          display: none;
        }

        .card {
          min-width: 250px;
        }

        .section-img {
          max-width: 100%;
          height: auto;
          border-radius: 20px;
        }

        .section {
          border-radius: 30px;
        }

        @media (max-width: 768px) {
          .section {
            flex-direction: column !important;
            text-align: center;
            padding: 20px !important;
          }
          .section img {
            margin-bottom: 20px;
          }

          .section .text-start {
            text-align: center !important;
          }
        }
      `}
      </style>


      <Header />
          <br />
                  <h4>Popular Searches on DrNextDoor..</h4>
          <br />
                <div className="container-fluid">
                <div className="scroll-wrapper d-flex flex-nowrap overflow-auto">
                  {doctors.map((doc, index) => (
                  <div className="card mx-2" style={{ minWidth: '250px', height: '330px' }} key={index}>
                    <img
                      className="card-img-top"
                      src={doc.image}
                      alt={doc.name}
                      style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{doc.name}</h5>
                      <p className="card-text" style={{ width: '80%', whiteSpace: 'normal'  }}>{doc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                <br />
          
          <Link to='/appointments' className="fs-4">View All Specialist..</Link> 
  
        
        {/* 2nd big div */}
        <div className="section d-flex align-items-center bg-dark text-white p-4 m-3">
        <img
          src={home2}
          alt=""
          className="section-img me-md-5"
          style={{ maxWidth: "400px" }}
        />

        <div className="text-start">
        <h2 className="fw-bold">Your health A to Z</h2>
        <p className="text-white-50 fs-5">
          Easy–to–understand health information to help you be ready for your appointment.
          <br /><br />
          Learn about symptoms, diagnosis, and treatment options before meeting your doctor.
        </p>
        </div>
        </div>


          {/* 3rd big div */}
            <div className="section d-flex flex-row-reverse align-items-center bg-dark text-white p-4 m-3">
            <img
              src={home3}
              alt=""
              className="section-img ms-md-5"
              style={{ maxWidth: "400px" }}
            />
            <div className="text-start">
              <h2 className="fw-bold">Reach more patients</h2>
              <p className="text-white-50 fs-5">
                Doctors who claim their free profile connect with patients 2x more.
                <br />
                Make sure your profile stands out and reaches the right audience.
              </p>
            </div>
          </div>
    </>
  )
}

export default Home
