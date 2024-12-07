import { useState, useEffect } from "react";
import { getCatigories, createBlog } from "../../Services/Api";

export default function ProfileCreateBlog({ setIsCreatingBlog }) {
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    article: "",
    category_id: "",
    image: "", // Store image URL
    short_description: "", // New field for short description
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCatigories();
        setCategories(categories);
        setError(null);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Cannot fetch categories.");
        setSuccess(null);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("title", blogDetails.title);
      formData.append("article", blogDetails.article);
      formData.append("category_id", blogDetails.category_id);
      formData.append("short_description", blogDetails.short_description); // Add short_description to the form data
      
      // Append image URL if available
      if (blogDetails.image) {
        formData.append("image", blogDetails.image); // Send the URL of the image
      }

      const response = await createBlog(formData); 
      if (response) {
        setSuccess("Blog created successfully.");
        setError(null);
        setIsCreatingBlog(false);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("Error saving the blog. Please check your input.");
      setSuccess(null);
    }
  };

  return (
    <div className="container py-5">
      <div className="col-md-10 mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          {/* Form to create a blog */}
          <div className="px-4 py-3">
            <h5 className="mb-4">Create Blog</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              {/* Title */}
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={blogDetails.title} // Pre-filled value
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Article Content */}
              <div className="form-group">
                <label htmlFor="article">Article</label>
                <textarea
                  id="article"
                  name="article"
                  className="form-control"
                  value={blogDetails.article} // Pre-filled value
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Short Description */}
              <div className="form-group">
                <label htmlFor="short_description">Short Description</label>
                <textarea
                  id="short_description"
                  name="short_description"
                  className="form-control"
                  value={blogDetails.short_description} // Pre-filled value
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="category_id">Category</label>
                <select
                  id="category_id"
                  name="category_id"
                  className="form-control"
                  value={blogDetails.category_id} // Pre-filled value
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL Input */}
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="form-control"
                  value={blogDetails.image} // Pre-filled value
                  onChange={handleInputChange} // Handle URL input change
                  placeholder="Enter image URL"
                />
                {blogDetails.image && (
                  <div className="mt-2">
                    <img
                      src={blogDetails.image} // Display image preview from URL
                      alt="Blog"
                      className="img-thumbnail"
                      style={{ maxWidth: "200px", height: "auto" }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Create Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
