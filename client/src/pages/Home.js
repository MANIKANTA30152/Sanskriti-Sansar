// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMonument,
  FaVrCardboard,
  FaCalendarAlt,
  FaPalette,
  FaUtensils,
} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Home.css';

import heroImage from '../assets/hero-image.jpg';
import featuredImage1 from '../assets/taj-mahal.jpg';
import featuredImage2 from '../assets/kathakali.jpg';
import featuredImage3 from '../assets/diwali.jpg';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
        }}
      >
        <div className="hero-content">
          <h1>Discover the Soul of India</h1>
          <p>Journey through 5000 years of civilization, tradition, and cultural heritage</p>
          <Link to="/heritage-sites" className="cta-button">
            Begin Exploration
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Explore Indian Culture</h2>
          <p>Select a category to immerse yourself in India's rich heritage</p>
        </div>
        <div className="features-grid">
          <Link to="/heritage-sites" className="feature-card">
            <div className="feature-icon">
              <FaMonument size={48} />
            </div>
            <h3>Heritage Sites</h3>
            <p>Discover 40 UNESCO World Heritage Sites across India</p>
          </Link>

          <Link to="/virtual-tours" className="feature-card">
            <div className="feature-icon">
              <FaVrCardboard size={48} />
            </div>
            <h3>Virtual Tours</h3>
            <p>3D experiences of India's architectural marvels</p>
          </Link>

          <Link to="/festivals" className="feature-card">
            <div className="feature-icon">
              <FaCalendarAlt size={48} />
            </div>
            <h3>Festivals</h3>
            <p>Celebrate India's vibrant festival traditions</p>
          </Link>

          <Link to="/art-forms" className="feature-card">
            <div className="feature-icon">
              <FaPalette size={48} />
            </div>
            <h3>Art Forms</h3>
            <p>Explore classical and folk arts of India</p>
          </Link>

          <Link to="/cuisine" className="feature-card">
            <div className="feature-icon">
              <FaUtensils size={48} />
            </div>
            <h3>Cuisine</h3>
            <p>Taste India's diverse culinary traditions</p>
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        {/* Featured Item 1 */}
        <div className="featured-item">
          <LazyLoadImage
            src={featuredImage1}
            alt="Taj Mahal"
            effect="blur"
            className="featured-image"
          />
          <div className="featured-content">
            <h3>Architectural Marvels</h3>
            <p>
              From the Taj Mahal to ancient temples, explore India's architectural
              heritage that spans millennia.
            </p>
            <Link to="/heritage-sites" className="learn-more">
              Learn More →
            </Link>
          </div>
        </div>

        {/* Featured Item 2 */}
        <div className="featured-item reverse">
          <LazyLoadImage
            src={featuredImage2}
            alt="Kathakali"
            effect="blur"
            className="featured-image"
          />
          <div className="featured-content">
            <h3>Performing Arts</h3>
            <p>
              Discover classical dance forms like Bharatanatyam, Kathak, and
              traditional theater like Kathakali.
            </p>
            <Link to="/art-forms" className="learn-more">
              Learn More →
            </Link>
          </div>
        </div>

        {/* Featured Item 3 */}
        <div className="featured-item">
          <LazyLoadImage
            src={featuredImage3}
            alt="Diwali"
            effect="blur"
            className="featured-image"
          />
          <div className="featured-content">
            <h3>Festivals of India</h3>
            <p>
              Experience the colors of Holi, lights of Diwali, and spirituality of
              Kumbh Mela.
            </p>
            <Link to="/festivals" className="learn-more">
              Learn More →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
