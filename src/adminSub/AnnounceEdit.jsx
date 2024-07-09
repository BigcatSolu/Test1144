import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'

const AnnounceEdit = () => {

    const { id } = useParams(); // Retrieve the announce_id from the URL parameter
  const [announce, setAnnounce] = useState(null);

    const [content, setContent] = useState("")
    const [file, setFile] = useState(null)
    const navigate =  useNavigate()


      useEffect(() => {
        const fetchAnnounce = async () => {
          const res = await axios.get(`/api/announce/${id}`);
          setAnnounce(res.data[0]);
          setContent(res.data[0].announce_content || "");
        };
        fetchAnnounce();
      }, [id]); 
      console.log(content)
      console.log(announce)
      
      
    const upload = async () => {
        try{
          const formData = new FormData()
          formData.append("file", file)
          const res = await axios.post("/api/uploads", formData)
          return res.data
        }catch(err){
          console.log("ERROR:",err)
          console.log("Hello Error")
        }
      }

    const { currentUser } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const files = file ? await upload() : announce.announce_content_img

        try {
            const res = await axios.post('/api/announce/add', {
                content,
                file: files,
                userId: currentUser.user_username,
                userimg: currentUser.user_img,
            })
            console.log(res)
            Swal.fire({
                title: "Are you sure?",
                text: "คุณแน่ใจหรือไม่ที่จะอัปโหลดข่าวสาร",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, upload it!"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Uploaded",
                    text: res.data,
                    icon: "success",
                    timer: 1500
                  });
                }
              navigate('/admin/announce')

              });
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (e) => {
      e.preventDefault()

        Swal.fire({
          title: "Are you sure?",
          text: "คุณแน่ใจหรือไม่ที่จะแก้ไขข่าวสาร",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Edit it!"
        }).then( async (result) => {
          if (result.isConfirmed) {
      const files = file ? await upload() : announce.announce_content_img

              const res = await axios.put('/api/announce/update', {
                content,
                file: files,
                announceId: announce.announce_id
              })


            Swal.fire({
              title: "Edit Confirmation",
              text: res.data,
              icon: "success",
              timer: 1500
            });
          }
        
        
        navigate('/admin/announce')

        });


    }

  return (
    <div className="adminAddAnnounce">
      <div className="header">
        <h4>เพิ่มข่าวสาร</h4>
      </div>

      <div className="content">
        <div className="description">
          <div>Description:</div>
          <textarea
            name="text"
            id="text"
            value={content}
            rows={16}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="file">
          <div>File:</div>
          <label htmlFor="file">
            {file ? (
              <p>{file.name} </p>
            ) : (
              <p>
                {" "}
                {announce && announce.announce_content_img
                  ? announce.announce_content_img
                  : "อัปโหลดรูปภาพของคุณ"}
              </p>
            )}
          </label>
          <input
            type="file"
            id="file"
            name="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="button">
          {id ? (
            <button onClick={handleUpdate}>แก้ไขข่าวสาร</button>
          ) : (
            <button onClick={handleSubmit}>อัปโหลดข่าวสาร</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnnounceEdit
