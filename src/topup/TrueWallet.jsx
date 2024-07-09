import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const TrueWallet = () => {

    const [code, setCode] = useState("")
    const [payment, setPayment] = useState([])


    // store currentUser.id , currentTime, number: phone, true: code,

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    // console.log("SELECT file:", file)
    const { currentUser, refreshUserData } = useContext(AuthContext)

    const navigate = useNavigate()

useEffect(() => {
  if (!currentUser) {
      navigate('/login'); // Redirect to login if not authenticated
  }
}, [currentUser, navigate]);    

useEffect(() => {
  const fetchDataPayment = async () => {
    try {
      const res = await axios.get('/api/payment/truewallet')
      setPayment(res.data[0])
      setLoading(false);
      console.log(res.data)
    } catch (err) {
      console.log(err)
      setLoading(false);
    }
  }
  fetchDataPayment()
}, [])

let number = payment.payment_num;
let formattedNumber = String(number).padStart(10, '0');
console.log(formattedNumber); // Output: '0915513135'

// console.log(payment.payment_num)
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const saleDate = new Date(); // Get the current timestamp in the client's local timezone
        const saleDateUTC7 = new Date(saleDate.getTime() + (7 * 60 * 60 * 1000));
      
        const day = saleDateUTC7.getDate();
        const month = saleDateUTC7.getMonth() + 1; // Month is zero-based, so we add 1
        const year = saleDateUTC7.getFullYear();
      
        const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
    
        try {
            const res = await axios.post('/api/topup/wallet', {
                true: code,
                userId: currentUser.user_id,
                time: formattedDate,
                tureNum: formattedNumber,
                payment_id: payment.payment_id
            });

            console.log(res);
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
            // After the top-up, refresh the user data
            // await refreshUserData();

        } catch (error) {
            console.error("Failed to submit top-up", error);
            Swal.fire({
                title: "Oops...",
                text: error.response.data.message,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "ลองใหม่"
              })
        }
    };

    const [loading, setLoading] = useState(true);


      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (payment.length === 0) {
        return <div>No payment data available</div>;
      }
    

  return (
    <div className='truewalletTopup'>

            <div className="container">
              <div className="container-wrapper">

                <div className="img">
                    <img src="/assets/truewallet1.jpg" alt="" />
                    {/* <img src={payment?.payment_image} alt="" /> */}
                </div>

                <div className="formControl">

                <div className="title-header">
                  <div className="form-title">
                    Topup
                  </div>
                  <div className="form-title-thai">
                    เติมเงินด้วยอั่งเปา (Truemoney Wallet)
                  </div>
                </div>

                <div className="container-div">

              <form onSubmit={handleSubmit}>
                <div className="form-header">
                  Aungpao TrueWallet <div className='sub'>เติมเงินด้วยอั่งเปา</div>
                </div>

                <div className="input-name">ลิ้งอั่งเปา</div>
                <input type="text" id='code' onChange={(e) => setCode(e.target.value)} placeholder='https://gift.truemoney.com/campaign/?v=xxxxeedbad7xxxxceedca91bdxxxxx'/>
                <div className="sub-input">
                  ยอดที่ได้จริงจะถูกหักค่าธรรมเนียมการโอนของ TrueMoney (0%)
                </div>
                <button className='greenBtn' type='submit'>เติมเงิน</button>
              </form>
                </div>
                </div>

              </div>
            
        </div>
    </div>
  )
}

export default TrueWallet
