// client/src/pages/Contact.js
import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Contact.css';

const Contact = () => (
  <div className="contact-page">
    <div className="contact-header">
      <h1>Contact Us</h1>
      <p>
        We’d love to hear from you! Whether it’s feedback, questions, or partnership
        inquiries, reach out via any of the channels below.
      </p>
    </div>

    <div className="contact-cards">
      <div className="contact-card">
        <FaMapMarkerAlt className="contact-icon" />
        <h2>Our Office</h2>
        <p>
          Sanskriti Sansar Cultural Project Office<br/>
          B‑Block, Cultural Complex,<br/>
          Lodhi Road, New Delhi – 110003
        </p>
      </div>

      <div className="contact-card">
        <FaEnvelope className="contact-icon" />
        <h2>Email Us</h2>
        <p>
          <a href="mailto:contact@sanskritisansar.in">
            contact@sanskritisansar.in
          </a>
        </p>
      </div>

      <div className="contact-card">
        <FaPhone className="contact-icon" />
        <h2>Call / WhatsApp</h2>
        <p>
          <a href="tel:+919999999999">+91‑99999‑99999</a><br/>
          Mon–Fri, 9 AM–6 PM IST
        </p>
      </div>
    </div>
  </div>
);

export default Contact;
