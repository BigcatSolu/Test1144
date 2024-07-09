import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Order = ( { post } ) => {
    const [error, setError] = useState(false)

    const formatDescription = (description) => {
        return description ? description.split(',').join('\n') : '';
      };
      
      const [username, setUsername] = useState("")
      const [password, setPassword] = useState("")
      const [contact, setContact] = useState("")
      const [note, setNote] = useState("")
      const [redmail, setRedMail] = useState('')
      const [cookie, setCookie] = useState('')
      const [warning, setWarning] = useState('')
      const navigate = useNavigate()
      const [selectedOption, setSelectedOption] = useState(null);

      const { currentUser, refreshUserData } = useContext(AuthContext)

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
              navigate('/changepassword')
            }
          });
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <>
    <div className="detailsTitle">
      <h3>{post.title}</h3>
    </div>
    <div
      className="orderPreorderDetails"
      dangerouslySetInnerHTML={{
        __html: formatDescription(post.des),
      }}
    ></div>
    <div className="warranty">
      ► หลังฟาร์มสำเร็จแล้วควรเปลี่ยน"รหัสผ่าน" ใหม่ทุกครั้ง{" "}
      <br />
      ► เมื่อกดซื้อบริการแล้วจะไม่มีการคืนเงินนะครับ <br />
      ► อย่าทักมาเร่งงาน ทีมงานจะดำเนินงานให้ตามคิวเท่านั้น <br />
    </div>
    <div className="priceInfo">
      <div className="price">ราคา {post.price} ฿</div>
    </div>

    {/* กรอกแบบฟอร์ม */}
    <form action="">
      <label htmlFor="username">ชื่อใน Roblox : Username</label>
      <input type="text" id='username' onChange={(e) => setUsername(e.target.value)} required placeholder='username or email'/>

      <label htmlFor="password">รหัสผ่าน Roblox : Password</label>
      <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} required placeholder='password'/>

      <label htmlFor="cookie">โปรดกรอก cookie ของคุณ</label>
      <input type="text" id='cookie' name='cookie' placeholder='cookie123456789' onChange={(e) => setCookie(e.target.value)}/>

      <label htmlFor="info">ช่องทางการติดต่อ : ลิ้ง Facebook (สำหรับแจ้งความคืบหน้า)</label>
      <input type="text" id='info' onChange={(e) => setContact(e.target.value)} required placeholder='ช่องทางการติดต่อ'/>

      <label htmlFor="redmail">กรุณาทำเมลแดง : ทำแล้ว/หากทำไม่เป็นให้ทักสอบถามแอดมินเพจได้เลย</label>
      <input type="text" id='redmail' placeholder='โปรดกรอกคำว่า ทำแล้ว' onChange={(e) => setRedMail(e.target.value)}/>

      <label htmlFor="warning">ห้ามเข้าแทรกหากจ้างฟาร์ม : เข้าใจ/ ไม่เข้าใจ</label>
      <input type="text" id='warning' placeholder='โปรดกรอกคำว่า เข้าใจ' onChange={(e) => setWarning(e.target.value)}/>


      <div className="checkBoxes">
      {post && post.op1 && (
          
          <div className={`checkbox ${selectedOption === 'op1' ? 'show' : ''}`} onClick={() => handleSelectOption('op1')}>
          <div className="checkImg">
            <img src="/profiles/5.jpg" alt="" />
          </div>
          <div className="optionText">
          <p> {post.op1} </p>
          </div>
        </div>
        )}
      {post && post.op2 && (
          
          <div className={`checkbox ${selectedOption === 'op2' ? 'show' : ''}`} onClick={() => handleSelectOption('op2')}>
          <div className="checkImg">
            <img src="/profiles/5.jpg" alt="" />
          </div>
          <div className="optionText">
          <p> {post.op2} </p>
          </div>
        </div>
        )}
      {post && post.op3 && (
          
          <div className={`checkbox ${selectedOption === 'op3' ? 'show' : ''}`} onClick={() => handleSelectOption('op3')}>
          <div className="checkImg">
            <img src="/profiles/5.jpg" alt="" />
          </div>
          <div className="optionText">
          <p> {post.op3} </p>
          </div>
        </div>
        )}
      {post && post.op4 && (
          
          <div className={`checkbox ${selectedOption === 'op4' ? 'show' : ''}`} onClick={() => handleSelectOption('op4')}>
          <div className="checkImg">
            <img src="/profiles/5.jpg" alt="" />
          </div>
          <div className="optionText">
          <p> {post.op4} </p>
          </div>
        </div>
        )}
      {post && post.op5 && (
          
          <div className={`checkbox ${selectedOption === 'op5' ? 'show' : ''}`} onClick={() => handleSelectOption('op5')}>
          <div className="checkImg">
            <img src="/profiles/5.jpg" alt="" />
          </div>
          <div className="optionText">
          <p> {post.op1} </p>
          </div>
        </div>
        )}
      {post && post.op6 && (
          
          <div className={`checkbox ${selectedOption === 'op6' ? 'show' : ''}`} onClick={() => handleSelectOption('op6')}>
          <div className="checkImg">
            <img src="/profiles/5.jpg" alt="" />
          </div>
          <div className="optionText">
          <p> {post.op1} </p>
          </div>
        </div>
        )}
      {post && post.op7 && (
          
          <div className={`checkbox ${selectedOption === 'op7' ? 'show' : ''}`} onClick={() => handleSelectOption('op7')}>
          <div className="checkImg">
            <img src="/profiles/5.jpg" alt="" />
          </div>
          <div className="optionText">
          <p> {post.op1} </p>
          </div>
        </div>
        )}
      {post && post.op8 && (
          
          <div className={`checkbox ${selectedOption === 'op8' ? 'show' : ''}`} onClick={() => handleSelectOption('op8')}>
          <div className="checkImg">
            <img src="/profiles/5.jpg" alt="" />
          </div>
          <div className="optionText">
          <p> {post.op1} </p>
          </div>
        </div>
        )}

      </div>
      <label htmlFor="note">หมายเหตุถึงร้านค้า</label>
      <textarea name="note" id="note" rows={5} onChange={(e) => setNote(e.target.value)} placeholder='สิ่งที่อยากฝากถึงแอดมินเพิ่มเติม'></textarea>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* <button class="button">
      <p>Button</p>
    </button> */}
      <button className='greenBtn orderBuy' onClick={handleOrder}>สั่งซื้อตอนนี้เลย</button>
    </form>
  </>
  )
}

export default Order
