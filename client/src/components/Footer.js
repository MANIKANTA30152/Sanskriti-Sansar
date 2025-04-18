import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li><a href="/heritage-sites">Heritage Sites</a></li>
            <li><a href="/virtual-tours">Virtual Tours</a></li>
            <li><a href="/festivals">Festivals</a></li>
            <li><a href="/art-forms">Art Forms</a></li>
            <li><a href="/cuisine">Cuisine</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Cultural Blog</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="https://x.com/SanskritiSansar" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61574919782879" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/sanskritisansar/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/channel/UCfd1wRfLxJ1HtiVk0WPuqsg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              aria-label="Email for newsletter"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SanskritiSansar. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;