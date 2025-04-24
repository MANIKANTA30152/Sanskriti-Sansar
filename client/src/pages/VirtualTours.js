// src/pages/VirtualTours.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VirtualTours.css';

function VirtualTours() {
  const [virtualTours, setVirtualTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVirtualTours = async () => {
      try {
        const response = await axios.get('/api/heritage-sites/virtual-tours');
        setVirtualTours(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVirtualTours();
  }, []);

  if (loading) return <div className="loading">Loading virtual tours...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!virtualTours.length) return <div className="empty">No virtual tours available</div>;

  return (
    <div className="virtual-tours-container">
      <h1>Virtual Tours</h1>
      <div className="tours-grid">
        {virtualTours.map(tour => (
          <div key={tour._id} className="tour-card">
            <Link to={`/virtual-tours/${tour._id}`}>
              <img src={tour.image} alt={tour.name} />
              <h3>{tour.name}</h3>
              <p>{tour.location}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualTours;