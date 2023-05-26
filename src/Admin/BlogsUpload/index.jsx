import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BlogUpload.css";
import AdminNavbar from "../adminNavbar";

const BlogUpload = () => {
    const [Blogs, setBlogs] = useState([]);
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Image, setImage] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:4000/Blog");
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching Blogs:", error);
        }
    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleBlogSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("Image", Image);
        formData.append("Title", Title);
        formData.append("Content", Content);

        try {
            if (selectedBlog) {
                // Update existing blog
                await axios.put(`http://127.0.0.1:4000/Blog/${selectedBlog._id}`, formData);
            } else {
                // Create new blog
                await axios.post("http://127.0.0.1:4000/Blog", formData);
            }

            fetchBlogs();
            resetForm();
        } catch (error) {
            console.error("Error submitting blog:", error);
        }
    };

    const handleBlogEdit = (blog) => {
        setSelectedBlog(blog);
        setTitle(blog.Title);
        setContent(blog.Content);
    };

    const handleBlogDelete = async (blog) => {
        try {
            await axios.delete(`http://127.0.0.1:4000/Blog/${blog._id}`);
            fetchBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setImage(null);
        setSelectedBlog(null);
    };

    return (
        <div>
         <AdminNavbar/>
            {/* Blog form */}
            <form onSubmit={handleBlogSubmit}>
                <h2>{selectedBlog ? "Update Blog" : "Create Blog"}</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={Title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <textarea
                    placeholder="Content"
                    value={Content}
                    onChange={(event) => setContent(event.target.value)}
                />
                <input type="file" accept="Image/*" onChange={handleFileChange} />
                <button type="submit">{selectedBlog ? "Update" : "Create"}</button>
            </form>

            {/* Blog list */}
            <div className="blog-list">
                {Blogs.map((blog) => (
                    <div className="blog-item" key={blog._id}>
                        <div>
                            <h3>Title: {blog.Title}</h3>
                            <p>Content: {blog.Content}</p>
                            <img
                                className='srcimg'
                                src={`http://localhost:4000/uploads/${blog.Image}`}
                                alt='img'
                            />
                        </div>
                        <div className="blog-actions">
                            <button
                                className="edit-button"
                                onClick={() => handleBlogEdit(blog)}>
                                Edit
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleBlogDelete(blog)} >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default BlogUpload;