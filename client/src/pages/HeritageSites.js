import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HeritageSites.css';

function HeritageSites() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample static data of heritage sites in India (for demonstration purposes)
    const fetchSites = async () => {
      // In a real scenario, replace the URL with your actual API endpoint
      // const response = await axios.get('/api/heritage-sites');

      // Static data for demonstration
      const response = {
        data: [
          {
            _id: 'taj-mahal',
            name: 'Taj Mahal',
            location: 'Agra, Uttar Pradesh',
            description:
              'A symbol of love, the Taj Mahal is an iconic Mughal architecture located in Agra. It was built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
            image: 'https://path/to/taj-mahal-image.jpg',
          },
          {
            _id: 'qutub-minar',
            name: 'Qutub Minar',
            location: 'Delhi',
            description:
              'Qutub Minar is a 73-meter-high tower built by Qutb-ud-Din Aibak. It stands as an example of Indo-Islamic Afghan architecture and is a UNESCO World Heritage Site.',
            image: 'https://path/to/qutub-minar-image.jpg',
          },
          {
            _id: 'ajanta-caves',
            name: 'Ajanta Caves',
            location: 'Maharashtra',
            description:
              'Ajanta Caves are a complex of Buddhist rock-cut cave temples, known for their ancient murals and sculptures. They are located near the town of Ajanta in Maharashtra.',
            image: 'https://path/to/ajanta-caves-image.jpg',
          },
          {
            _id: 'red-fort',
            name: 'Red Fort',
            location: 'Delhi',
            description:
              'Red Fort is a historic fortification in the city of Delhi. It served as the main residence of the Mughal emperors for around 200 years.',
            image: 'https://path/to/red-fort-image.jpg',
          },
          {
            _id: 'gateway-of-india',
            name: 'Gateway of India',
            location: 'Mumbai, Maharashtra',
            description:
              'The Gateway of India is an arch-monument built during the 20th century in Mumbai, marking the arrival point for many important dignitaries to India.',
            image: 'https://path/to/gateway-of-india-image.jpg',
          },
          {
            _id: 'kolkata-victoria-memorial',
            name: 'Victoria Memorial',
            location: 'Kolkata, West Bengal',
            description:
              'The Victoria Memorial is an iconic marble building, built in memory of Queen Victoria, located in Kolkata. It is a symbol of British colonial architecture.',
            image: 'https://path/to/victoria-memorial-image.jpg',
          },
          {
            _id: 'hampi',
            name: 'Hampi',
            location: 'Karnataka',
            description:
              'Hampi is a UNESCO World Heritage Site known for its ancient temples, monuments, and ruins of the Vijayanagara Empire.',
            image: 'https://path/to/hampi-image.jpg',
          },
        ],
      };

      setSites(response.data);
      setLoading(false);
    };

    fetchSites();
  }, []);

  if (loading) return <div className="loading">Loading heritage sites...</div>;

  return (
    <div className="heritage-sites-container">
      <h1>Indian Heritage Sites</h1>
      <div className="sites-grid">
        {sites.map(site => (
          <div key={site._id} className="site-card">
            <div 
              className="site-image" 
              style={{ backgroundImage: `url(${site.image})` }}
            />
            <div className="site-info">
              <h3>{site.name}</h3>
              <p>{site.location}</p>
              <p className="description">{site.description.substring(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeritageSites;
