import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'
import Preorder from '../Order/Preorder'
import Order from '../Order/Order'
import AFK from '../Order/AFK'
// import './Buttons.css'

const OrderDetails = () => {

  

  const [price, setPrice] = useState(1)
  const [post, setPost] = useState({})
const { currentUser, refreshUserData } = useContext(AuthContext)
const [error, setError] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const decrease = () => {
    if (price > 1) {
      setPrice(price - 1);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  })

const increase = () => {  
  if (post.boxpass_remain < price + 1) {
    // If remaining box pass is less than the incremented price, don't allow the increase
    console.log("Cannot increase price. Remaining box pass is insufficient.");
    return; // Exit the function early without updating the price state
  }
  setPrice(price + 1);
}

const location = useLocation()
const navigate = useNavigate()

const postId = location.pathname.split('/')[2]

useEffect(() => {
  const fetchData = async ()=> {
    try {
      const res = await axios.get(`/api/posts/${postId}`)
      setPost(res.data)
    }catch(err) {
      console.log("ERROR:" + err)
    }
  }
  fetchData()
},[postId])

console.log(post)

const [view, setView] = useState([])

const cate = post.cate

useEffect(() => {
  const fetchData = async ()=> {
    try {
      const view = await axios.get(`/api/posts?cate=${cate}`);
      setView(view.data)
    }catch(err) {
      console.log("ERROR:" + err)
    }
  }
  fetchData()
},[cate])

const [test, setTest] = useState([])

useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get('/api/testing')
    console.log(res)
    setTest(res.data)
  }
  fetchData()
},[])

// console.log("TESTING IS THIS", test)


const formatDescription = (description) => {
  return description ? description.split(',').join('\n') : '';
};


const handleConfirm = async (e) => {
  e.preventDefault()

  try {
    if (currentUser.user_balance < post.price) {
      console.log("ยอดเงินของคุณไม่เพียงพอ กรุณาเติมเงินด้วยค่ะ")
      Swal.fire({
        title: "Oops...",
        text: "ยอดเงินของคุณไม่เพียงพอ กรุณาเติมเงินด้วยค่ะ",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ลองใหม่"
      })
      return
    }
    if (post.boxpass_remain === 0) {
      console.log("สินค้าหมดสต็อก โปรดลองใหม่ภายหลัง")
      Swal.fire({
        title: "Oops...",
        text: "สินค้าหมดสต็อก โปรดลองใหม่ภายหลัง",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ลองใหม่"
      })
      return
    } 

    const balance = await axios.put('/api/users/update', {
      price: total,
      userId: currentUser.user_id
    })

    console.log(balance.data)

    const res = await axios.post(`/api/posts/getaccount`, {
      boxId: post.id,
      limit: price
    })
    const boxpassArray = res.data
    console.log(res.data)
    const saleDate = new Date(); // Get the current timestamp in the client's local timezone
  const saleDateUTC7 = new Date(saleDate.getTime() + (7 * 60 * 60 * 1000));

  const day = saleDateUTC7.getDate();
  const month = saleDateUTC7.getMonth() + 1; // Month is zero-based, so we add 1
  const year = saleDateUTC7.getFullYear();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

    for (const boxpass of boxpassArray) {
      // Post sale for each boxpass item
      const postSale = await axios.post('/api/sale', {
        boxpass_id: boxpass.boxpass_id,
        user_id: currentUser.user_id,
        sale_date: formattedDate,
        sale_amount: post.price,
        boxpass_username: boxpass.boxpass_username,
        boxpass_password: boxpass.boxpass_password,
        boxpass_email: boxpass.boxpass_email,
        boxpass_code: boxpass.boxpass_code,
        post_title: post.title
      });

      console.log(postSale);

      // Update the boxpass item status
      const update = await axios.put(`/api/posts/update`, {
        boxpass_id: boxpass.boxpass_id,
      });

      console.log(update);
    }

    Swal.fire({
      title: "Success",
      text: "สั่งซื้อสินค้าสำเร็จ",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK"
      
    }).then((result) => {
      if (result.isConfirmed) {
        refreshUserData()
        navigate('/orderhistory')
      }
    });

  } catch (error) {
    console.log(error)
  }
}
if (selectedOption) {
  console.log("OPTIONS", selectedOption)
}

