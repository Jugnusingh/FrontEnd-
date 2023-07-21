import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from 'react-router-dom'
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h3>DalalTechnologies</h3>
        <p>
          DalalTechnologies is a leading technology company specializing in software development and IT solutions. With a dedicated team of skilled professionals, we strive to deliver innovative and high-quality solutions to our clients.
        </p>
        <div className="social-media">
          <a href="https://www.facebook.com/dalal.tech/" className="social-icon" target="_blank">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com/dalaltechnologies/" className="social-icon" target="_blank">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/dalaltechnologies/" className="social-icon" target="_blank">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/message/5YN63JUGKQY3B1" className="social-icon" target="_blank">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://www.youtube.com/@Dalaltechnologies" className="social-icon" target="_blank">
            <i className="fab fa-youtube"></i>
          </a>
        </div>


      </div>
      <div className="footer-bottom">
        <p>
          copyright &copy; <a href="http://localhost:3000/">DalalTechnologies</a>
        </p>
        <div className="footer-menu">
          <ul className="f-menu">
            <li>
              {/* Replace the anchor tags with NavLink components */}
              <NavLink to="/Disclaimer">Disclaimer!</NavLink>
            </li>
            <li>
              <NavLink to="/PrivacyPolicy">Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to="/TermsAndConditions">Terms and Conditions</NavLink>
            </li>
            <li>
              <NavLink to="/CancellationPolicy">Cancellation Policy</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
