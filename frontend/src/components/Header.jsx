import React from 'react';
import doctorImg from './../assets/doctor.jpeg';

const Header = () => {
  return (
    <>
      <style>
        {`
          @media (max-width: 500px) {
            .header-section {
              flex-direction: column !important;
              height: auto !important;
              border-radius: 20px !important;
              padding: 20px !important;
              text-align: center;
              align-items: center !important; /* Ensure children are centered */
            }

            .header-image {
              width: 100% !important;
              height: auto !important;
              border-radius: 20px !important;
              margin-bottom: 20px;
              margin-left: 0 !important;
            }

            .header-section .text-start {
              text-align: center !important;
            }
          }

          .header-image {
            max-width: 800px;
            height: auto;
            border-radius: 150px;
            margin-left: 50px;
          }
        `}
      </style>

      <div className="header-section d-flex flex-row-reverse align-items-center px-5 py-4 rounded-pill bg-dark text-white">
        <div className="d-flex justify-content-center w-100">
          <img
            src={doctorImg}
            alt="Doctor"
            className="header-image"
          />
        </div>

        <div className="text-start">
          <h2 className="fw-bold">Book Appointment<br />With Trusted Doctors</h2> <br />
          <p className="text-white-50" style={{ fontSize: '20px' }}>
            Simply browse through our extensive list of trusted doctors,<br />
            schedule your appointment hassle-free.
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
