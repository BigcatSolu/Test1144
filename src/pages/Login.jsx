import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)
  
  const handleChange = (e) => {
    setInputs(prev=> ({...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "ล็อคอินสำเร็จ"
      });
      navigate("/")
    } catch(err) {
      Swal.fire({
        title: "Oops...",
        text: err.response.data,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ลองใหม่"
      }).then((result) => {
        if (result.isConfirmed) {

          navigate('/login')
        
        }
      });
      setErr(err.response)

    }
  }

  return (
    <div className="loginPage">
      <div className="container">
        <fieldset>
            <legend><h1>เข้าสู่ระบบ</h1></legend>
          <div className="title">
            <h2>ชื่อร้าน ร้านขายไอเทมเกม</h2>
          </div>
          <hr />

          <form action="">
            <div className="formCon">
              <div className="username">
                <label htmlFor="username" >username <span className='red'>*</span> </label>
                <input type="text" name="username" placeholder="ชื่อบัญชีผู้ใช้งาน" onChange={handleChange}/>
              </div>
              <div className="passWrap">

                <div className="password">
                    <label htmlFor="password">password <span className='red'>*</span></label>
                    <input type="text" name="password" placeholder="รหัสผ่าน" onChange={handleChange}/>
                </div>

              </div>

              <div className="capcha"> <h3>Capcha</h3> </div>

              <div className="buttons">
                <button className="greenBtn" onClick={handleSubmit}>เข้าสู่ระบบ</button>
                <Link to='/forgotpassword' className='forget'>
                <button className="redBtn forget">ลืมรหัสผ่าน</button>
                </Link>
              </div>

              <div className="text">
                <p>ฉันยังไม่ได้เป็นสมาชิก <Link className="links" to='/register'>" สมัครสมาชิก "</Link></p>
              </div>
            </div>


          </form>

        </fieldset>

      </div>
    </div>
  )
}

export default Login
