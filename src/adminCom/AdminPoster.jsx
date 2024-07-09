import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminPoster = () => {

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
        console.log(files)
        try {
            const res = await axios.post('/api/poster/add', {img: files})
            console.log(res)
            
            navigate('/admin/poster')
        } catch (error) {
            console.log("ERROR", error)
        }
    }

  return (
    <div className='adminLayout'>
        <Sidebar />

        <div className="mainContent">
            <div className="product">
            <div className='addBanner'>
        <div className="header">
            <h4>เพิ่ม Poster</h4>
        </div>

            <label htmlFor="img" className='example'>
            {img ? (
                    img.type.startsWith("image/") ? (
                        <img src={img && URL.createObjectURL(img)} alt="" />
                    ) : (
                        <video controls>
                            <source src={img && URL.createObjectURL(img)} type={img.type} />
                        </video>
                    )
                ) : (
                    <div>อัปโหลดโปสเตอร์</div>
                )}
            {/* <img src={img && URL.createObjectURL(img)} alt="อัปโหลดแบนเนอร์" /> */}
            <input type="file" id='img' name='img' style={{display: "none"}} onChange={(e) => setImg(e.target.files[0])}/>
            </label>
            

        <div className="buttons">
            <button className='greenBtn' onClick={handleSubmit}>Add</button>
            {/* <button className='redBtn'>Cancel</button> */}
        </div>
    </div>
            </div>
        </div>
      
    </div>
  )
}

export default AdminPoster
