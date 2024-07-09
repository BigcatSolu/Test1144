import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './BannerCom.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminManageCategory.css'

const AdminManageCategory = () => {
  const [page, setPage] = useState(1);
  const limit = 4;
  const [category, setCategory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/category/admin', {
        params: { page: page, limit: limit },
      })
      console.log(res.data)
      setCategory(res.data.category)
      setTotalPages(Math.ceil(res.data.totalCount / limit))
    }
    fetchData()
  },[page])

  console.log(category)
  console.log(totalPages)

  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className='manage-category'>
      <div className="header">
        <div className="header-title">
        manage-category
        </div>
        <div className="header-add-button">
          <Link to='/admin/edit-category' className='link'>
          <button type="button" class="button">
                <span class="button__text">เพิ่มหมวดหมู่</span>
                <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
              </button>
          </Link>
        </div>
      </div>

      <div className="manage-category-body">


        <div className="body-header">
          <div className='category-id'>#ID</div>
          <div className='category-name'>Name</div>
          <div className='category-image'>Image</div>
          <div className='category-isDisplay'>IsDisplay</div>
        </div>

        <div className="body-content">
          {category && category.map((cate) => (
            <div className="item" key={cate.category_id}>
          <div className='category-id'> {cate.category_id} </div>
          <div className='category-name'>{cate.category_name}</div>
          <div className='category-image'>
            <img src={`/upload/${cate.category_img}`} alt="" />
          </div>
          <div className='category-isDisplay'> 
          <Link to={`/admin/edit-category/${cate.category_id}`}>
          <button className='edit-button'>แก้ไขหมวดหมู่</button>
          </Link> </div>
          </div>
          ))}
        </div>

      </div>

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <div className="circle-container">
          {[...Array(totalPages)].map((_, index) => (
            <div
              key={index}
              className={`circle ${page === index + 1 ? "active" : ""}`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default AdminManageCategory
