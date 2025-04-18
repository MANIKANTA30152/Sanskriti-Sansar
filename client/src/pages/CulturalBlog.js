// client/src/pages/CulturalBlog.js
import React from 'react';
import './CulturalBlog.css';

const blogPosts = [
  {
    id: 1,
    title: 'Preserving India’s Living Traditions',
    summary:
      'Explore the ongoing efforts to safeguard age-old Indian traditions in a rapidly modernizing world.',
    image: '/assets/culture1.jpg',
    date: 'April 15, 2025',
  },
  {
    id: 2,
    title: 'The Art of Kathakali: Colors of Kerala',
    summary:
      'Dive into the mesmerizing world of Kathakali, a classical dance-drama originating from Kerala.',
    image: '/assets/kathakali.jpg',
    date: 'April 10, 2025',
  },
  {
    id: 3,
    title: 'Handloom Heritage of India',
    summary:
      'From Banarasi to Kanjeevaram, India’s handloom legacy weaves stories in threads and dyes.',
    image: '/assets/handloom.jpg',
    date: 'March 30, 2025',
  },
];

function CulturalBlog() {
  return (
    <div className="blog-container">
      <h1 className="blog-title">Cultural Blog</h1>
      <p className="blog-intro">
        Stories that highlight the essence of Indian heritage, traditions, and creativity.
      </p>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <div
              className="blog-image"
              style={{ backgroundImage: `url(${post.image})` }}
            />
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p className="blog-date">{post.date}</p>
              <p>{post.summary}</p>
              <a href="#" className="read-more">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CulturalBlog;
