import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;
  const { register, error, clearErrors, loading } = useAuth();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState('');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearErrors();
    if (validationError) setValidationError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters');
      return;
    }

    const { success } = await register({ name, email, password });
    if (success) {
      navigate('/profile');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <p>Create your account</p>
        
        {(error || validationError) && (
          <div className="alert alert-danger">
            {error || validationError}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          
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
              placeholder="Password (min 8 characters)"
              name="password"
              value={password}
              onChange={onChange}
              minLength="8"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              minLength="8"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
          <p><Link to="/">Back to home</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;