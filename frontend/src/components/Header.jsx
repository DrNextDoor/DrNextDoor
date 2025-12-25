import React from "react";
import doctorImg from "../assets/doctor.jpeg";

const Header = () => {
  return (
    <>
      <style>
      {`
        .header-section {
          border-radius: 20px;
        }
        .header-image {
          max-width: 420px;
          width: 100%;
          height: auto;
          border-radius: 16px;
        }

        @media (min-width: 992px) {
          .header-section {
            border-radius: 999px; 
          }
          .header-image {
            border-radius: 120px;
          }
        }

        @media (max-width: 991px) {
          .header-section {
            flex-direction: column !important;
            text-align: center;
            padding: 20px !important;
          }
          .header-image {
            margin-bottom: 20px;
          }
          .header-text {
            text-align: center !important;
          }
        }
      `}
      </style>
      <div className="header-section d-flex align-items-center bg-dark text-white px-5 py-4 m-3">
        <div className="flex-shrink-0 text-center">
          <img
            src={doctorImg}
            alt="Doctor"
            className="header-image"
          />
        </div>
        <div className="header-text ms-md-5">
          <h2 className="fw-bold">
            Book Appointment <br /> With Trusted Doctors
          </h2>
          <p className="text-white-50 fs-5">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
