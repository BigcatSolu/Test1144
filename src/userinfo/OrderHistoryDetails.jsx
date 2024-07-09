import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CryptoJS from 'crypto-js'
import '../adminSub/BannerCom.css'

const OrderHistoryDetails = () => {

    const location = useLocation()
    const sale_id = location.pathname.split('/')[2]
    console.log(sale_id)
    const { currentUser, logout } = useContext(AuthContext)

    if (!currentUser) {
      return navigate('/login')
    }

    const [sale, setSale] =  useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/api/sale/${sale_id}`)
            console.log(res)
            setSale(res.data[0])
        }
        fetchData()
    },[])

    const formatDescription = (description) => {
      return description ? description.split(',').join('\n') : '';
    };

    console.log(sale)

    const decryptPassword = (ciphertext) => {
        const bytes = CryptoJS.AES.decrypt(ciphertext, 'Hello-Dude-One');
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        return originalPassword;
      };

  return (
    <div className="userInfoPage">
      <div className="container">
        <div className="title">
          <Link to="/" className="link">
            หน้าหลัก
          </Link>
          <h3> &gt; </h3>
          <Link to="/category" className="link">
            ข้อมูลบัญชีผู้ใช้
          </Link>
        </div>

        <div className="userInfo">
          <div className="container">
            <div className="userNavbar">
              <Link className="link" to="/userInfo">
                <h4>
                  {" "}
                  <FaUserAlt /> ข้อมูลบัญชีผู้ใช้
                </h4>
              </Link>
              <ul>
                <Link className="link" to="/orderhistory">
                  <li>
                    <MdWorkHistory /> ประวัติการสั่งซื้อ
                  </li>
                </Link>
                <Link className="link" to="/topuphistory">
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
             <div className='receiptPages'>
              <div className="orderHistoryDetails">
                <div className="orderHDHeader">
                  <div className="img">
                    <img src="/profiles/7.jpg" alt="websiteLogo" />
                  </div>
                  <div className="button">
                    <Link to='/report'>
                    <button className='redBtn'>แจ้งปัญหาสินค้า</button>
                    </Link>
                  </div>
                </div>

                <div className="orderNum">Order #{sale_id}</div>
                <div className="buyAt">
                  <div className="buyAtTitle">สั่งซื้อเมื่อ:</div>
                  <div className="buyAtTime"> {sale.sale_date} </div>
                </div>

                <div className="orderAt">
                  <div className="orderAtShop">
                    <div className="orderAtName">สั่งซื้อที่:</div>
                    <div className="orderAtShop">Shop Area &</div>
                  </div>
                  <div className="certificateBy">
                    <div className="certificateName">รับรองโดย:</div>
                    <div className="certificateShop">
                      Shop Area && <br /> บริการรับ AFK Map Roblox All Service
                    </div>
                  </div>
                </div>

                <div className="proTitle">
                  <div>Product</div>
                  <div>Amount</div>
                </div>
                <div className="productId">
                  <div className="product">ROBLOX ADA ไอดีไก่</div>
                  <div className="price">$ {sale.sale_amount}</div>
                </div>

                <div className="pricing">
                  <div className="total">
                    <div className="totalname">รวม:</div>
                    <div className="totalprice">$ {sale.sale_amount}</div>
                    </div>
                  <div className="tex">
                  <div className="texname">ภาษีมูลค่าเพิ่ม 0%</div>
                    <div className="texprice">$ 0.00</div>
                  </div>
                  <div className="totalPlusTex">
                  <div className="totalPlusName">ราคารวม + ภาษีมูลค่าเพิ่ม</div>
                    <div className="totalPlusprice">$ {sale.sale_amount} </div>
                  </div>
                  <div className="allTotal">                    <div className="allTotalName">ผลรวม</div>
                    <div className="allTotalPrice">$ {sale.sale_amount} </div></div>
                </div>
              </div>

              <div className="receipt">
                    <div className="paid">จ่ายแล้ว</div>
                    <div className="padDetails">รายระเอียดการชำระเงิน</div>
                    <div className="howBuy">
                        <div className="howTitle">เครดิตในระบบ:</div>
                        <div className="shopName">Shop Area</div>
                    </div>
                    <div className="accountDetails">
                        <div className="detailsTitle">ข้อมูลบัญชี:</div>

                        {sale && sale.boxpass_username || sale.boxpass_password ? (
                            <>
                            <div className="accountDetailsName">Id: {sale.boxpass_username}</div>
                            <div className="accountDetailsName">Ps: {decryptPassword(sale.boxpass_password)}</div>
                            {sale && sale.boxpass_email ? (
                              <div className="accountDetailsName">
                                Email: {sale.boxpass_email}
                              </div>
                            ) : (
                              null
                            )}
                            </>
                        ) : (
                            <div className="accountDetailsName">Code: {sale.boxpass_code} </div>
                        )}
                    </div>

                    <div className="allDetails">

                    <div
                    className="details"
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(sale.box_warning)
                    }}
                  ></div>
                    {/* ▶︎เมื่อลูกค้าซื้อไอดีไปแล้วจะได้ code ไปแลกใช้ในตัวเกม <br />
                    ▶︎เนื่องจากสิ้นค้าชิ้นนี้มีการอัปเดตตลอดเวลา <br />
                    ▶︎(ประกันการใช้งาน ดูรายละเอียดประกันสินค้า) <br/>
                    ▶︎อย่าลืมให้เครดิต +1 ที่เพจ Shop Area ด้วยนะ <br />
                    ▶︎เมื่อเข้าไอดีได้แล้วอย่าลืมเปลี่ยน รหัสผ่าน  หรือ เพิ่มอีเมลโดยทันทีเพื่อความปลอดภัยของตัวคุณเอง เตือนแล้วนะ */}
                    </div>

                    <div className="caution">
                        <div className="cautionTitle">คำเตือน:</div>
                        <div className="cautionDetails">(หากลูกค้าเปลี่ยนรหัสผ่านแล้วลืมรหัสผ่าน) <br />
                        ทางเราจะไม่รับผิดชอบใด ๆ ทั้งสิ้นเนื่องจากมาจากการกระทำของลูกค้าเอง
                        </div>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryDetails
