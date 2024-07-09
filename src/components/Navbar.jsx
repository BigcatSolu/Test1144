import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Flag from '/assets/flag.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
import { PiTriangleFill } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
const Navbar = () => {

  // const [openProfile, setOpenProfile] = useState(false)
  const [openProfile, setOpenProfile] = useState(false);

  const { currentUser, logout } = useContext(AuthContext) 
  const [showMenu, setShowMenu] = useState(false);

  const toggleProfile = () => {
    setOpenProfile((prevState) => !prevState); // Toggle the state
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    setOpenProfile(false);
  };

  useEffect(() => {
    let handler = () => {
      setShowMenu(false);
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("scroll", handler);
    document.addEventListener("mouseenter", handler);
  });

  return (
    <>
      <div className="navbar">
        <div className="container">
          {/* start logo && menu */}

          <div className="logoMenu">
            {/* logo */}
            <Link to="/">
              <div className="logo">
                <img src="/profiles/7.jpg" alt="WebsiteLogo" />
              </div>
            </Link>
            {/* menu */}
            <div className="menu links">
              <Link className="link" to="/">
                <h6>หน้าหลัก</h6>
              </Link>
              <Link className="link" to="/catechoice">
                <h6>สินค้าทั้งหมด</h6>
              </Link>
              <Link className="link" to="/topup">
                <h6>เติมเงิน</h6>
              </Link>
              <Link className="link" to="/orderhistory">
                <h6>ประวัติการสั่งซื้อ</h6>
              </Link>
              <Link className="link" to="/faq">
                <h6>อื่นๆ</h6>
                <ul className="subMenu">
                  <li>
                    {" "}
                    <Link className="link text" to="/faq/howregister"> &gt; วิธีสมัครสมาชิก </Link>
                  </li>
                  <li>
                    {" "}
                    <Link className="link text " to="/faq/howtopup"> &gt; วิธีเติมเงิน</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link className="link text" to="/faq/howorder"> &gt; วิธีสั่งสินค้า </Link>
                  </li>
                  <li>
                    {" "}
                    <Link className="link text" to="/faq/terms"> &gt; Terms Of Use </Link>
                  </li>
                </ul>
              </Link>
            </div>
          </div>

          {/* end logo && menu */}

          {/* start report && login */}
          <div className="links">
            {currentUser && currentUser.user_role === "admin" && (
              <Link className="link report" to="/admin">
                <h6>แอดมิน</h6>
              </Link>
            )}

            {currentUser && currentUser.user_role === "admin" ? (
              <Link className="link report" to="/admin/report">
                <h6>รับปัญหาลูกค้า</h6>
              </Link>
            ) : (
              <Link className="link report" to="/report">
                <h6>แจ้งปัญหา / สอบถาม</h6>
              </Link>
            )}

            {currentUser ? (
              <Link to='' className='link'>
              <span
                className="login"

                // onClick={() => setOpenProfile((prev) => !prev)}
              >
                <div className="username">{currentUser.user_username}</div>
                <div className="balance"> {currentUser.user_balance} ฿</div>

                {/* {openProfile && ( */}
                {/* {openProfile && ( */}

                {/* <div className="change-lang">
                        <div className="flag">
                          <div className="flagImg"> 
                           <img src={Flag} alt="" />
                          </div>
                        </div>
                        <div className='thai'>ภาษา</div>
                        </div> */}

                <div className="dropdownProfile">
                  <div className="subMenu">

                    <Link className='link' to='/userinfo'>
                    <div className="subProfileDetails">
                      <div className="profile">
                        <img src={`/profiles/${currentUser.user_img}`} alt="" />
                      </div>

                      <div className="profileInfo">
                        <div className="profileInfoName">
                          <div className="profileUsername">
                            {currentUser.user_username}
                          </div>
                          <div className="profileBalance">
                            {currentUser.user_balance} ฿ คงเหลือ
                          </div>
                        </div>

                        <div className="profileEmail">
                          {currentUser.user_email}
                        </div>
                      </div>
                    </div>
                    </Link>

                    {/* my profile */}

                    <div className="myProfile">
                      <Link to='/userinfo' className='link'>
                      <div>โปรไฟล์ของฉัน</div>
                      </Link>
                      <Link to='/orderhistory' className='link'>
                      <div>ประวัติการสั่งซื้อ</div>
                      </Link>
                    </div>

                    {/* logout part */}

                    <div className="langLog">

                      <div className="lang">
                        <div className='thai'>ภาษา</div>
                        <div className="flag">
                          <div className="text">
                          ไทย
                          </div>
                          <div className="flagImg"> 
                           <img src={Flag} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="logout" onClick={logout}>ออกจากระบบ</div>

                      {/* <div className="change-lang">
                        <div className="flag">
                          <div className="flagImg"> 
                           <img src={Flag} alt="" />
                          </div>
                        </div>
                        <div className='thai'>ภาษา</div>
                        </div> */}
                    </div>
                  </div>

                  {/* <div className="change-lang">
                        <div className="flag">
                          <div className="text">
                          ไทย
                          </div>
                          <div className="flagImg"> 
                           <img src={Flag} alt="" />
                          </div>
                        </div>
                        <div className='thai'>ภาษา</div>
                        </div> */}
                </div>
                {/* )} */}
                {/* () */}
              </span>
              </Link>

            ) : (
              <Link className="link" to="/login">
                <span className="gotoLogin">
                  <h6>ล็อคอิน / สมัครสมาชิก</h6>
                </span>
              </Link>
            )}
            {/* {openProfile && <OpenProfile /> } */}
            {currentUser && openProfile && (
              <div className="dropdownProfile">
                {/* <ul>
                <Link to="/userInfo" className="link">
                  <li>
                    <CgProfile className="icon" /> ตั้งค่าโปรไฟล์
                  </li>
                </Link>
                <Link to="/orderhistory" className="link">
                  <li>
                    <FaHistory className="icon" /> ประวัติการซื้อ
                  </li>
                </Link>
                <li onClick={logout}>
                  <MdLogout className="icon" /> ล็อคเอ้า
                </li>
              </ul> */}
              </div>
            )}
          </div>
        </div>
        <div className="responsive-container">
        <div className="menu-toggle" onClick={toggleMenu}>
          <GiHamburgerMenu size={30} />
        </div>

        <Link className="web-icon" to={"/"}>
          <div className="webLogo">
          <img src="/profiles/7.jpg" alt="icon" />
          </div> 
        </Link>

        <ul className={`web-menu ${showMenu ? "active" : "inactive"}`}>
          <li className="menu-navigation">
            <ul>
              <li>
                <Link to="/" onClick={toggleMenu}>
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link to="/allcategory" onClick={toggleMenu}>
                  สินค้า
                </Link>
              </li>
              <li>
                <Link to="/topup" onClick={toggleMenu}>
                  เติมเงิน
                </Link>
              </li>
              <li>
                <Link to="/orderhistory" onClick={toggleMenu}>
                  ประวัติการสั่งซื้อ
                </Link>
              </li>
              <li>
                <Link to="/cat?=etc" onClick={toggleMenu}>
                  อื่นๆ
                </Link>
              </li>
            </ul>
          </li>

          <li className="menu-help">
            <Link to="/report">แจ้งปัญหา / สอบถาม</Link>
          </li>
        </ul>

        {currentUser ? (
          <>
            <div className="profile-toggle" onClick={toggleProfile}>
              <div className="nav-balance">{currentUser.user_balance}฿</div>
              {currentUser.user_img === "" || !currentUser.user_img ? (
                <>
                  <FaRegUserCircle className="user-button" />
                </>
              ) : (
                <img src={`/profiles/${currentUser.user_img}`} alt="" />
              )}
            </div>
            <div
              className={`dropdownProfile ${
                openProfile ? "active" : "inactive"
              }`}
            >
              <ul className="menu-lists">
                <li
                  onClick={() => setOpenProfile(!openProfile)}
                  className="lists-toggle"
                >
                  <PiTriangleFill className="triangle" />
                  <div className="circle"></div>
                </li>
                <li>
                  <Link className="lists-profile" to="/userinfo">
                    <img src={`/profiles/${currentUser.user_img}`} alt="" />
                    <div className="profile-info">
                      <div className="user-info">
                        <div className="username">
                          {currentUser.user_username}
                        </div>
                        <div className="balance">
                          {currentUser.user_balance} ฿ คงเหลือ
                        </div>
                      </div>
                      <div className="user-email">{currentUser.user_email}</div>
                    </div>
                  </Link>
                </li>
                <li className="lists-user">
                  <Link to="/userinfo" className="link">
                    โปรไฟล์ของฉัน
                  </Link>
                </li>
                <li className="lists-history">
                  <Link to="/orderhistory">ประวัติการสั่งซื้อ</Link>
                </li>
                <li className="lists-language">
                  <div className="list-language">
                    <div className="language">ภาษา</div>
                    <div className="flag-box">
                      ไทย
                      <img src={Flag} alt="" />
                    </div>
                  </div>
                </li>
                <li className="list-logout" onClick={logout}>
                  ออกจากระบบ
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <FaRegUserCircle className="user-button" />
            </Link>
          </>
        )}
      </div>
      </div>
    </>
  );
}

export default Navbar
