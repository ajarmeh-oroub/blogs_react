import axios from 'axios';

const Api_base_url = 'http://127.0.0.1:8000/api/';

// Get the specified user data
export const getUserData = async () => {
  try {
    const response = await axios.get(`${Api_base_url}user/1/show`);
    return response.data;
  } catch (error) {
    console.error("Error:", error); 
    return null; 
  }
};

//user data update

export const updateUserData = async (userData) => {
  try {
    const response = await axios.put(`${Api_base_url}user/1`, userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null; 
  }
};
//user create blog
export const createBlog = async (BlogDetails) => {
  try {
    const userId = 1;
    if (userId) {
      BlogDetails.append("user_Id", userId);
    } else {
      throw new Error("User ID is missing.");
    }


    const response = await axios.post(`${Api_base_url}blog/store`, BlogDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error: ", error.response ? error.response.data : error.message);
    return null;
  }
};

//user update blog

export const updateBlog = async (id, formData) => {
  try {
    const response = await axios.put(`${Api_base_url}blog/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log('Response:', response.data);
    return response.data; // Returning the response data to be used in the calling function
  } catch (e) {
    // Handling different error types
    if (e.response) {
      // Server responded with a status other than 2xx
      console.error('Error occurred:', e.response.data);
      return { error: e.response.data };
    } else if (e.request) {
      // No response was received
      console.error('No response received:', e.request);
      return { error: 'No response from server' };
    } else {
      // General errors (e.g., malformed request)
      console.error('Error occurred:', e.message);
      return { error: e.message };
    }
  }
};






//get categories for the blog //can be used in the blog details page and the favorite page 
export const getCatigories = async()=>{
  try{
    const response= await axios.get(`${Api_base_url}categories`);
    return response.data

  }catch(error){
console.error("Error:" , error)
return null;
  }
}


//get the blogs that a specific user has created 
export const getBlogsUser =async(formData)=>{
  try{
const response= await axios.get(`${Api_base_url}blogUser/1` ,formData )
return response.data
  }catch(error){
    console.log("Error:" , error)
    return null;
  }
}

//delete a specific blog 
export const deleteblog = async(id)=>{
try{
  const response= await axios.delete(`${Api_base_url}blog/${id}/delete`)
  return response.data
}catch(error){
  console.log("Error:" , error)
  return null;
}
} 


//get all blogs 
export const getBlogs =async()=>{
  try{
    const response= await axios.get(`${Api_base_url}blog`)
    return response.data
  }catch(error){
    console.log("Error:" , error)
    return null;
  }
}

export default {
  getUserData,
  updateUserData,
  createBlog,
  getCatigories,
  updateBlog,
  deleteblog
};


