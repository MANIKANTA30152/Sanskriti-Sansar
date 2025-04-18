import React from 'react';
import './Festivals.css';
import festival1 from '../assets/diwali.jpg';
import festival2 from '../assets/holi.jpg';
import festival3 from '../assets/durga-puja.jpg';

function Festivals() {
  const festivals = [
    {
      id: 1,
      name: 'Diwali',
      image: festival1,
      description: 'The festival of lights celebrated across India, symbolizing the victory of light over darkness.',
      region: 'Nationwide',
      month: 'October/November'
    },
    {
      id: 2,
      name: 'Holi',
      image: festival2,
      description: 'The colorful festival marking the arrival of spring, celebrated with colored powders and water.',
      region: 'North India',
      month: 'March'
    },
    {
      id: 3,
      name: 'Durga Puja',
      image: festival3,
      description: 'A major festival in West Bengal celebrating the victory of Goddess Durga over the buffalo demon Mahishasura.',
      region: 'West Bengal',
      month: 'September/October'
    }
  ];

  return (
    <div className="festivals-container">
      <div className="festivals-header">
        <h1>Festivals of India</h1>
        <p>Experience the vibrant colors and rich traditions of India's diverse festivals</p>
      </div>
      
      <div className="festivals-grid">
        {festivals.map(festival => (
          <div key={festival.id} className="festival-card">
            <div className="festival-image" style={{ backgroundImage: `url(${festival.image})` }} />
            <div className="festival-content">
              <h3>{festival.name}</h3>
              <p className="region">{festival.region} • {festival.month}</p>
              <p className="description">{festival.description}</p>
              <button className="details-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Festivals;