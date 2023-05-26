import React from "react";
import "./Blog.css";
const Blog = ({ Title, Content, Image }) => {
  return (
    <div className="blog">
      <h2>{Title}</h2>
      {Image && <img src={Image} alt={Title} />}
      <p>{Content}</p>
    </div>
  );
};
export default Blog;