import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Slip = () => {

  const [file, setFile] = useState("")
  const navigate = useNavigate()

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

const { currentUser , refreshUserData } = useContext(AuthContext)

useEffect(() => {
  if (!currentUser) {
      navigate('/login'); // Redirect to login if not authenticated
  }
}, [currentUser, navigate]);

const [payment, setPayment] = useState([])

useEffect(() => {
  const fetchDataPayment = async () => {
    try {
      const res = await axios.get('/api/payment/bankslip')
      setPayment(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  fetchDataPayment()
}, [])

const bankname = payment.length > 0 ? payment[0].payment_type : '';
 
const handleSubmit = async (e) => {
    e.preventDefault();
  
//     const currentTimeUTC = new Date();

// // Time offset for UTC+7 in milliseconds
// const timeOffset = 7 * 60 * 60 * 1000;

// // Convert the UTC time to local time (UTC+7)
// const localTime = new Date(currentTimeUTC.getTime() + timeOffset);

// // Format the local time as an ISO string
// const localTimeString = localTime.toISOString().replace('Z', '+07:00');
    // const currentTime = new Date().toISOString();
    const saleDate = new Date(); // Get the current timestamp in the client's local timezone
    const saleDateUTC7 = new Date(saleDate.getTime() + (7 * 60 * 60 * 1000));
  
    const day = saleDateUTC7.getDate();
    const month = saleDateUTC7.getMonth() + 1; // Month is zero-based, so we add 1
    const year = saleDateUTC7.getFullYear();
  
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    const formData = new FormData();
    formData.append('files', file);
    formData.append('userId', currentUser.user_id);
    formData.append('time', formattedDate);
    formData.append('bank', bankname);
  
    try {
      const res = await axios.post('/api/topup/slip', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          
      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
        
      }).then((result) => {
        if (result.isConfirmed) {
          refreshUserData();
          navigate('/')
        }
      });

    } catch (err) {
      if (err.response && err.response.status === 500) {
        Swal.fire({
          title: "Oops...",
          text: err.response.data.message,
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ลองใหม่"
        })
        console.log(err)
      }
    }
  
  }

  return (
    <div className="bankTopup">  
      <div className="container">

        <div className="bank-topup-header">
        <span className='eng-title'>
        Top up with bank (Slip Verification) <br />
        </span>
        <span className='thai-title'>
        เติมเงินด้วยธนาคาร (Slip Verification)
        </span>
        </div>
        
          <div className="boxes">

          <div className="bankInfo">

            <h3>ช่องทางการชำระเงิน</h3>
            {payment.length > 0 ? (
              <>
                <div className="img">
                  <img src="/assets/kasikorn.jpg" alt="" />
                  {/* <img src={payment[0].payment_image} alt="" /> */}
                </div>
                <h4>{payment[0].payment_type}</h4>
                <h2>{payment[0].payment_num}</h2>
                <h4>ชื่อบัญชี: {payment[0].payment_acceptname}</h4>
              </>
            ) : (
              <p>Loading payment details...</p> // Message when payment details are not yet loaded
            )}

          </div>

          <div className="slipVerify">
            <h3>เติมเงินหลังจากโอนเสร็จ</h3>
            <form onSubmit={handleSubmit}>
              {/* <label htmlFor="file"></label> */}
            <label htmlFor="file" className='preview'>
              <img src="/topup/Remove-111.png" alt="" />
            {/* <img src={file && URL.createObjectURL(file)} alt="สลิปของคุณ" /> */}
            </label>
            <label htmlFor="file" className='label'>อัปโหลดสลิป</label>
            <input type="file" style={{display: "none"}} id='file' onChange={handleFile}/>
            <button className='greenBtn'>ตรวจสอบ</button>
            <p className='subtext'>โปรดกดตรวจสอบเพื่อเช็คสลิป <span className='red'>*</span> </p>
            </form>
          </div>
        </div>
        
        {/* <form>
          <input type="file" accept="imgae/*" onChange={handleFile} />
          <button className="bg-gray-500 rounded-md" onClick={handleSubmit}>
            Check SLip
          </button>
          <img src={file && URL.createObjectURL(file)} alt="slip" width={300} />
        </form> */}
      </div>
    </div>
  );
}

export default Slip
