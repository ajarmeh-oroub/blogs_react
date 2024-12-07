import React, { useEffect, useState } from 'react'
import { getBlogs } from '../Services/Api';


export default function Blogs() {
const  [blogs , setblogs]=useState([]);
// const [user , setUser]= useState([]);

useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogs();
        setblogs(fetchedBlogs);
      } catch (err) {
        console.error("Error: ", err);
      }
    };
    fetchBlogs();
  }, []);  // Only runs once when the component mounts
  

  return (
<section className="blog-post-area section-margin">
  <div className="container">
    <div className="row">
      {/* Main content */}
      <div className="col-lg-8">
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-lg-6 col-md-6 col-sm-12 mb-4">
              <div className="single-post-wrap style-box border rounded-lg overflow-hidden shadow-lg">
                <div className="thumb">
                  <img
                    className="card-img rounded-0 img-fluid"
                    style={{
                      height: "250px",  // Adjusted height
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={`http://127.0.0.1:8000/storage/${blog.image}`}
                    alt={blog.title || "Blog Thumbnail"}
                  />
                </div>

                <div className="details p-4">
                  {/* Post Meta */}
                  <div className="post-meta-single mb-3">
                    <ul className="d-flex list-unstyled">
                      <li className="me-3">
                        <i className="fa fa-user" />
                        {blog.users
                          ? `${blog.users.first_name} ${blog.users.last_name}`
                          : "Anonymous"}
                      </li>
                      <li className="me-3">
                        <i className="fa fa-calendar" />
                        {new Date(blog.created_at).toLocaleDateString()}
                      </li>
                      <li>
                        <i className="fa fa-comments" />
                        Comments ({blog.comments ? blog.comments.length : "0"})
                      </li>
                    </ul>
                  </div>

                  {/* Title */}
                  <h5 className="title mb-3">
                    <a href="blog-details.html" style={{ color: "#2d3e50", fontWeight: "bold" }}>
                      {blog.title}
                    </a>
                  </h5>

                  {/* Excerpt */}
                  <p className="mb-3" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                    {blog.excerpt ? blog.excerpt : "Short description not available."}
                  </p>

                  {/* Learn More Button */}
                  <a className="btn btn-primary btn-sm" href="blog-details.html">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-lg-4 sidebar-widgets">
  <div
    className="widget-wrap"
    style={{
      padding: '20px',
      backgroundColor: '#ffffff', // Clean white background
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
    }}
  >
    {/* Categories Section */}
    <div
      className="single-sidebar-widget post-category-widget"
      style={{ marginBottom: '30px' }}
    >
      <h4
        className="single-sidebar-widget__title"
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#1e2229', // Dark gray for title
          borderBottom: '2px solid #007BFF', // Blue accent color
          paddingBottom: '10px',
        }}
      >
        Category
      </h4>
      <ul
        className="cat-list mt-20"
        style={{
          listStyle: 'none',
          padding: 0,
          color: '#555', // Medium gray for text
        }}
      >
        <li style={{ marginBottom: '10px' }}>
          <a
            href="#"
            className="d-flex justify-content-between"
            style={{
              textDecoration: 'none',
              color: '#1e2229', // Dark gray for links
              fontWeight: '500',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#007BFF')} // Blue hover effect
            onMouseLeave={(e) => (e.target.style.color = '#1e2229')}
          >
            <p>Technology</p>
            <p>(03)</p>
          </a>
        </li>
        {/* Add other categories here */}
      </ul>
    </div>

    {/* Popular Posts Section */}
    <div
      className="single-sidebar-widget popular-post-widget"
      style={{ marginBottom: '30px' }}
    >
      <h4
        className="single-sidebar-widget__title"
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#1e2229', // Dark gray for title
          borderBottom: '2px solid #007BFF', // Blue accent color
          paddingBottom: '10px',
        }}
      >
        Popular Posts
      </h4>
      <div className="popular-post-list">
        <p style={{ fontStyle: 'italic', color: '#888' }}>
          No popular posts available yet.
        </p>
        {/* Add popular posts dynamically here */}
      </div>
    </div>
  </div>
</div>


    </div>
  </div>
</section>


      
      )

}
