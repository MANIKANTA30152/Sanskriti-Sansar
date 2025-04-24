import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('/api/v1/users/favorites');
        setFavorites(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load favorites');
        console.error('Failed to fetch favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      navigate('/login');
    } else {
      fetchFavorites();
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Welcome, {user.name}</h1>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="profile-section">
        <h2>Your Information</h2>
        <div className="info-item">
          <span>Name:</span> {user.name}
        </div>
        <div className="info-item">
          <span>Email:</span> {user.email}
        </div>
        <div className="info-item">
          <span>Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="profile-section">
        <h2>Your Favorites</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map((site) => (
              <Link to={`/heritage-sites/${site._id}`} key={site._id} className="favorite-item">
                <div className="favorite-image" style={{ backgroundImage: `url(${site.image})` }} />
                <h3>{site.name}</h3>
                <p>{site.location}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            <p>You haven't added any favorites yet.</p>
            <Link to="/heritage-sites" className="explore-link">
              Explore Heritage Sites
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;