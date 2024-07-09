import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './AdminUpload.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const AdminUpload = () => {

    const [title, setTItle] = useState('')
    const [des, setDes] = useState('')
    const [file, setFile] = useState(null)
    const [cate, setCate] = useState('')
    const [warn, setWarn] = useState('')
    const [price, setPrice] = useState()
    const [type, setType] = useState(null)
    const [selectedPost, setSelectedPost] = useState("");
    const [op1, setOp1] = useState('')
    const [op2, setOp2] = useState('')
    const [op3, setOp3] = useState('')
    const [op4, setOp4] = useState('')
    const [op5, setOp5] = useState('')
    const [op6, setOp6] = useState('')
    const [op7, setOp7] = useState('')
    const [op8, setOp8] = useState('')
    const [time, setTime] = useState(null)

    const navigate = useNavigate()
    console.log(time)
    
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const files = await upload()

        try {
            const res = await axios.post("/api/posts", {
                title,
                des,
                file: files,
                cate,
                warn,
                price,
                type: type.value,
                op1: op1,
                op2: op2,
                op3: op3,
                op4: op4,
                op5: op5,
                op6: op6,
                op7: op7,
                op8: op8,
                start_time: time
            })
            console.log(res.data)
            Swal.fire({
                title: "Success",
                text: res.data.message,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
              }).then((result) => {
                if (result.isConfirmed) {
        
                  navigate('/admin')
                
                }
              });
        } catch (err) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.data
              });
              return;
        }
    }

    const [category, setCategory] = useState([])
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get('/api/category')
        setCategory(res.data)
      }
      fetchData()
    },[])

    const handleSelectCate = (e) => {
      setCate(e.target.value);
    };

    const handleSelectType = (selectedOption) => {
      setType(selectedOption);
      console.log(selectedOption.value)
    };

    const [status, setStatus] = useState("")

    const handleStatusValue = (e) => {
      setStatus(e.target.value)
    }

    useEffect(() => {
      const fetchData =async () => {
        await axios.post('/api/status', {
          status
        })

      }
      fetchData()
    },[status])

    // console.log(cate)
    // console.log(type)

    const handleSelectPost = (selectedOption) => {
      const selectedPostId = selectedOption ? selectedOption.value : null;
      setSelectedPost(selectedPostId);
      const selectedPost = category.find(post => post.category_id === parseInt(selectedPostId));
      if (selectedPost) {
        // console.log(selectedPost)
        setCate(selectedPost.category_id);
        // setImg(selectedPost.img);
      }
      // const selectedPostId = e.target.value;
      // setSelectedPost(selectedPostId);
      // const selectedPost = posts.find(post => post.id === parseInt(selectedPostId));
      // if (selectedPost) {
      //   setImg(selectedPost.img);
      // }
    };

    const animatedComponents = makeAnimated();  

    const options = category.map(item => ({
      value: item.category_id,
      label: item.category_name,
    }));

    const itemType = [
        { value: 'id', label: 'Id' },
        { value: 'code', label: 'Code' },
        { value: 'order', label: 'Order' },
        { value: 'preOrder', label: 'Pre Order' },
        { value: 'afk', label: 'afk' }
    ]

  return (
    <div className="add">
      <div className="addContainer">

        <form action="">
          <div className="category">
            <h4>หมวดหมู่สินค้า</h4>

            <div className="cateDiv">
              <div className="cateDetails">
              <label htmlFor="category">หมวดหมู่</label>
              <Select
              value={options.find(option => option.value === selectedPost)}
              // value={id}
              onChange={handleSelectPost}
              components={animatedComponents}
              options={options}
              closeMenuOnSelect={true}
              isClearable={true}
              name={selectedPost}
              className='Select'
              placeholder="Select a post"
            />
              </div>

              <div className="type">
                <label htmlFor="type">ประเภทสินค้า</label>

              <Select
              // value={options.find(option => option.value === selectedPost)}
              value={type}
              onChange={handleSelectType}
              components={animatedComponents}
              options={itemType}
              closeMenuOnSelect={true}
              isClearable={true}
              name={selectedPost}
              className='Select'
              placeholder="Select a type"
            />
                {/* <select value={type} onChange={handleSelectType}>
                <option value="" disabled>
                    เลือกประเภทสินค้า
                  </option>
                  <option value="id-code">id / code</option>
                  <option value="order-preOrder">order / pre Order</option>
                </select> */}

              </div>
            </div>
          </div>


          <div className="img">
            <h4>อัปโหลดรูปภาพ</h4>

            <div className="imgDetails">
              <label htmlFor="file">
              {file && typeof file === "object" && file.type.startsWith("video/") ? (
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
                              : '/assets/uploadPreview.png'
                          }
                          alt="อัปโหลดรูปภาพ"
                        />
                      )}
                {/* <img src={file && URL.createObjectURL(file)} alt="อัปโหลดรูปภาพ" /> */}
              </label>

              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                name=""
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          {/* เริ่มข้อมูลของสินค้า */}
          <div className="product">
            <h4>ข้อมูลสินค้า</h4>

            <div className="allTitle">
              <div className="title">
                <label htmlFor="title">หัวข้อสินค้า</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="หัวข้อสินค้า"
                  onChange={(e) => setTItle(e.target.value)}
                />
              </div>

              <div className="des">
                <label htmlFor="des">ข้อมูลสินค้า</label>
                <textarea
                  className="descriptionInput"
                  rows="6"
                  cols="50"
                  placeholder="ได้รหัส 100%
