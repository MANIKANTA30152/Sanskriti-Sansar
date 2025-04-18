// client/src/pages/About.js
import React from 'react';
import './About.css';

const About = () => (
  <div className="about-container">
    <section className="intro-section">
      <h1>About Sanskriti Sansar</h1>
      <p>
        Sanskriti Sansar is an initiative to promote and preserve the rich cultural heritage
        of India. It brings together the vast diversity of Indian traditions, festivals,
        art forms, heritage sites, and cuisine, all on a single platform.
      </p>
      <p>
        Developed as a part of a cultural awareness initiative, Sanskriti Sansar serves as
        a digital gateway for users to explore the timeless essence of Indian civilization.
      </p>
    </section>

    <section className="testimonial-section">
      <h2>Testimonials</h2>
      <div className="testimonial-card">
        <strong>Priya</strong>
        <span>Feb 5, 2025</span>
        <p>This is an amazing initiative to learn about India's culture. Everything is beautifully organized and easy to access!</p>
      </div>
      <div className="testimonial-card">
        <strong>Ravi</strong>
        <span>Mar 12, 2025</span>
        <p>The virtual tour feature is simply incredible. It feels like I'm walking through Indian monuments from my home.</p>
      </div>
      <div className="testimonial-card">
        <strong>Anjali</strong>
        <span>Apr 2, 2025</span>
        <p>Highly informative and engaging platform. A must-visit for anyone who wants to connect with Indian traditions.</p>
      </div>
      <div className="testimonial-card">
        <strong>Karan</strong>
        <span>Apr 15, 2025</span>
        <p>The interface is clean, and the sections on festivals and food are my favorite. Great job by the development team!</p>
      </div>
      <div className="testimonial-card">
        <strong>Meera</strong>
        <span>Apr 17, 2025</span>
        <p>Perfect for students and travelers who want to know more about India. Very well presented content.</p>
      </div>
    </section>

    <section className="gallery-section">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="gallery-item">Gallery {i + 1}</div>
        ))}
      </div>
    </section>

    <section className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <p><strong>Address:</strong> Sanskriti Sansar Cultural Project Office, New Delhi, India</p>
        <p><strong>Email:</strong> contact@sanskritisansar.in</p>
        <p><strong>Support:</strong> +91‑99999‑99999</p>
      </div>
    </section>
  </div>
);

export default About;
