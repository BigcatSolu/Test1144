import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {

  const [input, setInput] = useState({
    email: '',
    username: '',
    password: '',
    phonefb: ''
  })

  const [err, setErr] = useState(null)
 
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput(prev=>({...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (input.password !== input.confirmPassword) {
      // Display SweetAlert
      Swal.fire({
        title: "Error",
        text: "รหัสผ่านของคุณไม่ตรงกันโปรดลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      });
      return; // Exit the function early
    }

    console.log("Hello")

    if (!/^\S+@\S+\.\S+$/.test(input.email)) {
      Swal.fire({
        title: "Error",
        text: "กรุณากรอกอีเมล",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      });
      return; // Exit the function early
    }
    console.log("Hello2")

    try {
      const res = await axios.post('/api/auth/register', input)
      console.log("Hello3")
      console.log(res)
      // console.log(res.data)
      Swal.fire({
        title: "Success",
        text: res.data,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {

          navigate('/login')
        
        }
      });
      setErr(null);

    } catch (err) {
      console.log(err)

      

      if (err.response && err.response.status === 409) {
        Swal.fire({
          title: "Oops...",
          text: err.response.data,
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ไปยังหน้าล็อคอิน"
        }).then((result) => {
          if (result.isConfirmed) {

            navigate('/login')
          
          }
        });
      } else {
        setErr(err.response)
      }
    }
  }
 
  return (
    <div className="register">
      <div className="container">
        <fieldset>
            <legend><h1>สมัครสมาชิก</h1></legend>
          <div className="title">
            <h2>ชื่อร้าน ร้านขายไอเทมเกม</h2>
          </div>
          <hr />

          <form action="">
            <div className="formCon">
              <div className="username">
                <label htmlFor="username" >username <span className='red'>*</span></label>
                <input type="text" name="username" placeholder="ชื่อบัญชีผู้ใช้งาน" onChange={handleChange}/>
              </div>
              <div className="passWrap">

                <div className="password">
                    <label htmlFor="password">password <span className='red'>*</span></label>
                    <input type="text" name="password" placeholder="รหัสผ่าน" onChange={handleChange}/>
                </div>
                <div className="confirmPassword">
                <label htmlFor="confirmPassword">confirm password <span className='red'>*</span></label>
                    <input type="text" name="confirmPassword" placeholder="ยืนยันรหัสผ่าน" onChange={handleChange}/>
                </div>

              </div>

              <div className="emailWrap">

                <div className="email">
                <label htmlFor="email">email <span className='red'>*</span></label>
                    <input type="email" name="email" placeholder="อีเมล" onChange={handleChange}/>
                </div>
                <div className="phone">
                <label htmlFor="phone">phone & facebook(ถ้ามี)</label>
                    <input type="text" name="phonefb" placeholder="(ถ้ามี) เบอร์โทรศัพท์ หรือ ลิ้งค์เฟสบุ๊ค" onChange={handleChange}/>
                </div>
              </div>

              <div className="capcha"> <h3>Capcha</h3> </div>

              <div className="terms">
                <input type="checkbox" />
                <p>ข้าพเจ้ายอมรับนโยบายความเป็นส่วนตัว และ <Link to='/?ข้อตกลง'> ข้อตกลงการใช้บริการ </Link></p>
              </div>

              <div className="buttons" >
                <button className="greenBtn" onClick={handleSubmit}>สมัครสมาชิก</button>
                <button className="redBtn">ยกเลิก</button>
              </div>

              <div className="text">
                <p>ฉันเป็นสมาชิกอยู่แล้ว <Link className="links" to='/login'>" เข้าสู่ระบบ "</Link></p>
              </div>
            </div>


          </form>

        </fieldset>

      </div>
    </div>
  );
};

export default Register;
