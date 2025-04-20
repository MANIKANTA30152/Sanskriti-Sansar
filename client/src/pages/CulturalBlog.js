import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct import
import './CulturalBlog.css';

const CulturalBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser } = useAuth();
  
  const postsPerPage = 6;
  const categories = ['All', 'Dance', 'Music', 'Festivals', 'Cuisine', 'Architecture', 'Traditions', 'Art', 'Literature'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loading">Loading cultural posts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="culture-blog-container">
      <div className="blog-header">
        <h1>Sanskriti Sansar: Cultural Chronicles</h1>
        <p>Exploring the rich tapestry of traditions, arts, and heritage</p>
        {currentUser && (
          <div className="blog-actions">
            <Link to="/blog/create" className="create-post-btn">
              Share Your Cultural Story
            </Link>
            <Link to="/blog/my-posts" className="my-posts-btn">
              My Posts
            </Link>
          </div>
        )}
      </div>

      <div className="blog-categories">
        <span>Categories: </span>
        {categories.map(category => (
          <button 
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(category);
              setCurrentPage(1);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="blog-posts">
        {currentPosts.length > 0 ? (
          currentPosts.map(post => (
            <div className="blog-card" key={post._id}>
              <div className="blog-image">
                <img 
                  src={post.imageUrl || 'https://source.unsplash.com/random/600x400/?culture'} 
                  alt={post.title} 
                />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-content">
                <h2>{post.title}</h2>
                <div className="blog-meta">
                  <span className="blog-author">
                    By {post.author?.name || 'Anonymous'}
                  </span>
                  <span className="blog-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="blog-excerpt">
                  {post.excerpt || post.content.substring(0, 150) + '...'}
                </p>
                <Link to={`/blog/${post._id}`} className="read-more-btn">
                  Read More →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-posts">
            <p>No posts found in this category.</p>
            {currentUser && (
              <Link to="/blog/create" className="create-post-btn">
                Be the first to share in this category
              </Link>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="blog-pagination">
          <button 
            className="pagination-btn" 
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          
          <button 
            className="pagination-btn" 
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CulturalBlog;