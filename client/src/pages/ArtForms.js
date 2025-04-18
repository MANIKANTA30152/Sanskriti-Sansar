import React from 'react';
import './ArtForms.css';
import art1 from '../assets/bharatanatyam.jpg';
import art2 from '../assets/kathakali.jpg';
import art3 from '../assets/madhubani.jpg';

function ArtForms() {
  const artForms = [
    {
      id: 1,
      name: 'Bharatanatyam',
      image: art1,
      origin: 'Tamil Nadu',
      type: 'Classical Dance',
      description: 'One of the oldest classical dance forms of India, originating in Tamil Nadu temples.'
    },
    {
      id: 2,
      name: 'Kathakali',
      image: art2,
      origin: 'Kerala',
      type: 'Dance-Drama',
      description: 'A classical Indian dance form with elaborate costumes and makeup depicting stories from epics.'
    },
    {
      id: 3,
      name: 'Madhubani',
      image: art3,
      origin: 'Bihar',
      type: 'Folk Painting',
      description: 'Also known as Mithila painting, characterized by eye-catching geometrical patterns.'
    }
  ];

  return (
    <div className="art-forms-container">
      <div className="art-forms-header">
        <h1>Traditional Art Forms of India</h1>
        <p>Explore the diverse artistic heritage spanning classical and folk traditions</p>
      </div>
      
      <div className="art-forms-tabs">
        <button className="active">Dance Forms</button>
        <button>Music</button>
        <button>Visual Arts</button>
        <button>Theater</button>
      </div>
      
      <div className="art-forms-grid">
        {artForms.map(art => (
          <div key={art.id} className="art-form-card">
            <div className="art-image" style={{ backgroundImage: `url(${art.image})` }} />
            <div className="art-details">
              <h3>{art.name}</h3>
              <p className="origin">{art.origin} • {art.type}</p>
              <p className="description">{art.description}</p>
              <button className="explore-button">Explore →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtForms;