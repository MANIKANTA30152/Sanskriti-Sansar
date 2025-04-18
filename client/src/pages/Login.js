// Login.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const { login, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { success } = await login({ email, password });
    if (success) {
      navigate('/profile');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign In</h1>
        <p>Sign into your account</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        <p className="auth-footer">
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;