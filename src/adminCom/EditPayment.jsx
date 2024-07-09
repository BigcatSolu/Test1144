import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const EditPayment = () => {

    const { id } = useParams()
    const [payment, setPayment] = useState([])
    const [account, setAccount] = useState('')
    const [number, setNumber] = useState()
    const [limit, setLimit] = useState()
    const [total, setTotal] = useState()
    const [type, setType] = useState('')
    const navigate = useNavigate()
 
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/api/payment/${id}`)
            const data = res.data
            setPayment(res.data)
            // setFile(data[0].payment_image || null);
            setAccount(data[0].payment_acceptname || '');
            setNumber(data[0].payment_num || 0);
            setType(data[0].payment_type || '');
            setLimit(data[0].payment_limit || 0) // จำนวนเงิน
            setTotal(data[0].payment_count_limit || 0) //จำนวนครั้ง
        }
        fetchData()
    },[])

    console.log(payment)


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

    const handleUpdate = async () => {
        // if (!account || !number || !type || !file) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "โปรดกรอกข้อมูลให้ครบถ้วน",
        //       });
        //       return
        // }

        // const files = file ? await upload() : payment[0].payment_image

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.put('/api/payment/update', {
                        payment_type: type,
                        payment_limit: limit,
                        payment_count_limit: total,
                        payment_num: number,
                        payment_id: id
                        // payment_acceptname: account,
                    })
                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
                navigate('/admin/payment')
              Swal.fire({
                title: "Added!",
                text: "Your payment has been updated.",
                icon: "success",
                timer: 1500
              });
            }
          });


        console.log("Hello")
    }

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
                    <input type="text" name='account-name' id='account-name' value={account} onChange={(e) => setAccount(e.target.value)}/>
                    </div> */}

                    <div className="add-number">
                    <label htmlFor="account-number">Account Number: <span className='red'>*</span></label>
                    <input type="number" name='account-number' id='account-number' value={number} onChange={(e) => setNumber(e.target.value)}/>
                    </div>

                    <div className="add-number">
                    <label htmlFor="payment-type">Payment Type: <span className='red'>*</span></label>
                    <input type="text" name='payment-type' id='payment-type' value={type} onChange={(e) => setType(e.target.value)}/>
                    </div>

                    <div className="add-number">
                    <label htmlFor="payment-limit">Count Limit: <span className='red'>*</span> <span className='sub'>(ครั้ง) </span> </label>
                      <input type="number" name='payment-limit' id='payment-limit' value={total} onChange={(e) => setTotal(e.target.value)}/>
                    </div>

                    <div className="add-number">
                    <label htmlFor="payment-limit">total Limit: <span className='red'>*</span> <span className='sub'>(เงิน)</span> </label>
                        <input type="number" name='payment-limit' id='payment-limit' value={limit} onChange={(e) => setLimit(e.target.value)}/>
                    </div>

                    <div className="counting-limit">

                      {/* <div className="limit">
                      <label htmlFor="payment-limit">Count Limit: <span className='red'>*</span> <span className='sub'>(ครั้ง) </span> </label>
                      <input type="number" name='payment-limit' id='payment-limit' value={total} onChange={(e) => setLimit(e.target.value)}/>
                      </div> */}

                      {/* <div className="limit-count">
                        <label htmlFor="payment-limit">total Limit: <span className='red'>*</span> <span className='sub'>(เงิน)</span> </label>
                        <input type="number" name='payment-limit' id='payment-limit' value={limit} onChange={(e) => setLimit(e.target.value)}/>

                      </div> */}
                    </div>

                    <div className="add-buttons">
                        <button className='add-payment-button' onClick={handleUpdate}>Update</button>
                    </div>

                </div> 
            </div>
    </div>
    </div>
  )
}

export default EditPayment
