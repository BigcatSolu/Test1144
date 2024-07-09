import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import './Userinfo.css'

const UserInfo = () => {

  const [user, setUser] = useState(null)
  const { currentUser, changePassword, refreshUserData, logout } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])
 
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.user_id) {
        try {
          const res = await axios.get(`/api/users/${currentUser.user_id}`);
          setUser(res.data);
        } catch (err) {
          console.log(err);
      }
    }
    }
    fetchData()
  },[currentUser])

  if (!currentUser) {
    return navigate('/login')
  }

  console.log(user)

  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/profiles')
      // console.log(res.data)
      setProfiles(res.data)
      console.log("Hello")
    }
    fetchData()
  },[])

  const showModal1 = () => {
    setShowModal(prevState => !prevState)
  }
  
  console.log("PROFILES", profiles)

  const [inputs, setInputs] = useState({
    password: "",
    newPassword: "",
    userId: currentUser.user_id
  })
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };


  const handleChange = (e) => {
    setInputs(prev=> ({...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      Swal.fire({
        title: 'อีเมลผิดพลาด',
        text: 'โปรดกรอกอีเมลให้ถูกต้อง',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ลองอีกครั้ง'
      });
      return;
    }

    try {
      const res = await axios.put('/api/auth/updateemail', {
        email: email ? email : currentUser.user_email,
        userId: currentUser.user_id,
        contact: contact ? contact : currentUser.user_contact
      })
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.data,
        showConfirmButton: false,
        timer: 1500
      });
    setEmailError('');
    refreshUserData()
    setTimeout(function() {
      window.location.reload();
  }, 1500);
    // navigate('/userinfo')
    } catch (error) {
        Swal.fire({
          title: "Oops...",
          text: error.response.data,
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ลองใหม่"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/userinfo')
          
          }
        });
      console.log("ERROE", error)

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await changePassword(inputs)
      console.log("เปลี่ยนรหัสผ่านสำเร็จ")

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "เปลี่ยนรหัสผ่านสำเร็จ"
      });
      // await refreshUserData()
      setTimeout(function() {
        window.location.reload();
    }, 1500);
      
    } catch (err) {
      console.log("ERROR", err)
      Swal.fire({
        title: "Oops...",
        text: err.response.data,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ลองใหม่"
      }).then((result) => {
        if (result.isConfirmed) {

          navigate('/userinfo')
        
        }
      });
    }
  }

  const handleProfileChange = async () => {
    if (!selectedProfile) return;
    console.log("PROFILES", selectedProfile.profile_img)

    try {
      const res = await axios.put('/api/auth/updateprofile', {
        userId: currentUser.user_id,
        user_img: selectedProfile.profile_img,
        username: currentUser.user_username
      });

      Swal.fire({
        title: "รูปโปรไฟล์",
        text: "เปลี่ยนรูปโปรไฟล์สำเร็จ",
        icon: "success"
      });
      setTimeout(function () {
        refreshUserData()
        window.location.reload();
      }, 1500);
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error.response.data,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ลองใหม่"
      });
    }
  };

  return (
    <div className="userInfoPage">
      <div className="container">
        {/* หัวข้อ */}
        <div className="title">
          <Link to="/" className="link">
            หน้าหลัก
          </Link>
          <h3> &gt; </h3>
          <Link to="/category" className="link">
            ข้อมูลบัญชีผู้ใช้
          </Link>
        </div>

        {/* เริ่มUserInfo */}

        <div className="userInfo">
          <div className="container">
            <div className="userNavbar">
              <Link className="link" to="/userinfo">
                <h4>
                  <FaUserAlt /> ข้อมูลบัญชีผู้ใช้
                </h4>
              </Link>
              <ul>
                <Link className="link" to="/orderhistory">
                  <li>
                    {" "}
                    <MdWorkHistory /> ประวัติการสั่งซื้อ
                  </li>
                </Link>
                <Link className="link" to="/topupHistory">
                  <li>
                    <RiMoneyDollarCircleFill /> ประวัติการเติมเงิน
                  </li>
                </Link>
                <Link className="link">
                  <li>
                    <FaGift /> ประวัติการสุ่มรางวัล
                  </li>
                </Link>
                <Link className="link" to="/changepassword">
                  <li>
                    <IoKeySharp /> ติดตามสถานะออเดอร์
                  </li>
                </Link>
                <Link className="link logout" onClick={logout}>
                  <li>
                    <VscSignOut /> ออกจากระบบ
                  </li>
                </Link>
              </ul>
            </div>

            <div className="userPages">

              <div className="userHeader">
                <div className="profile">
                  <div className="userProfileImage">
                    {currentUser && (
                      <img src={`/profiles/${currentUser.user_img}`} alt="" />
                    )}
                  </div>
                  <div className="profileName">
                    โปรไฟล์ของคุณ
                  </div>
                  <div className="editProfileImage" onClick={showModal1} ref={buttonRef}>
                    {/* change profile image here */}
                    แก้ไขโปรไฟล์

                  {/* {showModal && (
                <div className="modal">
                  <div className="modalContent" ref={modalRef}>
                    <h3>เลือกโปรไฟล์ใหม่</h3>
                    <div className="profileOptions">
                      {profiles.map((profile, index) => (
                        <img
                          key={index}
                          src={`/profiles/${profile.profile_img}`}
                          alt={`profile-${index}`}
                          onClick={() => setSelectedProfile(profile)}
                          style={{
                            border: selectedProfile === profile ? '2px solid blue' : 'none'
                          }}
                        />
                      ))}
                    </div>
                    <button onClick={handleProfileChange}>บันทึก</button>
                    <button onClick={() => setShowModal(false)}>ยกเลิก</button>
                  </div>
                </div>
              )} */}
                  </div>
                  {showModal && (
                    <div className="modal" ref={modalRef}>
                      <div className="modalContent" ref={modalRef}>
                        <h3>เลือกโปรไฟล์ใหม่</h3>
                        <div className="profileOptions">
                          {profiles.map((profile, index) => (
                            <div className="profileSelect">

                            <img
                              key={index}
                              src={`/profiles/${profile.profile_img}`}
                              alt={`profile-${index}`}
                              onClick={() => setSelectedProfile(profile)}
                              style={{
                                border: selectedProfile === profile ? '2px solid black' : 'none'
                              }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="selectButton">
                        <button onClick={handleProfileChange} className='selectButtonMain'>บันทึก</button>
                        </div>
                        {/* <button onClick={() => setShowModal(false)}>ยกเลิก</button> */}
                      </div>
                    </div>
                  )}
                </div>

                <div className="userInformation">
                  <div className="informationTitle">
                    ข้อมูลผู้ใช้
                  </div>
                  <div className="userinformationDetails">
                    <div className="placeholderWrapper">
                    <div className="placeholder">ชื่อผู้ใช้:</div>
                    <div className="placeholderContent">{currentUser.user_username}</div>
                    </div>
                    <div className="placeholderWrapper">
                    <div className="placeholder">ยอดเงินคงเหลือ:</div>
                    <div className="placeholderContent">{currentUser.user_balance}  ฿</div>
                    </div>
                    <div className="placeholderWrapper">
                    <div className="placeholder">ยอดการเติมเงิน:</div>
                    <div className="placeholderContent">{currentUser.user_totaltopup}  ฿</div>
                    </div>
                  </div>
                </div>

                <div className="userContactInformation">
                <div className="informationTitle">
                    ข้อมูลการติดต่อกลับ
                  </div>
                  <div className="userinformationDetails">
                    <div className="placeholderWrapper">
                      <div className="placehoder">Email:</div>
                      <div className="placehoderContent">{currentUser.user_email}</div>
                    </div>
                    <div className="placeholderWrapper">
                      <div className="placehoder">ข้อมูลการติดต่อกลับ:</div>
                      {/* <div className="placehoderContent">{currentUser.user_contact}</div> */}
                    </div>
                    <div className="placeholderWrapper">
                      {/* <div className="placehoder">Email:</div> */}
                      <div className="placehoderContent">{currentUser.user_contact}</div>
                    </div>
                    {/* <p>Email: {currentUser.user_email} </p> */}
                    {/* <div className="userinfoContact">
                    <p>ข้อมูลการติดต่อกลับ:</p>
                    <p>
                     {currentUser.user_contact} 
                    </p>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="emailContactChange">
                <form action="" className='emailForm'>
                <div className="emailTitle">
                Edit contact information
                  </div>
                  <div className="emailSubTitle">
แก้ไข ข้อมูลการติดต่อกลับ
                    
                  </div>
                  <div className="email">
                    <label htmlFor="email">อีเมล:</label>
                    <input type="email" id='email' name='email' placeholder='อัปเดตอีเมลของคุณ (หากไม่ต้องการแก้ไขไม่ต้องใส่)' onChange={(e) =>  {setEmail(e.target.value); setEmailError('')}} required/>
                  </div>
                  <div className="currentPassword">
                    <label htmlFor="contact">ข้อมูลติดต่อกลับ:</label>
                    <input type="text" id='contact' name='contact' placeholder='ข้อมูลการติดต่อกลับของคุณ (หากไม่ต้องการแก้ไขไม่ต้องใส่)' onChange={(e) => setContact(e.target.value)} required/>
                  </div>
                  <div className="button">
                    <div className='updateBtn greenBtn' onClick={handleSubmitEmail}>อัปเดตข้อมูล</div>
                  </div>
                </form>

                {/* change password */}

                <form action="" className='passwordForm'>
                  <div className="passwordTitle">
                    Change Password
                  </div>
                  <div className='passwordSubTitle'>เปลี่ยนรหัสผ่าน</div>
                  <div className="email">
                    <label htmlFor="password">รหัสผ่านเก่า:</label>
                    <input type="password" id='password' name='password' placeholder='รหัสผ่านเก่าของคุณ' onChange={handleChange} required/>
                  </div>
                  <div className="currentPassword">
                    <label htmlFor="newpassword">รหัสผ่านใหม่:</label>
                    <input type="password" id='newpassword' name='newPassword' placeholder='รหัสผ่านใหม่ของคุณ' onChange={handleChange} required/>
                  </div>
                  <div className="currentPassword">
                    <label htmlFor="newpassword">ยืนยันรหัสผ่านใหม่:</label>
                    <input type="password" id='newpassword' name='newPassword' placeholder='ยืนยันรหัสผ่านใหม่ของคุณ' onChange={handleChange} required/>
                  </div>
                  <div className="button">
                    <div className='updateBtn greenBtn' onClick={handleSubmit}>อัปเดตรหัสผ่าน</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo
