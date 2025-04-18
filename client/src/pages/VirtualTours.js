import { useState, useEffect } from 'react';
import axios from 'axios';
import VirtualTourScene from '../components/VirtualTour';
import Loader from '../components/Loader';
import './VirtualTours.css';

function VirtualTours() {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await axios.get('/api/heritage-sites');
        setSites(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="virtual-tours-container">
      <div className="sites-list-container">
        <h1 className="section-title">Explore Indian Heritage</h1>
        <div className="sites-grid">
          {sites.map(site => (
            <div 
              key={site._id} 
              className={`site-card ${selectedSite?._id === site._id ? 'active' : ''}`}
              onClick={() => setSelectedSite(site)}
            >
              <div className="site-image" style={{ backgroundImage: `url(${site.image})` }} />
              <div className="site-info">
                <h3>{site.name}</h3>
                <p>{site.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="tour-viewer-container">
        {selectedSite ? (
          <>
            <div className="tour-header">
              <h2>{selectedSite.name}</h2>
              <p className="location">{selectedSite.location}</p>
              <p className="description">{selectedSite.description}</p>
            </div>
            <div className="canvas-wrapper">
              <VirtualTourScene modelUrl={selectedSite.virtualTour} />
            </div>
          </>
        ) : (
          <div className="placeholder">
            <h3>Select a heritage site to begin virtual tour</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default VirtualTours;