- การันตี 7 หมัด
- การันตีดาบคู่
- การันตีดาบสมอ
- Lv.2550 (Max)
- สุ่มผลที่ใช้"
                  onChange={(e) => setDes(e.target.value)}
                ></textarea>
              </div>

              <div className="options">

                <div className="optionsWrapper">
                <label htmlFor="op1">option1</label>
                <input type="text" name='op1' id='op1' onChange={(e) => setOp1(e.target.value)}/>
                </div>
                <div className="optionsWrapper">
                <label htmlFor="op1">option2</label>
                <input type="text" name='op1' id='op1' onChange={(e) => setOp2(e.target.value)}/>
                </div>
                <div className="optionsWrapper">
                <label htmlFor="op1">option3</label>
                <input type="text" name='op1' id='op1' onChange={(e) => setOp3(e.target.value)}/>
                </div>
                <div className="optionsWrapper">
                <label htmlFor="op1">option4</label>
                <input type="text" name='op1' id='op1' onChange={(e) => setOp4(e.target.value)}/>
                </div>
                <div className="optionsWrapper">
                <label htmlFor="op1">option5</label>
                <input type="text" name='op1' id='op1' onChange={(e) => setOp5(e.target.value)}/>
                </div>
                <div className="optionsWrapper">
                <label htmlFor="op1">option6</label>
                <input type="text" name='op1' id='op1' onChange={(e) => setOp6(e.target.value)}/>
                </div>
                <div className="optionsWrapper">
                <label htmlFor="op1">option7</label>
                <input type="text" name='op1' id='op1' onChange={(e) => setOp7(e.target.value)}/>
                </div>
                <div className="optionsWrapper">
                <label htmlFor="op1">option8</label>
                <input type="text" name='op1' id='op1' onChange={(e) => setOp8(e.target.value)}/>
                </div>

                </div>
            </div>
          </div>

          {/* ราคา กับ ปุ่ม */}
          <div className="price">
            <h4>ราคาสินค้า</h4>

            <div className="priceWarn">
              <div className="priceDetails">
                <label htmlFor="price">ราคาสินค้า</label>
                <input
                  type="number"
                  min={0}
                  id="price"
                  name="price"
                  placeholder="ราคาสินค้า"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="warn">
                <label htmlFor="warn">ประกันสินค้า</label>
                <textarea
                  className="warranty"
                  rows="10"
                  cols="50"
                  placeholder="ประกันสินค้า"
                  onChange={(e) => setWarn(e.target.value)}
                ></textarea>
              </div>

            <div className="start-time">

              <div className="timeWrapper">
              <label htmlFor="time">เวลา</label>
              <input type="text" id='time' name='time' placeholder='01:05:00' onChange={(e) => setTime(e.target.value)}/>
              </div>

            </div>
            </div>


            <div className="buttons">
              <button className="greenBtn" onClick={handleSubmit}>
                อัปโหลดสินค้า
              </button>
              <button className="redBtn">ยกเลิก</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AdminUpload
