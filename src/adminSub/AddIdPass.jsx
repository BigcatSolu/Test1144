import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PiDeviceRotateBold } from "react-icons/pi";
import Swal from 'sweetalert2'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CryptoJS from 'crypto-js';
import Add from '../img/edit.png'

const AddIdPass = () => {
  const { id } = useParams()
  const [posts, setPosts] = useState([])
  // const [selectedPost, setSelectedPost] = useState('');
  // const [img, setImg] = useState(null)
  //**EDIT*/
  const [selectedPost, setSelectedPost] = useState("");
  //**EDIT*/
  const [img, setImg] = useState(null);
  const [textareaContent, setTextareaContent] = useState("");

  console.log(selectedPost)
  console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/option/id`)
      // console.log(res.data)
      setPosts(res.data)

      if (id) {
        const selectedPost = res.data.find((post) => post.id === parseInt(id));
        console.log(selectedPost)
        if (selectedPost) {
          setSelectedPost(selectedPost.id);
          setImg(selectedPost.img);
          console.log("Image URL: ", selectedPost.img);
        }
      }
    }
    fetchData()
    //**EDIT*/

      //**EDIT*/
  },[id])

  useEffect(() => {
    console.log("img state updated: ", img); // Log the img state update
  }, [img]);

  console.log(img)

  const handleSelectPost = (selectedOption) => {
    const selectedPostId = selectedOption ? selectedOption.value : null;
    setSelectedPost(selectedPostId);
    const selectedPost = posts.find(post => post.id === parseInt(selectedPostId));
    if (selectedPost) {
      setImg(selectedPost.img);
    }
    // const selectedPostId = e.target.value;
    // setSelectedPost(selectedPostId);
    // const selectedPost = posts.find(post => post.id === parseInt(selectedPostId));
    // if (selectedPost) {
    //   setImg(selectedPost.img);
    // }
  };

  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  // const [code, setCode] = useState("")
  
  const encryptPassword = (password) => {
    if (password.length === 0) {
      return
    }
      const ciphertext = CryptoJS.AES.encrypt(password, 'Hello-Dude-One').toString();
      return ciphertext;
  };

  // const [textareaContent, setTextareaContent] = useState("")

  const parseTextareaContent = (content) => {
    return content.split("\n").map((line) => {
      const [username, password, email] = line.split(":");
      return {
        username: username?.trim() || "",
        password: password?.trim() || "",
        email: email ? email.trim() : null,
        selectedPost: selectedPost,
      };
    });
  };

  const handleSubmit = async () => {
    const parsedData = parseTextareaContent(textareaContent);
    //Encrypt every password inside the data
    const encryptedDataSets = parsedData.map((dataSet) => ({
      ...dataSet,
      password: encryptPassword(dataSet.password),
    }));

    try {
      const res = await axios.post('/api/posts/account', {
        dataSets: encryptedDataSets,
      })
      Swal.fire({
        title: "Success",
        text: res.data,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
        
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Swal.fire({
          title: "Oops...",
          text: error,
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ลองใหม่"
        })
        console.log(error)
      }
    }
  }

  const handleCancel = () => {
    window.location.reload()
  }

  console.log("POSTS IS", posts)

  const options = posts.map(item => ({
    value: item.id,
    label: item.title,
  }));

  const animatedComponents = makeAnimated();  

  return (
    <div className="addIdPass">
      <div className="header">
        <h4>เพิ่มสต็อกสินค้ารูปแบบ Id / pass</h4>
        {/**EDIT addCode/1 is now a params*/}

        {/* <Link to="/admin/addcode/1">
            *EDIT
            <PiDeviceRotateBold size={40} />
          </Link> */}

        <div className="buttonSec">

          <Link to="/admin/addcode" className='link'>
            {/* <img src={Add} alt="" /> */}
            <button> เพิ่มสินค้าโค้ต </button>
          </Link>
          <Link to='/admin/editidpass' className='editStock'>
                <button> จัดการสต็อก </button>
          </Link>
      </div>
      </div>

      <div className="addDiv">
        <div className="inputs">
          <div className="postsLabel">
            <label htmlFor="">เลือกสินค้า</label>
            <Select
              value={options.find(option => option.value === selectedPost)}
              // value={id}
              onChange={handleSelectPost}
              components={animatedComponents}
              options={options}
              closeMenuOnSelect={true}
              name={selectedPost}
              className='Select'
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
            <label htmlFor="id">เพิ่มสต็อก ไอดี-รหัสผ่าน</label>
            <textarea
              id="id"
              value={textareaContent}
              onChange={(e) => setTextareaContent(e.target.value)}
              placeholder="1. เลือกสินค้า 
2. กรอกข้อมูล format: (email ถ้ามีใส่)
 username1:password1:email
 username2:password2:email
 username3:password3:email
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
        {img && (
                img.endsWith('.mp4') ? (
                  <video autoPlay loop muted>
                    <source src={`/upload/${img}`} type="video/mp4" />
                  </video>
                ) : (
                  <img src={`/upload/${img}`} alt="รูปภาพของสินค้า" />
                )
        )}


        </div>
      </div>
    </div>
  );
}

export default AddIdPass
