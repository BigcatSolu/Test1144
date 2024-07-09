import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const AllCate = () => {
  const [category, setCategory] = useState([]);
  const boxRef = useRef([]);
  const animatedComponents = makeAnimated();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const checkBoxes = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    boxRef.current.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        box.classList.add('show');
      } else {
        box.classList.remove('show');
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkBoxes);
    checkBoxes(); // Initial check
    return () => window.removeEventListener('scroll', checkBoxes);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`api/category`);
        console.log(res);
        setCategory(res.data);
        setFilteredCategories(res.data); // Initially display all categories
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSelectPost = (selectedOption) => {
    setSelectedPost(selectedOption);
    if (selectedOption) {
      const selectedCategory = category.find(cat => cat.category_id === selectedOption.value);
      setFilteredCategories(selectedCategory ? [selectedCategory] : []);
    } else {
      setFilteredCategories(category); // Display all categories if no selection
    }
  };

  const options = category.map(item => ({
    value: item.category_id,
    label: item.category_name,
  }));

  return (
    <div className='allCate'>

      <div className="header-container">
        <div className="title">
          <div className="promoTitle">
            <h3>หมวดหมู่แนะนำ</h3>
            <h5>Category Recommended</h5>
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
      
      <div className="category">
        {filteredCategories.map((cat, index) => (
          <div className="item box" key={cat.category_id} ref={(el) => (boxRef.current[index] = el)}>
            <Link to={`/category?cate=${cat.category_id}&name=${encodeURIComponent(cat.category_name)}`} className="link">
              <div className="anim">
                <div className="img">
                  <img
                    src={`../upload/${cat.category_img}`}
                    alt="640*240"
                  />
                </div>
                <div className="text">{cat.category_name}</div>
              </div>
            </Link>
          </div>
        ))}

        
      </div>
    </div>
  );
};

export default AllCate;
