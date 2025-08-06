import React from "react";
const Footer = () => {
  return (
    <>

    <style>
      {`  
                      .footer {
                display: flex;
                margin-top: 10vh;
                flex-direction: column;
                background-color: black;
                color: whitesmoke;
                backdrop-filter: blur(5px) saturate(5%);
              }
              .top-content {
                display: flex;
                flex-direction: column;
                row-gap: 3.5vh;
                justify-content: center;
                align-items: center;
                padding: 20px;
                margin: 20px 0px;
                color: var(--background-color);
              }
              h3 {
                font-size: 5vh;
                font-family: Outfit;
              }
              span {
                color: var(--accent-color);
              }
              .social-icons {
                display: flex;
                align-items: center;
                padding: 10px;
                gap: 25px;
              }
              .social-icons img {
                height: 34px;
                width: 34px;
              }
              .footer-bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: var(--background-color);
                padding: 5px 10px;
                margin-top: 10px;
              }
              .social-icons a:hover {
                color: var(--accent-color);
              }
              .social-icons img:hover {
                background-color: var(--accent-color);
              }
              @media (max-width: 500px) {
                .footer-bottom {
                  flex-direction: column;
                  justify-content: center;
                  row-gap: 10px;
                }
              }

      `}
    </style>

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

    </>
  );
};

export default Footer;