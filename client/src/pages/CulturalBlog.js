import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import './CulturalBlog.css';

const CulturalBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const postsPerPage = 6;
  const categories = [
    'All', 'Festivals', 'Heritage', 'Art', 'Cuisine', 
    'Dance', 'Music', 'Architecture', 'Traditions', 'Literature'
  ];

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

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loader />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="culture-blog-container">
      <div className="blog-header">
        <h1>Sanskriti Sansar: Cultural Chronicles</h1>
        <p>Exploring the rich tapestry of traditions, arts, and heritage</p>
        
        <div className="blog-controls">
          <input
            type="text"
            placeholder="Search posts..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          
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
      </div>

      <div className="blog-filters">
        <div className="blog-categories">
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
      </div>

      <div className="blog-posts">
        {currentPosts.length > 0 ? (
          currentPosts.map(post => (
            <div className="blog-card" key={post._id} onClick={() => navigate(`/blog/${post._id}`)}>
              <div className="blog-image">
                <img 
                  src={post.imageUrl || '/default-blog.jpg'} 
                  alt={post.title} 
                  onError={(e) => {
                    e.target.src = '/default-blog.jpg';
                  }}
                />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-content">
                <h2>{post.title}</h2>
                <div className="blog-meta">
                  <span>By {post.author?.name || 'Anonymous'}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="blog-excerpt">
                  {post.excerpt || post.content.substring(0, 150) + '...'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-posts">
            <p>No posts found matching your criteria.</p>
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
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            &laquo; Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                className={currentPage === pageNum ? 'active' : ''}
                onClick={() => paginate(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button 
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default CulturalBlog;