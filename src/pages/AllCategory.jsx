import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const AllCategory = () => {
  const [item, setItem] = useState([]);
  const animatedComponents = makeAnimated();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const view = await axios.get(`/api/posts/allcategory`);
        setItem(view.data);
        setFilteredCategories(view.data); // Initially display all categories
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSelectPost = (selectedOption) => {
    setSelectedPost(selectedOption);
    if (selectedOption) {
      const selectedCategory = item.find(cat => cat.id === selectedOption.value);
      setFilteredCategories(selectedCategory ? [selectedCategory] : []);
    } else {
      setFilteredCategories(item); // Display all categories if no selection
    }
  };

  const options = item.map(item => ({
    value: item.id,
    label: item.title,
  }));

  return (

    <div className="category">

      <div className="header-container">
        <div className="title">
          <div className="promoTitle">
            <h3>สินค้าทั้งหมด</h3>
            <h5>Goods Recommended</h5>
          </div>
        </div>
        <div className="searchBar">
          <Select
            className="selection"
            value={selectedPost}
            onChange={handleSelectPost}
            components={animatedComponents}
            options={options}
            closeMenuOnSelect={true}
            isClearable={true}
            placeholder="Select a category"
          />
        </div>
      </div>

      <div className="container">
        {filteredCategories.length > 0 && filteredCategories.map((post) => (
          <div
            className="card btn-modal"
            key={post.id}
            onClick={() => toggleModal(post)}
          >
            <div className="container">
              <div className="img">
                {post.file_type === "video" ? (
                  <video autoPlay loop muted>
                    <source src={`../upload/${post.img}`} type="video/mp4" />
                  </video>
                ) : (
                  <img src={`../upload/${post.img}`} alt="" />
                )}
              </div>
              <div className="mainContent">
                <div className="content">
                  <div className="contentHeader">
                    <h5>{post.title}</h5>
                  </div>
                  <div className="priceInfo">
                    {post && post.type === "id-code" ? (
                      <div className="remaining">
                        เหลือ : {post.boxpass_count} ชิ้น
                      </div>
                    ) : (
                      <div className="remaining">
                        ราคาเริ่มต้น
                      </div>
                    )}
                    <div className="price"> {post.price} ฿</div>
                  </div>
                </div>
                <Link
                  to={`/order/${post.id}`}
                  className="link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bBtn">สั่งซื้อตอนนี้เลย</div>
                </Link>
                {post.type === 'id' || post.type === 'code' ? (
                  <div className="id-code">สินค้าจำนวน {post.boxpass_count} ชิ้น</div>
                ) : (
                  <div className="order-preorder">สินค้าประเภทออเดอร์</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
