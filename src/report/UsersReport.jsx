import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const UsersReport = () => {

    const [title, setTitle] = useState("")
    const [contact, setContact] = useState("")
    const [description, setDescription] = useState("")
    const [img, setImg] = useState(null)

    const navigate = useNavigate()

    const upload = async () => {
        try{
          const formData = new FormData()
          formData.append("file", img)
          const res = await axios.post("/api/uploads", formData)
          return res.data
        }catch(err){
          console.log("ERROR:",err)
          console.log("Hello Error")
        }
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const files = await upload()

        try {
            const res = await axios.post('api/report', {
                title,
                description,
                contact,
                img: files
            })
            console.log(res)
            Swal.fire({
              title: "Success",
              text: res.data,
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK"
              
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/')
              }
            });
        } catch (error) {
            // console.log("ERROR:", error)
            Swal.fire({
              title: "Oops...",
              text: err.response,
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ลองใหม่"
            })
        }
    }

    const handleCancel = () => {
      navigate('/report')
    }

  return (
    <div className="userReport">
      <div className="container">
        <form action="">
          <div className="title">
            <label htmlFor="title">หัวข้อ</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="หัวข้อเรื่องที่ต้องการจะแจ้ง" onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="contact">
            <label htmlFor="contact">ข้อมูลสำหรับติดต่อกลับ</label>
            <input type="text" id='contact' name='contact' placeholder='ข้อมูลสำหรับติดต่อกลับ' onChange={(e) => setContact(e.target.value)}/>
          </div>

          <div className="description">
            <label htmlFor="description">ข้อความที่ต้องการแจ้ง</label>
            <textarea name="description" id="description" placeholder='ข้อความที่ต้องการแจ้ง' rows={15} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <div className="img">
            <p>อัปโหลดรูปภาพของคุณ</p>
            <label htmlFor="uploadImg"><img src={img && URL.createObjectURL(img)} alt="รูปภาพของคุณ" /></label>
            
            <input type="file" id='uploadImg' name='uploadImg' style={{display: "none"}} onChange={(e) => setImg(e.target.files[0])}/>
          </div>
          
          <div className="buttons">
            <button className='greenBtn' onClick={handleSubmit}>ยืนยัน</button>
            <button className='redBtn' onClick={handleCancel}>ยกเลิก</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsersReport
