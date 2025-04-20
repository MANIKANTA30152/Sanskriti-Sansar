import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CulturalBlog.css';

const blogPosts = [
  {
    id: 1,
    title: "The Rich Heritage of Indian Classical Dance Forms",
    author: "Priya Sharma",
    date: "May 15, 2023",
    excerpt: "Explore the eight classical dance forms of India...",
    content: `
      <p>Indian classical dance is a rich tradition that dates back thousands of years. The eight classical dance forms recognized by the Sangeet Natak Akademi are:</p>
      
      <h3>Bharatanatyam (Tamil Nadu)</h3>
      <p>Originating in Tamil Nadu, this dance form is known for its fixed upper torso, bent legs, and elaborate hand gestures.</p>
      
      <h3>Kathak (North India)</h3>
      <p>Kathak evolved during the Bhakti movement and was later influenced by Persian dance forms during the Mughal era.</p>
      
      <!-- More detailed content -->
    `,
    imageUrl: "https://source.unsplash.com/random/800x400/?bharatanatyam",
    category: "Dance"
  },
  // Include all other blog posts with full content
];

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === parseInt(id));
    setPost(foundPost);
  }, [id]);

  if (!post) return <div className="blog-post-loading">Loading...</div>;

  return (
    <div className="blog-post-container">
      <div className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span>By {post.author}</span>
          <span>{post.date}</span>
          <span className="blog-post-category">{post.category}</span>
        </div>
      </div>

      <div className="blog-post-image">
        <img src={post.imageUrl} alt={post.title} />
      </div>

      <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="blog-post-footer">
        <Link to="/blog" className="back-to-blog-btn">
          ← Back to Blog
        </Link>
        <div className="social-sharing">
          <span>Share this post:</span>
          {/* Add social sharing buttons here */}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;