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
import Footer from '../components/Footer/Footer'

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
              overflow-x: scroll;
              display : flex;
              flex-wrap: nowrap;
              white-space: nowrap;
              padding-bottom: 1rem;
              scroll-behavior: smooth;
              width: 100px,
            }
        `}
      </style>

      <Header />

                <div className="d-flex justify-content-between align-items-center px-5 py-4">
                  <h3>Popular Searches on DrNextDoor..</h3>
                </div>

                <div className="container-fluid">
                <div className="scroll-wrapper d-flex flex-nowrap">
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
          <div className="d-flex justify-content-between align-items-center px-5 py-4 m-3 rounded-pill bg-dark text-white" style={{ height: '400px' }}>
              <div className="d-flex justify-content-between align-items-center px-5 py-4 rounded-pill bg-dark text-white bg-light" style={{ height: '400px' }}>
          
                <div>
                  <img
                    src={home2}
                    alt=""
                    style={{ maxWidth: '450px', height: 'auto', borderRadius: '120px', marginRight: '50px' }}
                  />
                </div>

                <div className="text-start">
                  <h2 className="fw-bold"> Your health A to Z </h2><br />
                  <p className="text-white-50" style={{ fontSize: '18px' }}>
                  Easy–to–understand health information to help you be ready for your appointment.<br />
                  <br />
                  Learn what you need to know about symptoms, diagnosis, and treatment options to discuss with your doctor. From major surgery to routine procedures, find out what to expect and how to prepare for a successful outcome.
                  </p>
                </div>
              </div>
          </div>

          {/* 3rd big div */}
          <div className="d-flex justify-content-between align-items-center px-5 py-4 m-2 rounded-pill bg-dark text-white" style={{ height: '400px' }}>
              <div className="d-flex justify-content-between align-items-center px-5 py-4 rounded-pill bg-dark text-white bg-light" style={{ height: '400px' }}>

                <div className="text-start">
                  <h2 className="fw-bold"> Reach more patients </h2><br />
                  <p className="text-white-50" style={{ fontSize: '18px' }}>
                  Doctors who claim their free Healthgrades profile connect with the right patients 2x more.<br />
                  Your future patients are ready to connect. Make sure your profile stands out. Learn more about how to claim your free Healthgrades profile and our available upgrades.
                  </p>
                </div>
              </div>

              <div>
                  <img
                    src={home3}
                    alt=""
                    style={{ width: '90%', height: '100%', borderRadius: '100px' }}
                  />
                </div>
          </div>
          
          <Footer />
    </>
  )
}

export default Home
