import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBanner = () => {
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
            const res = await axios.post('/api/banners/add', {img: files})
            console.log(res)
            
            navigate('/admin/banner')
        } catch (error) {
            console.log("ERROR", error)
        }
    }

  return (
    <div className='addBanner'>
        <div className="header">
            <h4>เพิ่มBanner</h4>
        </div>

            <label htmlFor="img" className='example'>
            {img ? (
                    img.type.startsWith("image/") ? (
                        <img src={img && URL.createObjectURL(img)} alt="อัปโหลดแบนเนอร์" />
                    ) : (
                        <video controls>
                            <source src={img && URL.createObjectURL(img)} type={img.type} />
                        </video>
                    )
                ) : (
                    <div>อัปโหลดแบนเนอร์</div>
                )}
            {/* <img src={img && URL.createObjectURL(img)} alt="อัปโหลดแบนเนอร์" /> */}
            <input type="file" id='img' name='img' style={{display: "none"}} onChange={(e) => setImg(e.target.files[0])}/>
            </label>
            

        <div className="buttons">
            <button className='greenBtn' onClick={handleSubmit}>Add</button>
            {/* <button className='redBtn'>Cancel</button> */}
        </div>
    </div>
  )
}

export default AddBanner
