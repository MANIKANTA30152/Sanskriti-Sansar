import React from 'react';
import './Cuisine.css';
import cuisine1 from '../assets/north-indian.jpg'; // Using existing image
import cuisine2 from '../assets/south-indian.jpg';

function Cuisine() {
  const cuisines = [
    {
      id: 1,
      name: 'North Indian',
      image: cuisine1,
      description: 'Famous for tandoori dishes, rich curries and breads like naan and roti.'
    },
    {
      id: 2,
      name: 'South Indian',
      image: cuisine2,
      description: 'Known for dosas, idlis, and flavorful coconut-based dishes.'
    }
  ];

  return (
    <div className="cuisine-container">
      <h1>Indian Cuisine</h1>
      <p className="subtitle">Explore the diverse culinary traditions of India</p>
      
      <div className="cuisine-grid">
        {cuisines.map(cuisine => (
          <div key={cuisine.id} className="cuisine-card">
            <div 
              className="cuisine-image" 
              style={{ backgroundImage: `url(${cuisine.image})` }}
            />
            <div className="cuisine-info">
              <h3>{cuisine.name}</h3>
              <p>{cuisine.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cuisine;