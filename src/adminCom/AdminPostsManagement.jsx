import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import PostsWrapper from '../components/PostWrapper';
import { Link } from "react-router-dom";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import './AdminPostsManagement.css'

function AdminPostsManagement() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState("");
  const animatedComponents = makeAnimated();


  const fetchData = async () => {
    const res = await axios.get(`/api/posts/manage`);
    setPosts(res.data);
    setFilteredPosts(res.data); // Initially display all posts
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectPost = (selectedOption) => {
    const selectedPostId = selectedOption ? selectedOption.value : null;
    setSelectedPost(selectedPostId);
    const selectedPost = posts.find(post => post.id === parseInt(selectedPostId));
    if (selectedPost) {
      setFilteredPosts([selectedPost]); // Display only the selected post
    } else {
      setFilteredPosts(posts); // Display all posts if no selection
    }
  };

  const options = posts.map(item => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <div className="adminLayout">
      <Sidebar />
      <div className="mainContent">
        <div className="posts-management">
          <div className="posts-header">
            <div className="header-name">
              <Select
                className="selection"
                value={options.find(option => option.value === selectedPost)}
                onChange={handleSelectPost}
                components={animatedComponents}
                options={options}
                closeMenuOnSelect={true}
                name={selectedPost}
                isClearable={true} 
                placeholder="Select a post"
              />
            </div>
            <Link to='/admin/products' className="link add-Btn">
                <button type="button" class="button">
                <span class="button__text">เพิ่มสินค้า</span>
                <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
              </button>
              {/* <div className="add-product">เพิ่มสินค้า</div> */}
            </Link>
          </div>
          <PostsWrapper posts={filteredPosts} />
        </div>
      </div>
    </div>
  );
}

export default AdminPostsManagement;