// --------------------------------------------------

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [contact, setContact] = useState("")
  const [note, setNote] = useState("")
  const [redmail, setRedMail] = useState('')
  const [cookie, setCookie] = useState('')
  const [warning, setWarning] = useState('')

  const handleOrder = async (e) => {
    e.preventDefault()

    let selectedValue = '';
    switch (selectedOption) {
      case 'op1':
        selectedValue = post.op1;
        break;
      case 'op2':
        selectedValue = post.op2;
        break;
      case 'op3':
        selectedValue = post.op3;
        break;
      case 'op4':
        selectedValue = post.op4;
        break;
      case 'op5':
        selectedValue = post.op5;
        break;
      case 'op6':
        selectedValue = post.op6;
        break;
      case 'op7':
        selectedValue = post.op7;
        break;
      case 'op8':
        selectedValue = post.op8;
        break;
      // Add more cases if you have more options
      default:
        selectedValue = '';
    }


    if (!username || !password || !contact || !redmail || !warning) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "โปรดกรอกข้อมูลให้ครบทุกช่อง"
      });
      return;
    }

    try {
      if (currentUser.user_balance < post.price) {
        console.log("ยอดเงินของคุณไม่เพียงพอ กรุณาเติมเงินด้วยค่ะ")
        Swal.fire({
          title: "Oops...",
          text: "ยอดเงินของคุณไม่เพียงพอ กรุณาเติมเงินด้วยค่ะ",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ลองใหม่"
        })
        return
      }

      const balance = await axios.put('/api/users/update', {
        price: post.price,
        userId: currentUser.user_id
      })

      const res = await axios.post('/api/order', {
        category_id: post.cate,
        user_id: currentUser.user_id,
        status_id: 1,
        ordering_title: post.title,
        ordering_username: username,
        ordering_password: password,
        ordering_amount: post.price,
        ordering_contact: contact,
        ordering_note: note,
        ordering_img: post.img,
        ordering_type: post.type,
        ordering_option: selectedValue,
        ordering_redmail: redmail,
        ordering_cookie: cookie,
        ordering_warning: warning,
        ordering_coundown_duration: post.start_time
      })
      
      Swal.fire({
        title: "Success",
        text: res.data,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
        
      }).then((result) => {
        if (result.isConfirmed) {
          refreshUserData()
          navigate('/')
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  const categoryNames = {
    1: "Boxfruits",
    2: "Code",
    3: "Order",
    4: "PreOrder",
    5: "AFK"
  };

  console.log("VIEW", view)

  const categoryNameFromPost = categoryNames[post.cate] || "Unknown Category";

const [total, setTotal] = useState(post.price)

  useEffect(() => {
    setTotal(price * post.price);
  }, [price, post.price]);

  console.log(post)
  return (
    <div className="order">
      <div className="container">
        <div className="title">
          <Link to="/" className="link">
            หน้าหลัก
          </Link>
          <h3> &gt; </h3>
          <Link to={`/category?cate=${post.cate}`} className="link">
            {post.type}
          </Link>
          <h3> &gt; </h3>
          <h3> {post.title} </h3>
        </div>

        {/* end title */}

        <div className="goodsDetails">
          <div className="container">

            <div className="imgandprice">

              <div className="img">
              {post.file_type === "video" ? (
      <video autoPlay loop muted>
      <source
        src={`../upload/${post.img}`}
        type="video/mp4"
      />
    </video>
    ) : (
      <img src={`../upload/${post.img}`} alt="" />
    )}
                {/* <img src={`../upload/${post.img}`} alt="" /> */}
              </div>

              {post.type === 'id' || post.type === 'code' ? (
                    <>
              <div className="priceInfo">
                    <div className="price">จำนวนที่ซื้อ</div>
                    
                  </div>

                  <div className="quantity">
                    <div className="inputWrapper">

                    <button className="decrease" onClick={decrease}>-</button>
                    <input type="number" value={price} />
                    <button
                      onClick={increase}
                      className="increase"
                      disabled={post.boxpass_remain < price}
                    >
                      +
                    </button>
                    </div>
                  </div>
                  <div className="remainInfo">
                  <div className="remaining">
                      เหลือสินค้าทั้งหมด: {post.boxpass_remain} ชิ้น
                    </div>
                  </div>
                  <Link to="/" className="buy">
                    <div className="bBtn" onClick={handleConfirm}>
                      สั่งซื้อสินค้า ({total} บาท)
                    </div>
                  </Link>
                  </>
                  ) 
                  : (
                    null
                  )}
            </div>

            <div className="orderDetails">
            
            {/* Id Code */}
              {post && (post.type === 'id' || post.type === 'code') ? (
                <>
                  <div className="detailsTitle">
                    <h3>{post.title}</h3>
                  </div>
                  <div className="detailsDes">
                  <div className="desTitle">ข้อมูลเกี่ยวกับสินค้า</div>
                  <div
                    className="details"
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(post.des),
                    }}
                  ></div>
                  <div className="detailsWarn">
                    <div className="warnTitle">ประกันการใช้งาน หลังจากซื้อ</div>
                    <div className="warnDetails">
                    <div
                    className="details"
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(post.warn),
                    }}
                  ></div>
                      {/* {post.warn} */}
                    </div>
                    <div className="warnHow">
                    ► (ประกันการใช้งาน <a href="https://www.youtube.com" target='_blank' className='howWarn'>ดูรายละเอียด</a> )
                    </div>
                  </div>
                  </div>
                </>
              ) : (
                post.type === 'afk' ? (
                  <AFK post={post} />
                ) : post.type === 'preOrder' ? (
                  <Preorder post={post} />
                ) : (
                  <Order post={post} />
                )
                // ordering
                // <>
                //   <div className="detailsTitle">
                //     <h3>{post.title}</h3>
                //   </div>
                //   <div
                //     className="orderPreorderDetails"
                //     dangerouslySetInnerHTML={{
                //       __html: formatDescription(post.des),
                //     }}
                //   ></div>
                //   <div className="warranty">
                //     ► หลังฟาร์มสำเร็จแล้วควรเปลี่ยน"รหัสผ่าน" ใหม่ทุกครั้ง{" "}
                //     <br />
                //     ► เมื่อกดซื้อบริการแล้วจะไม่มีการคืนเงินนะครับ <br />
                //     ► อย่าทักมาเร่งงาน ทีมงานจะดำเนินงานให้ตามคิวเท่านั้น <br />
                //   </div>
                //   <div className="priceInfo">
                //     <div className="price">ราคา {post.price} ฿</div>
                //   </div>

                //   {/* กรอกแบบฟอร์ม */}
                //   <form action="">
                //     <label htmlFor="username">ชื่อใน Roblox : Username</label>
                //     <input type="text" id='username' onChange={(e) => setUsername(e.target.value)} required placeholder='username or email'/>

                //     <label htmlFor="password">รหัสผ่าน Roblox : Password</label>
                //     <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} required placeholder='password'/>

                //     <label htmlFor="cookie">โปรดกรอก cookie ของคุณ</label>
                //     <input type="text" id='cookie' name='cookie' placeholder='cookie123456789' onChange={(e) => setCookie(e.target.value)}/>

                //     <label htmlFor="info">ช่องทางการติดต่อ : ลิ้ง Facebook (สำหรับแจ้งความคืบหน้า)</label>
                //     <input type="text" id='info' onChange={(e) => setContact(e.target.value)} required placeholder='ช่องทางการติดต่อ'/>

                //     <label htmlFor="redmail">กรุณาทำเมลแดง : ทำแล้ว/หากทำไม่เป็นให้ทักสอบถามแอดมินเพจได้เลย</label>
                //     <input type="text" id='redmail' placeholder='โปรดกรอกคำว่า ทำแล้ว' onChange={(e) => setRedMail(e.target.value)}/>

                //     <label htmlFor="warning">ห้ามเข้าแทรกหากจ้างฟาร์ม : เข้าใจ/ ไม่เข้าใจ</label>
                //     <input type="text" id='warning' placeholder='โปรดกรอกคำว่า เข้าใจ' onChange={(e) => setWarning(e.target.value)}/>


                //     <div className="checkBoxes">
                //     {post && post.op1 && (
                        
                //         <div className={`checkbox ${selectedOption === 'op1' ? 'show' : ''}`} onClick={() => handleSelectOption('op1')}>
                //         <div className="checkImg">
                //           <img src="/profiles/5.jpg" alt="" />
                //         </div>
                //         <div className="optionText">
                //         <p> {post.op1} </p>
                //         </div>
                //       </div>
                //       )}
                //     {post && post.op2 && (
                        
                //         <div className={`checkbox ${selectedOption === 'op2' ? 'show' : ''}`} onClick={() => handleSelectOption('op2')}>
                //         <div className="checkImg">
                //           <img src="/profiles/5.jpg" alt="" />
                //         </div>
                //         <div className="optionText">
                //         <p> {post.op2} </p>
                //         </div>
                //       </div>
                //       )}
                //     {post && post.op3 && (
                        
                //         <div className={`checkbox ${selectedOption === 'op3' ? 'show' : ''}`} onClick={() => handleSelectOption('op3')}>
                //         <div className="checkImg">
                //           <img src="/profiles/5.jpg" alt="" />
                //         </div>
                //         <div className="optionText">
                //         <p> {post.op3} </p>
                //         </div>
                //       </div>
                //       )}
                //     {post && post.op4 && (
                        
                //         <div className={`checkbox ${selectedOption === 'op4' ? 'show' : ''}`} onClick={() => handleSelectOption('op4')}>
                //         <div className="checkImg">
                //           <img src="/profiles/5.jpg" alt="" />
                //         </div>
                //         <div className="optionText">
                //         <p> {post.op4} </p>
                //         </div>
                //       </div>
                //       )}
                //     {post && post.op5 && (
                        
                //         <div className={`checkbox ${selectedOption === 'op5' ? 'show' : ''}`} onClick={() => handleSelectOption('op5')}>
                //         <div className="checkImg">
                //           <img src="/profiles/5.jpg" alt="" />
                //         </div>
                //         <div className="optionText">
                //         <p> {post.op1} </p>
                //         </div>
                //       </div>
                //       )}
                //     {post && post.op6 && (
                        
                //         <div className={`checkbox ${selectedOption === 'op6' ? 'show' : ''}`} onClick={() => handleSelectOption('op6')}>
                //         <div className="checkImg">
                //           <img src="/profiles/5.jpg" alt="" />
                //         </div>
                //         <div className="optionText">
                //         <p> {post.op1} </p>
                //         </div>
                //       </div>
                //       )}
                //     {post && post.op7 && (
                        
                //         <div className={`checkbox ${selectedOption === 'op7' ? 'show' : ''}`} onClick={() => handleSelectOption('op7')}>
                //         <div className="checkImg">
                //           <img src="/profiles/5.jpg" alt="" />
                //         </div>
                //         <div className="optionText">
                //         <p> {post.op1} </p>
                //         </div>
                //       </div>
                //       )}
                //     {post && post.op8 && (
                        
                //         <div className={`checkbox ${selectedOption === 'op8' ? 'show' : ''}`} onClick={() => handleSelectOption('op8')}>
                //         <div className="checkImg">
                //           <img src="/profiles/5.jpg" alt="" />
                //         </div>
                //         <div className="optionText">
                //         <p> {post.op1} </p>
                //         </div>
                //       </div>
                //       )}

                //     </div>
                //     <label htmlFor="note">หมายเหตุถึงร้านค้า</label>
                //     <textarea name="note" id="note" rows={5} onChange={(e) => setNote(e.target.value)} placeholder='สิ่งที่อยากฝากถึงแอดมินเพิ่มเติม'></textarea>
                //     {error && <p style={{ color: 'red' }}>{error}</p>}
                //     {/* <button class="button">
                //     <p>Button</p>
                //   </button> */}
                //     <button className='greenBtn orderBuy' onClick={handleOrder}>สั่งซื้อตอนนี้เลย</button>
                //   </form>
                // </>
              )}
            </div>

            {(post && post.type === 'id' || post.type === 'code') ? (

            <div className="menu">
              <h1>สิ่งที่คุณอาจสนใจ</h1>

              <div className="postContainer">
                {view && view.length > 0 ? (
                  view.map((v) => (
                    <div className="post" key={v.id}>
                      <div className="img">
                      {v.file_type === 'video' ? (
                        <video autoPlay loop muted>
                        <source
                          src={`../upload/${v.img}`}
                          type="video/mp4"
                        />
                      </video>
                      ) : (
                        <img src={`../upload/${v.img}`} alt="youmaylike" />
                      )}
                      </div>
                      <h2>{v.title}</h2>
                      <Link to={`/order/${v.id}`}>
                        <button>เพิ่มเติม</button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="post">
                    <div className="img">
                      <img src="" alt="youmaylike" />
                    </div>
                    <h2>ยังไม่มีสินค้าแนะนำ</h2>
                    <button>เพิ่มเติม</button>
                  </div>
                )}
              </div>
            </div>
            ) : (
              null
            )}

          </div>
        </div>

        {/* end goods details */}
      </div>

      <div className="responsive-container">
        {/* IMAGE */}
        <div className="order-image">
          {post.file_type === "video" ? (
            <video autoPlay loop muted>
              <source src={`../upload/${post.img}`} type="video/mp4" />
            </video>
          ) : (
            <img src={`../upload/${post.img}`} alt="" />
          )}
          {/* <img src={`../upload/${post.img}`} alt="" /> */}
        </div>
        <div className="order-details">
          {/* Id Code */}
          {post && (post.type === "id" || post.type === "code") ? (
            <>
              <div className="order-info">
                <div className="order-title">{post.title}</div>
                <div className="line" />
                <div className="order-description">
                  <span className="special-word">ข้อมูลเกี่ยวกับสินค้า</span>
                  <div
                    className="description-details"
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(post.des),
                    }}
                  />

                  <div>
                    <span className="special-word">
                      ประกันการใช้งาน หลังจากซื้อ
                    </span>
                    <div className="">
                      <div
                        className="description-details"
                        dangerouslySetInnerHTML={{
                          __html: formatDescription(post.warn),
                        }}
                      ></div>
                      {/* {post.warn} */}
                    </div>
                    <div className="warn-more">
                      ► (ประกันการใช้งาน{" "}
                      <a
                        href="https://www.youtube.com"
                        target="_blank"
                        className="special-word"
                      >
                        ดูรายละเอียด
                      </a>{" "}
                      )
                    </div>
                  </div>
                </div>
              </div>
              <div className="price-info">
                <div className="price">จำนวนที่ซื้อ</div>
              </div>
              <div className="quantity-info">
                <div className="inputWrapper">
                  <button className="decrease" onClick={decrease}>
                    -
                  </button>
                  <input type="number" value={price} />
                  <button
                    onClick={increase}
                    className="increase"
                    disabled={post.boxpass_remain < price}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="remain-info">
                <div className="remaining">
                  เหลือสินค้าทั้งหมด: {post.boxpass_remain} ชิ้น
                </div>
              </div>
              <Link to="/" className="buy">
                <button className="bBtn" onClick={handleConfirm}>
                  สั่งซื้อสินค้า ({total} บาท)
                </button>
              </Link>
            </>
          ) : (
            // ordering
            <div className="order-details">
              {/* INSIDE ORDER DETAILS */}
              <div className="order-info">
                {/* INSIDE ORDER INFO
                  -> TITLE
                  -> DESCRIPTION
                */}
                <div className="order-title">{post.title}</div>
                <div className="line" />
                <div
                  className="order-description"
                  dangerouslySetInnerHTML={{
                    __html: formatDescription(post.des),
                  }}
                />

                <div className="order-warranty">
                  ► หลังฟาร์มสำเร็จแล้วควรเปลี่ยน"รหัสผ่าน" ใหม่ทุกครั้ง <br />
                  ► เมื่อกดซื้อบริการแล้วจะไม่มีการคืนเงินนะครับ <br />
                  ► อย่าทักมาเร่งงาน ทีมงานจะดำเนินงานให้ตามคิวเท่านั้น <br />
                </div>
              </div>

              <div className="price-info">
                <div className="price">ราคา {post.price} ฿</div>
              </div>

              <form className="order-form" action="">
                <div className="text-field">
                  <label htmlFor="username">ชื่อใน Roblox : Username</label>
                  <input
                    type="text"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="text-field">
                  <label htmlFor="password">รหัสผ่าน Roblox : Password</label>
                  <input
                    type="text"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="text-field">
                  <label htmlFor="info">
                    ช่องทางการติดต่อ : ลิ้ง Facebook (สำหรับแจ้งความคืบหน้า)
                  </label>
                  <input
                    type="text"
                    id="info"
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>

                <div className="text-field">
                  <label htmlFor="redmail">
                    กรุณาทำเมลแดง :
                    ทำแล้ว/หากทำไม่เป็นให้ทักสอบถามแอดมินเพจได้เลย
                  </label>
                  <input type="text" id="redmail" />
                </div>

                <div className="text-field">
                  <label htmlFor="warning">
                    ห้ามเข้าแทรกหากจ้างฟาร์ม : เข้าใจ/ ไม่เข้าใจ
                  </label>
                  <input type="text" id="warning" />
                </div>

                <div className="text-field">
                  <label htmlFor="note">หมายเหตุถึงร้านค้า</label>
                  <textarea
                    name="note"
                    id="note"
                    rows={5}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>

                <div className="interaction">
                  {error && <p className="interaction-error">{error}</p>}
                  <p className="interaction-error">ชิบหายแล้ว</p>
                  <button className="bBtn" onClick={handleOrder}>
                    สั่งซื้อตอนนี้เลย
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        {post && (post.type === "id" || post.type === "code") ? (
          <div className="more-items">
            <div className="more-items-title">สิ่งที่คุณอาจสนใจ</div>
            <div className="more-items-body">
              {view && view.length > 0 ? (
                view.map((v) => (
                  <div className="item" key={v.id}>
                    <div className="item-image">
                      {v.file_type === "video" ? (
                        <video autoPlay loop muted>
                          <source src={`../upload/${v.img}`} type="video/mp4" />
                        </video>
                      ) : (
                        <img src={`../upload/${v.img}`} alt="280*280" />
                      )}
                    </div>
                    <p className="item-title">{v.title}</p>
                    <Link to={`/order/${v.id}`}>
                      <button>เพิ่มเติม</button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="post">
                  <div className="img">
                    <img src="" alt="280*280" />
                  </div>
                  <h2>ยังไม่มีสินค้าแนะนำ</h2>
                  <button>เพิ่มเติม</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default OrderDetails
