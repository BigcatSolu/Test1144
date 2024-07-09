import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {

    const [banners, setBanners] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/banners/get")
                setBanners(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

    const [img , setImg] = useState([])
    console.log(banners)
    const [notice, setNotice] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get('/api/notice')
        console.log(res)
        setNotice(res.data)
      }
      fetchData()
    },[])


  return (
    <div>
      <div className="title">
        <div className="promoTitle">
          <h3>โปรโมชั่นและข่าวสาร</h3>
          <h5>Promotion & News</h5>
        </div>
      </div>

      <div className="banner image-slider">
        <div className="noticeBanner">
          <div className="notice">
            <div className="noticeControl">
              <div className="title">
                <h5>ประกาศจากทางร้าน</h5>
              </div>

            {notice.length > 0 ? (

              <div className="contentContainer">
                <div className="content">
                  <p>
                    {notice[0].notice_message}
                  </p>
                </div>
              </div>
              ) : (
                <div className="contentContainer">
                <div className="content">
                  <p>
                    ขณะนี้ยังไม่มีประกาศจากทางร้าน
                  </p>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>

        <div className="bannerImage">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper img"
          >
            {banners.length > 0 &&
              banners.map((banner) => (
                <SwiperSlide key={banner.banner_id}>
                  <img src={`../upload/${banner.banner_img}`} alt="" />
                </SwiperSlide>
              ))}
          </Swiper>
          {/* <div className="img">
            <img src='' alt="860*320" />
          </div> */}

          <div className="sell">
            <img src="" alt="" />
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}

export default Banner
