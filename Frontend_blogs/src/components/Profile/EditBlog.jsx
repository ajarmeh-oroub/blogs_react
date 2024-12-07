import { useState, useEffect } from "react";
import { getCatigories, updateBlog } from "../../Services/Api";

export default function EditBlog({ setIsBlogEdit, selectedBlog }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [blogDetails, setBlogDetails] = useState({
    id: selectedBlog?.id || "",
    title: selectedBlog?.title || "",
    article: selectedBlog?.article || "",
    category_id: selectedBlog?.category_id || "",
    image: selectedBlog?.image || "",
  });

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

  const handleFileChange = (files) => {
    if (files && files[0]) {
      const file = files[0];
      setBlogDetails((prev) => ({
        ...prev,
        image: file,
      }));

      // Optional: Preview image before uploading
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target.result;
        document.getElementById("imagePreview").src = preview;
      };
      reader.readAsDataURL(file);
    }
  };

  const appendToFormData = (formData, data) => {
    Object.keys(data).forEach((key) => {
      // If 'image' is a File object, append the file to FormData
      if (key === "image" && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (key === "image" && typeof data[key] === "string") {
        // If 'image' is a string (image path), append it as a string
        formData.append(key, data[key]);
      } else if (key !== "image") {
        // For all other fields, append them as usual
        formData.append(key, data[key]);
      }
    });
  };
  

  const handelEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    appendToFormData(formData, blogDetails);  // Prepare the form data
    
    try {
      const response = await updateBlog(blogDetails.id, formData); // Make sure the API expects FormData
      if (response) {
        setIsBlogEdit(false);
        setSuccess("Updated successfully");
        setError(null);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSuccess(null);
    }
  };
  

  return (
    <div className="container py-5">
      <div className="col-md-10 mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          {/* Form to edit a blog */}
          <div className="px-4 py-3">
            <h5 className="mb-4">Edit Blog</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form encType="multipart/form-data" onSubmit={handelEdit}>
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

              {/* Image Upload */}
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  onChange={(e) => handleFileChange(e.target.files)}
                />
                {blogDetails.image && (
                  <div className="mt-2">
                    <img
                      id="imagePreview"
                      src={`http://127.0.0.1:8000/storage/${blogDetails.image}`} // Display existing image if available
                      alt="Blog"
                      className="img-thumbnail"
                      style={{ maxWidth: "200px", height: "auto" }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Update Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
