import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiDeviceRotateBold } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CryptoJS from "crypto-js";
import Add from "../img/edit.png";

const AddCode = () => {
  const { id } = useParams()
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState("");
  const [img, setImg] = useState(null);
  const [textareaContent, setTextareaContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/option/code");
      setPosts(res.data);

      if (id) {
        const selectedPost = res.data.find((post) => post.id === parseInt(id));
        console.log(selectedPost)
        if (selectedPost) {
          setSelectedPost(selectedPost.id);
          setImg(selectedPost.img);
          console.log("Image URL: ", selectedPost.img);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleSelectPost = (selectedOption) => {
    const selectedPostId = selectedOption ? selectedOption.value : null;
    setSelectedPost(selectedPostId);
    const selectedPost = posts.find(post => post.id === parseInt(selectedPostId));
    if (selectedPost) {
      setImg(selectedPost.img);
    }
    // const selectedPostId = e.target.value;
    // setSelectedPost(selectedPostId);
    // const selectedPost = posts.find(
    //   (post) => post.id === parseInt(selectedPostId)
    // );
    // if (selectedPost) {
    //   setImg(selectedPost.img);
    // }
  };

  const parseTextareaContent = (content) => {
    return content.split("\n").map((line) => {
      const code = line.trim(); // Trim whitespace from the line
      return {
        code,
        selectedPost,
      };
    });
  };

  const handleSubmit = async () => {
    //parse data from textArea to object variable
    const parsedData = parseTextareaContent(textareaContent);
    try {
      // post the dataSets which is parsedData
      const res = await axios.post("/api/posts/code", {
        dataSets: parsedData,
      });
      Swal.fire({
        title: "Success",
        text: res.data,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error submitting data", error);
      if (error.response && error.response.status === 500) {
        console.log(err);
        Swal.fire({
          title: "Oops...",
          text: error,
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ลองใหม่",
        });
      }
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const options = posts.map(item => ({
    value: item.id,
    label: item.title,
  }));

  const animatedComponents = makeAnimated();  


  return (
    <div className="addIdPass">
      <div className="header">
        <h4>เพิ่มสต็อกสินค้ารูปแบบ Code</h4>
        <div>
          {/* <Link to="/admin/addIdPass">
            <PiDeviceRotateBold size={40} />
          </Link> */}

            <div className="buttonSec">
              <div></div>
            <Link to='/admin/editidpass' className='editStock'>
                <button> จัดการสต็อก </button>
            </Link>
            </div>
            {/* <Link to="/admin/editidpass">
              <img src={Add} alt="" />
            </Link> */}
        </div>
      </div>

      <div className="addDiv">
        <div className="inputs">
          <div className="postsLabel">
            <label htmlFor="">เลือกสินค้า</label>
            <Select
              value={options.find(option => option.value === selectedPost)}
              onChange={handleSelectPost}
              components={animatedComponents}
              options={options}
              closeMenuOnSelect={true}
              className="Select"
              placeholder="Select a post"
            />
            {/* <select name={selectedPost} onChange={handleSelectPost}>
              <option value="" disabled>
                Select an option
              </option>
              {posts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select> */}
          </div>

          <div className="idPass">
            <label htmlFor="id">ช่องกรอกโค้ต</label>
            <textarea
              value={textareaContent}
              onChange={(e) => setTextareaContent(e.target.value)}
              placeholder="1. เลือกสินค้า
2. กรอกโค้ด format: 
 code1
 code2
 code3
 ..."
              rows="10"
              cols="50"
            />
          </div>

          <div className="buttons">
            <button className="greenBtn" onClick={handleSubmit}>
              เพิ่มสต็อก
            </button>
            <button className="redBtn" onClick={handleCancel}>
              ยกเลิก
            </button>
          </div>
        </div>

        <div className="img">
        {img && <img src={`/upload/${img}`} alt="รูปภาพของสินค้า" />}
          {/* <img src={`../upload/${img}`} alt="ทดสอบ" /> */}
        </div>
      </div>
    </div>
  );
};

export default AddCode;