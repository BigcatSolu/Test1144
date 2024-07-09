import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import './AdminEditPost.css'

function AdminEditPost() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [reservedImage, setReservedImage] = useState(null);
  const [imageUpdated, setImageUpdated] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [postData, setPostData] = useState({
    id: "",
    cate: "",
    type: "",
    title: "",
    des: "",
    img: "",
    price: "",
    oldPrice: "",
    warn: "",
    oldFile: "",
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      console.log("OLD_PRICE", res.data);
      const postData1 = res.data
      console.log(postData1)
      setPostData((prev) => ({
        ...prev,
        id: res.data.id,
        cate: res.data.cate,
        type: res.data.post_type,
        title: res.data.title,
        des: res.data.des,
        img: res.data.img,
        price: res.data.price,
        oldPrice: res.data.oldPrice,
        warn: res.data.warn,
        file_type: res.data.file_type,
      }));

      setFile(`/upload/${res.data.img}`);
      setOriginalImage(`/upload/${res.data.img}`);
      setReservedImage(`/upload/${res.data.img}`);

      if (postData1.display_date && postData1.display_time) {
        setIsChecked(true);
      }
    } catch (err) {
      console.log("ERROR:" + err);
    }
  };

  console.log(postData)
  console.log(typeof file)

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/uploads", formData);
      return res.data;
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedData = { ...postData };
    if (imageUpdated === true) {
      updatedData.img = await upload();
      updatedData.oldFile = reservedImage;
    }

    try {
      const res = await axios.put(`/api/posts/update/${id}`, updatedData);
      if (res.status === 500) {
        throw new Error(res.data);
      }
      if (res.status === 200) {
        console.log("response reached");
        Swal.fire({
          title: "Success",
          text: res.data,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/admin/posts-management')
            // window.location.reload();
          }
        });
      }
    } catch (err) {
      console.log("ERROR:" + err);
      Swal.fire({
        title: "Oops...",
        text: err,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ลองใหม่",
      });
    }
  };

  const handleChange = (e) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setOriginalImage(e.target.files[0]);
      setImageUpdated(true);
    }
  };

  const handleCancel = (e) => {
    if (!e.target.value && imageUpdated === false) {
      //กด cancel ตอนรูปเป็นอันเดิมเท่านั้น
      setFile(originalImage);
    }
  };
  console.log(file);
  console.log(imageUpdated);
  useEffect(() => {
    fetchData();
  }, [id]);
  console.log(postData);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      handleCheck();
    } else {
      unCheck();
    }
  };

  const unCheck = async () => {
    try {
      const res = await axios.put('/api/posts/undisplay', {
        id: postData.id
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
    console.log('Checkbox is unchecked, handling uncheck...');
  };

  const handleCheck = async () => {
    // Your function logic here
    try {
      const res = await axios.put('/api/posts/display', {
        id: postData.id
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
    console.log('Checkbox is checked, handling submit...');
    // Add your form submission or other logic here
  };

  const isVideo = (file) => {
    if (!file) return false;
    const videoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (typeof file === 'object') {
      return videoTypes.includes(file.type);
    }
    return videoTypes.some(type => file.endsWith(type.split('/')[1]));
  };


  const handleDelete = async (e) => {
    e.preventDefault()

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          const res = await axios.delete('/api/posts/delete', {
            data: {
              id: postData.id
            }
          })
          console.log(res)
        } catch (error) {
          console.log(error)
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          timer: 1500
        });
        setTimeout(() => {
          navigate('/admin/posts-management')
        }, 1500)
      }
    });

  }

  return (
    <div className="adminLayout">
      <Sidebar />

      <div className="mainContent">
        <div className="edit-container">
          <div className="title-box">
            <h3 className="title">แก้ไขสินค้า</h3>
            <div className="post-identifier">
              <div className="post-id">
                #id: <div className="index">{postData.id}</div>
              </div>
              <div className="post-category">
                #cate: <div className="index">{postData.cate}</div>
              </div>
              <div className="post-check">
                <label class="switch">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                  />
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* onSubmit={handleSubmit} */}

          <form className="body-box" >
            <div className="info-box">
              <div className="info-box-details">
                <div className="image">
                  <label htmlFor="file" className="image-label">
                    <div className="image-box">
                     
                      {postData.file_type === 'video' || file && typeof file === "object" ? (
                        <video autoPlay loop muted>
                          <source
                            src={file && typeof file === "object" ? URL.createObjectURL(file) : `/upload/${postData.img}`}
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        <img
                          src={
                            file && typeof file === "object"
                              ? URL.createObjectURL(file)
                              : file
                          }
                          alt="อัปโหลดรูปภาพ"
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    onClick={(e) => handleCancel(e)}
                  />
                </div>
                <div className="text-field">
                  <label htmlFor="title">ชื่อกล่อง: </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={postData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="info-box-details">
                <div className="text-field">
                  <label htmlFor="des">รายละเอียด: </label>
                  <textarea
                    type="text"
                    name="des"
                    id="des"
                    rows={5}
                    value={postData.des}
                    onChange={handleChange}
                  />
                </div>

                <div className="price-field">
                  <div className="price-container">
                    <label htmlFor="price">ราคาปัจจุบัน: </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={postData.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="price-container">
                    <label htmlFor="title">ราคาเก่า: </label>
                    <input
                      type="text"
                      name="oldPrice"
                      id="oldPrice"
                      placeholder="0.00"
                      value={postData.oldPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* 
                <div className="text-field">
                  <label htmlFor="title">ราคาเก่า: </label>
                  <input
                    type="text"
                    name="oldPrice"
                    id="oldPrice"
                    placeholder="0.00"
                    value={postData.oldPrice}
                    onChange={handleChange}
                  />
                </div> */}

                <div className="text-field">
                  <label htmlFor="title">การรับประกัน: </label>
                  <textarea
                    type="text"
                    name="warn"
                    id="warn"
                    rows={6}
                    value={postData.warn}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="button-box">
              <Link to="/admin/posts-management">ย้อนกลับ</Link>
              <div className="buttons">
              <button className="redBtn" onClick={handleDelete}>ลบ</button>
              <button type="submit" onClick={handleSubmit}>บันทึก</button>
              </div>
                
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditPost;
