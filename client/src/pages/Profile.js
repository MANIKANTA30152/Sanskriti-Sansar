import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('/api/users/favorites');
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view your profile</div>;
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
        {loading ? (
          <div>Loading favorites...</div>
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
          <div>
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