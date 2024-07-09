import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GoDotFill } from "react-icons/go";

const Topup = () => {

    const [payment, setPayment] = useState([])
    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
    const fetchPayment = async () => {
        const res = await axios.get("/api/payment");
        setPayment(res.data);

        if (!res) {
        console.log("Fetching data fails");
        }
    };
    fetchPayment();
    }, []);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [currentUser, navigate]);

console.log(payment)

  return (
    <div className="topup">

      
      <div className="container">
          <div className="topup-header">
            <div className="eng-header">
              Topup selection
            </div>
            <div className="thai-header">
              เลือกช่องทางการเติมเงิน
            </div>
          </div>
            
          <div className="payment-container">

            <Link to='/topup/truewallet' className='card1 link'>
            <div className="truewallet">
              <div className="topup-container">
                <div className="true-img">
                  <img src='/topup/angpao.png' alt="wallet" />
                </div>
                <p className='truewallet-title'>Truemoney Wallet (อั่งเปา)</p>
                <div className="truewallet-status">
                <GoDotFill className='icon'/> สามารถเติมได้
                </div>
              </div>
              
              <div className="true-buttons">
              <h3 className="redBtn true-button"> True Wallet </h3>
              </div>
            </div>
            </Link>

            <Link to='/topup/slip' className='card1 link'>
            <div className="truewallet">
              <div className="topup-container">
                <div className="true-img">
                  <img src='/topup/slipscanpay.png' alt="wallet" />
                </div>
                <p className='truewallet-title'>ธนาคาร (เช็คสลิป)</p>
                <div className="truewallet-status">
                <GoDotFill className='icon'/> สามารถเติมได้
                </div>
              </div>
              
              <div className="true-buttons">
              <h3 className="greenBtn true-button"> Kasikorn </h3>
              </div>
            </div>
            </Link>

            {/* <Link to='/topup/slip' className='card1 link'>
            <div className="bank">
              <img src='/assets/kasikorn.jpg' alt="bank" />
              <h3 className='greenBtn'> Kasikorn Bank </h3>
            </div>
            </Link> */}
          </div>
      </div>
    </div>
  );
}

export default Topup
