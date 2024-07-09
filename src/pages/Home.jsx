import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useHref, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import Banner from '../home/Banner';
import MainCategory from '../home/MainCategory';
import Recomment from '../home/Recomment';
import Lucky from '../home/Lucky';
import useIntersectionObserver from '../hook/UseIntersectionObserver';
import './Home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../home/Banner.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react'
import './animation.css'
import Lenis from 'lenis';
import { IoCalendarOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import PosterModal from '../poster/PosterModal'; // Import the PosterModal component

const Home = () => {

  gsap.registerPlugin(ScrollTrigger)

  const sections = ['box1', 'box2', 'box3']; // Ensure these class names match your elements
  const [showPoster, setShowPoster] = useState(() => {
    // Initialize state based on local storage
    return !localStorage.getItem('hasSeenPoster');
  });

  useEffect(() => {
    if (showPoster) {
      localStorage.setItem('hasSeenPoster', 'true');
    }
  }, [showPoster]);

  const [banners, setBanners] = useState([])

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  },[])

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

      const hasSeenPoster = localStorage.getItem('hasSeenPoster');
      if (!hasSeenPoster) {
        setShowPoster(true);
        localStorage.setItem('hasSeenPoster', 'true');
      }
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

  const [category, setCategory] = useState([])

  // const { currentUser } = useContext(AuthContext)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // const res = await axios.get(`api/posts${cate}`)
          // setPosts(res.data)
          const res = await axios.get(`api/category`)
          setCategory(res.data)
        }catch(err) {
          console.log(err)
        }
      }
      fetchData()
    },[])
  
    console.log(category)

    // announce
    const [announce, setAnnounce] = useState([])

    useEffect(() => {
      const fetchdata = async () => {
        const res = await axios.get('/api/announce')
        console.log("Announce is:", res.data)
        setAnnounce(res.data)
      }
      fetchdata()
    },[])

    const [recomment, setRecomment] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get('/api/recomments/getrecomments')
        
        setRecomment(res.data)
      }
      fetchData()
    },[])

    console.log("RECOMMENTS IS:", recomment)

    // scrolling 

    const boxRef = useRef([]);
    const boxRef1 = useRef([])
    console.log(boxRef)

    const checkBoxes = () => {
      const triggerBottom = window.innerHeight / 5 * 4;
      boxRef.current.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          box.classList.add('show');
        } else {
          // box.classList.remove('show');
        }
      });
    };

    const checkBoxes1 = () => {
      const triggerBottom = window.innerHeight / 5 * 4;
      boxRef1.current.forEach((box) => {
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
      window.addEventListener('scroll', checkBoxes1);
      checkBoxes1(); // Initial check
      return () => window.removeEventListener('scroll', checkBoxes1);
    }, []);


  return (
    <div className="home">
      <div className="container">
      {showPoster && <PosterModal onClose={() => setShowPoster(false)} />}
        {/* start banner */}

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
                        <p>{notice[0].notice_message}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="contentContainer">
                      <div className="content">
                        <p>ขณะนี้ยังไม่มีประกาศจากทางร้าน</p>
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
                // loop={true}
                loopAdditionalSlides={1}
                // centeredSlides={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                }}
                // navigation={true}
                
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper img"
              >
                {banners.length > 0 &&
                  banners.map((banner) => (
                    <SwiperSlide key={banner.banner_id}>
                      {banner.type === "image" ? (
                        <img src={`/upload/${banner.banner_img}`} alt="" />
                      ) : (
                        // null
                        <video autoPlay loop muted>
                          <source
                            src={`../upload/${banner.banner_img}`}
                            type="video/mp4"
                          />
                        </video>
                      )}
                    </SwiperSlide>
                  ))}
              </Swiper>

              <div className="sell-wrapper">
              <div className="sell-header">
                  <div className="sell-header-eng">
                  Public relations / various announcements
                  </div>
                  <div className="sell-header-thai">
                  ประชาสัมพันธ์ / ประกาศต่างๆ
                  </div>
                  </div>

              <div className='consult'></div> 

              <div className="sell">
                 
                
                {announce &&
                  announce.map((announce) => (
                    <div className="sellCard" key={announce.announce_id}>
                      <div className="sellDiv">
                      <div className="sellImg">
                        <img
                          src={`/profiles/${announce.announce_user_img}`}
                          alt=""
                        />
                      </div>
                      </div>

                      <div className="sellContent">
                        <div className="userSellTitle">
                          <h4> {announce.announce_username} </h4>
                          <p className="date"> <IoCalendarOutline />
                            {" "}
                            {new Date(
                              announce.announce_date
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}{" "}
                          </p>
                          <p className="time"><MdAccessTime /> เวลา : {announce.announce_time} </p>
                        </div>
                        <div className="userSellContent">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: announce.announce_content,
                            }}
                          />
                          {/* {announce.announce_content} */}

                          <br />

                          <div className="imgForSell">
                            <img
                              src={`/upload/${announce.announce_content_img}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>

        {/* จบหมวดหมู่ Banner */}
        {/* เริ่มหมวดหมู่ Category */}

        <div className=''>
          <div className="title">
            <div className="promoTitle">
              <h3>หมวดหมู่แนะนำ</h3>
              <h5>Category Recommended</h5>
            </div>
          </div>

          <div className="category">
            {category.map((cat, index) => (
              <div className="item box" key={cat.category_id} ref={(el) => (boxRef.current[index] = el)}>

                <Link to={`/category?cate=${cat.category_id}&name=${encodeURIComponent(cat.category_name)}`} className="link">
                  <div className="anim">
                    {/* <div className="bg"></div> */}
                    <div className="img">
                      <img
                        src={`../upload/${cat.category_img}`}
                        alt="640*240"
                      />
                    </div>
                    <div className="text">
                    <div className="textContent">{cat.category_name}</div>
                    </div>
                  </div>
                </Link>
              </div>
              
            ))}
            {/* here */}

        <div className="item" ref={(el) => {
                boxRef.current[category.length] = el;
                boxRef.current = boxRef.current.filter(Boolean); // Remove null entries
              }}>
        <Link className='link' to='/allcategory'>
          <div className="anim">
            <div className="img">
              <img src="/upload/111.png" alt="" />
            </div>
            <div className="text">
              <div className="textContent">
              All Categories
              </div>
              </div>
          </div>
        </Link>
      </div>

          </div>
        </div>

        {/* จบหมวดหมู่ Category */}
        {/* เริ่มหมวดหมู่ สินค้าแนะนำ */}

        <div>
          <div className="title">
            <div className="promoTitle">
              <h3>สินค้าแนะนำ</h3>
              <h5>Product Recommended</h5>
            </div>
          </div>

          <div className="lucky" >
            {recomment && recomment.map((re, index) => (

            <div
            className="card"
            key={re.id}
            // ref={(el) => (boxRef.current[category.length + index] = el)}
            // onClick={() => toggleModal(re)}
            >
            <div className="container">
              <div className="img">
                {re.file_type === "video" ? (
                  <video autoPlay loop muted>
                  <source
                    src={`../upload/${re.img}`}
                    type="video/mp4"
                  />
                </video>
                ) : (
                  <img src={`../upload/${re.img}`} alt="" />
                )}
              </div>

              <div className="mainContent">
                <div className="content">
                  <div className="contentHeader">
                  <h5>{re.title}</h5>
                  </div>

                  <div className="priceInfo">
                    {recomment && re.type === 'id' || re.type === 'code' ? (
                      <div className="remaining">
                      เหลือ : {re.boxpass_remain} ชิ้น
                    </div>
                    ) : (
                      <div className="remaining">
                      ราคาเริ่มต้น
                    </div>
                    )}
                    <div className="priceing">
                    <div className="price"> {re.price} ฿</div>
                    </div>
                  </div>

                  <div className="old-price-wrap">
                  <div className="old-price normal">
                  {re.old_price} ฿ </div>
                  </div>
                </div>

                <Link
                  to={`/order/${re.id}`}
                  className="link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bBtn">สั่งซื้อตอนนี้เลย</div>
                </Link>
                {re.type === 'id' || re.type === 'code' ? (
                  <div className="id-code">สินค้าจำนวน {re.boxpass_remain} ชิ้น</div>
                ) : (
                  <div className="order-preorder">สินค้าประเภทออเดอร์</div>
                )}
                
              </div>
              
            </div>
            </div>
            ))}
          </div>
        </div>

        {/* จบหมวดหมู่สินค้าแนะนำ */}

        {/* เริ่มหมวดหมู่ Lucky */}

        <div className=''>
          <div className="title">
            <div className="promoTitle">
              <h3>เกมสุ่มรางวัล</h3>
              <h5>Lucky Game</h5>
            </div>
          </div>

          <div className="lucky">
            <div className="item">
              <div className="img">
                <img src="" alt="320*320" />
              </div>
              <div className="text">
                <h4>วงล้อวัดดวง!</h4>
                <div className="priceBtn">
                  <p>
                    ราคา: <span className="price">1.00 ฿</span>
                  </p>
                  <button className="pBtn">เล่นเลย</button>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="img">
                <img src="" alt="320*320" />
              </div>
              <div className="text">
                <h4>วงล้อวัดดวง!</h4>
                <div className="priceBtn">
                  <p>
                    ราคา: <span className="price">1.00 ฿</span>
                  </p>
                  <button className="pBtn">เล่นเลย</button>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="img">
                <img src="" alt="320*320" />
              </div>
              <div className="text">
                <h4>วงล้อวัดดวง!</h4>
                <div className="priceBtn">
                  <p>
                    ราคา: <span className="price">1.00 ฿</span>
                  </p>
                  <button className="pBtn">เล่นเลย</button>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="img">
                <img src="" alt="320*320" />
              </div>
              <div className="text">
                <h4>วงล้อวัดดวง!</h4>
                <div className="priceBtn">
                  <p>
                    ราคา: <span className="price">1.00 ฿</span>
                  </p>
                  <button className="pBtn">เล่นเลย</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* จบหมวดหมู่ Lucky */}
      </div>
    </div>
  );
}

export default Home
