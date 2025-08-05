import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-top">
        <div className="top-content">
          <h3 className="heading">FIND US ON</h3>
          <p>
            Feel free to <span>connect</span> with us on our social media platforms.
          </p>
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/tanujasai-gajavelli-739316301"
              target="_blank"
            >
              <i className="bx bxl-linkedin-square bx-md"></i>
            </a>
            <a href="https://github.com/DrNextDoor/DrNextDoor" target="_blank">
              <i className="bx bxl-github bx-md"></i>
            </a>
            <a href="https://www.instagram.com/tanujagajavelli" target="_blank">
              <i className="bx bxl-instagram bx-md"></i>
            </a>
          </div>
        </div>
        <hr />
      </div>
      <div className="footer-bottom">
        <p>Designed and Developed by CodeVerse</p>
        <p>Copyright&copy;CodeVerse</p>
      </div>
    </div>
  );
};

export default Footer;