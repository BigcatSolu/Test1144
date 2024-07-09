import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const Addpayment = () => {
    const [number, setNumber] = useState('')
    const [limit, setLimit] = useState()
    const [total, setTotal] = useState()
    const [selected, setSelected] = useState(null)
    const navigate = useNavigate()

    // const upload = async () => {
    //     try{
    //       const formData = new FormData()
    //       formData.append("file", file)
    //       const res = await axios.post("/api/uploads", formData)
    //       return res.data
    //     }catch(err){
    //       console.log("ERROR:",err)
    //       console.log("Hello Error")
    //     }
    //   }
    // console.log(limit)
    console.log(total)

    const handleSubmit = async () => {

        if (!total || !number || !selected || !limit) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "โปรดกรอกข้อมูลให้ครบถ้วน",
              });
              return
        }

        // const files = await upload()

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post('/api/payment/addpayment', {
                        payment_type: selected,
                        payment_limit: limit, // เงิน
                        // payment_image: files,
                        payment_num: number,
                        payment_count_limit: total, //จำนวนครั้ง
                    })
                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
                navigate('/admin/payment')
              Swal.fire({
                title: "Added!",
                text: "Your payment has been Added.",
                icon: "success"
              });
            }
          });


        console.log("Hello")
    }

    const handleSelectPost = (selectedOption) => {
      const selectedPostId = selectedOption ? selectedOption.value : null;
      setSelected(selectedPostId);
      console.log(selectedPostId)
    };

    const options = [
      { value: 'True Wallet', label: 'True Wallet' },
      { value: 'ธนาคารกสิกรไทย', label: 'ธนาคารกสิกรไทย' }
    ];

    const animatedComponents = makeAnimated(); 


  return (
    <div className='adminLayout'>
        <Sidebar />

        <div className="mainContent">
            <div className="mainContent-header">
                <h4>เพิ่มการชำระเงิน</h4>
            </div>

            <div className="addpayment-body-wrapper">
                <div className="addpayment-container">

                    {/* <div className="add-number">
                      
                    <label htmlFor="account-name">Account Name: <span className='red'>*</span> </label>
                    <input type="text" name='account-name' id='account-name' onChange={(e) => setAccount(e.target.value)}/>
                    </div> */}

                    <div className="add-number">
                    <label htmlFor="account-number">Account Number: <span className='red'>*</span></label>
                    <input type="number" name='account-number' id='account-number' onChange={(e) => setNumber(e.target.value)}/>
                    </div>

                    <div className="add-number">
                    <label htmlFor="payment-type">Payment Type: <span className='red'>*</span></label>
                    <Select
                      value={options.find(option => option.value === selected)}
                      // value={id}
                      onChange={handleSelectPost}
                      components={animatedComponents}
                      options={options}
                      closeMenuOnSelect={true}
                      isClearable={true}
                      name={selected}
                      className='Select'
                      placeholder="Select a post"
                    />
                    {/* <input type="text" name='payment-type' id='payment-type' onChange={(e) => setType(e.target.value)}/> */}
                    </div>

                    <div className="add-number">
                      <label htmlFor="payment-total">Count Limit: <span className='red'>*</span> <span className='sub'> (ครั้ง) </span> </label>
                      <input type="number" name='payment-total' id='payment-total' onChange={(e) => setTotal(e.target.value)} />
                    </div>

                    <div className="add-number">
                      <label htmlFor="payment-limit">Total Limit: <span className='red'>*</span> <span className='sub'> (เงิน) </span></label>
                      <input type="number" name='payment-limit' id='payment-limit' onChange={(e) => setLimit(e.target.value)} />
                    </div>

                    <div className="add-buttons">
                        <button className='add-payment-button' onClick={handleSubmit}>Add</button>
                    </div>

                </div> 
            </div>
        </div>
    </div>
  )
}

export default Addpayment
