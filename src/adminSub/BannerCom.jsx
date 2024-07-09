import React, { useEffect, useState } from 'react';
import Delete from '../img/delete.png';
import Add from '../img/edit.png';
import axios from 'axios';
import './BannerCom.css'
import { Link, useNavigate } from 'react-router-dom';

const BannerCom = () => {
  const [page, setPage] = useState(1);
  const limit = 4;
  const [banner, setBanner] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/banners', {
          params: { page: page, limit: limit },
        });
        setBanner(res.data.banners);
        setTotalPages(Math.ceil(res.data.totalCount / limit));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, banner]);
  

  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleDelete = async (bannerId) => {
    try {
      await axios.delete(`/api/banners/${bannerId}`)
      console.log("Hi")
      navigate('/admin/banner')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="bannerCom">
      <div className="header">
        <h4>จัดการBanner</h4>
        <Link to="/admin/addbanner">
          <img src={Add} alt="" />
        </Link>
      </div>

      <div className="bannerContainer">
        <div className="bannerDetails">
          <ul>
            <li>รูปภาพ</li>
            <li>การแก้ไข</li>
          </ul>
        </div>

        {banner.length > 0 ? (
          <div className="allBannerDiv">
            {banner.map((ban) => (
              <div className="allBanner" key={ban.banner_id}>
                <ul>
                  <li className="img">
                    {ban.banner_img.endsWith(".mp4") ? (
                      <video autoPlay loop muted>
                        <source
                          src={`../upload/${ban.banner_img}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={`../upload/${ban.banner_img}`} alt="Image" />
                    )}
                    {/* <img src={`../upload/${ban.banner_img}`} alt="testing" /> */}
                  </li>

                  <li className="deleteBtn">
                    <img
                      src={Delete}
                      alt="delete"
                      onClick={() => handleDelete(ban.banner_id)}
                    />
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="div">No banners available</div>
        )}
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
  );
};

export default BannerCom;
