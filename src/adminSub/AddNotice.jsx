import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddNotice = () => {

    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const res = await axios.post('/api/notice/add', {
                msg: msg
            })
            console.log(res.data.message)
            Swal.fire({
                title: "Success",
                text: res.data.message,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
                
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/admin/notice')
                }
              });
            console.log("PASS")
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div className='addNotice'>
      <div className="header">
        <h4>เพิ่มประกาศ</h4>
      </div>

    <div className="msg">

      <textarea name="msg" id="msg" rows={20} cols={100} placeholder='โปรดกรอกประกาศของคุณ' onChange={(e) => setMsg(e.target.value)}></textarea>
      <button className='greenBtn' onClick={handleSubmit}>เพิ่มประกาศของคุณ</button>
    </div>
    </div>
  )
}

export default AddNotice
