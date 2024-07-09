import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const CategoryEdit = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

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
  
          Swal.fire({
            title: "Are you sure?",
            text: "คุณแน่ใจหรือไม่ที่จะเพิ่มหมวดหมู่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
            const files =  await upload()
  
                const res = await axios.post('/api/category/add', {
                    cateName: title,
                    cateImg: files
                })
  
  
              Swal.fire({
                title: "Add Confirmation",
                text: res.data,
                icon: "success",
                timer: 1500
              });
            }
          navigate('/admin/category')
  
          });

        // const files = await upload()
        // // console.log(cate)

        // try {
        //     const res = await axios.post('/api/category/add', {
        //         cateName: title,
        //         cateImg: files
        //     })

        //     console.log(res)
        // } catch (error) {
        //     console.log(error)
        // }
    }

    // const handleUpdate = async (e) => {
    //     e.preventDefault()

    //     try {
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const [category, setCategory] = useState([])
    // const [cateTitle, setCateTitle] = useState("")
    const fetchFile = async (url) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return blob;
        } catch (error) {
          console.error('Error fetching file:', error);
          return null;
        }
      }; 

    const [isChecked, setIsChecked] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/api/category/${id}`)
            const cateData = res.data
            console.log(cateData)
            setCategory(res.data)
            setTitle(res.data[0].category_name)
            // setFile(res.data[0].category_img)
            // const imgUrl = res.data[0].category_img;
            // if (imgUrl) {
            //   const blob = await fetchFile(imgUrl);
            //   setFile(blob);
            // }
            if (cateData[0].category_date && cateData[0].category_time) {
              setIsChecked(true);
            }
        }
        fetchData()
    }, [id])
    console.log(file)


    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
      if (event.target.checked) {
        handleCheck();
      } else {
        unCheck();
      }
    };

    const handleCheck = async () => {
      // Your function logic here
      try {
        const res = await axios.put('/api/category/display', {
          id: id
        })
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
      console.log('Checkbox is checked, handling submit...');
      // Add your form submission or other logic here
    };

    const unCheck = async () => {
      try {
        const res = await axios.put('/api/category/undisplay', {
          id: id
        });
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
      console.log('Checkbox is unchecked, handling uncheck...');
    };

    const handleDelete = (e) => {
      e.preventDefault()

      Swal.fire({
        title: "Are you sure?",
        text: "คุณแน่ใจหรือไม่ที่จะแก้ไขหมวดหมู่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Edit it!"
      }).then( async (result) => {
        if (result.isConfirmed) {
        const category_id = id

            const res = await axios.delete('/api/category/delete', {
              params: { id: category_id }
            })


          Swal.fire({
            title: "Edit Confirmation",
            text: res.data,
            icon: "success",
            timer: 1500
          });
        }
      navigate('/admin/category')

      });
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
  
          Swal.fire({
            title: "Are you sure?",
            text: "คุณแน่ใจหรือไม่ที่จะแก้ไขหมวดหมู่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Edit it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
            const files = file ? await upload() : category[0].category_img
            const category_id = id
  
                const res = await axios.put('/api/category/update', {
                    cateName: title,
                    cateImg: files,
                    category_id: category_id
                })
  
  
              Swal.fire({
                title: "Edit Confirmation",
                text: res.data,
                icon: "success",
                timer: 1500
              });
            }
          navigate('/admin/category')
  
          });
      }

  return (
    <div className='edit-category'>

        <div className="header">
            <div className="header-title">
                จัดการหมวดหมู่
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

        <div className="edit-category-body">
            <div className="category-title">
                <label htmlFor="title">ชื่อหมวดหมู่ของคุณ:</label>
                <input type="text" id='title' name='title' value={title} placeholder='ชื่อหมวดหมู่ของคุณ' onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className="category-image">
                <div className="category-image-title">
                รูปภาพหมวดหมู่ของคุณ:
                </div>
                <label htmlFor="file" className=''>
                {file && (
                <img src={URL.createObjectURL(file)} alt="รูปภาพของคุณ" />
                )}
                    {/* <img src={file && URL.createObjectURL(file)} alt="รูปภาพของคุณ" /> */}
                    </label>
                <input type="file" name='file' id='file' style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>
            </div>

            <div className="category-add-btn">
                {id ? (
                  <>
                    <button className='deleteBtn' onClick={handleDelete}>ลบหมวดหมู่</button>
                    <button onClick={handleUpdate} className='button'>แก้ไขหมวดหมู่</button>
                  </>
                ) : (    
                    <>
                    <button onClick={handleSubmit} className='button'>เพิ่มหมวดหมู่</button>
                    </>
                )}
            </div>


        </div>
      
    </div>
  )
}

export default CategoryEdit
