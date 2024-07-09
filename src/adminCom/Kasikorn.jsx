import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

const Kasikorn = () => {

    const [kasikorn, setKasikron] = useState([])

    const [payment, setPayment] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/api/payment/kasikron')

            console.log(res.data)
            setKasikron(res.data)
        }
        fetchData()
    },[])

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Available':
                return { backgroundColor: 'green', color: 'white', display: 'flex', justifyContent: 'center', borderRadius: '8px'};
            case 'Almost There':
                return { backgroundColor: 'orange', color: 'white',display: 'flex', justifyContent: 'center', borderRadius: '8px'};
            case 'Not Available':
                return { backgroundColor: 'red', color: 'white',display: 'flex', justifyContent: 'center', borderRadius: '8px' };
            default:
                return {};
        }
    };

    const statusName = {
        available: (todayTopup) => todayTopup >= 500 ? 'Not Available' : 
        todayTopup >= 400 ? 'Almost There' : 'Available'
      };


  return (
    <div className='adminLayout'>
    <Sidebar />

    <div className="mainContent">

        <div className="mainContent-payment-header">
        
        <div className="payment-header-title">
            <p>Kasikorn Bank Managements</p>
        </div>
        
        <div className='link'>
            <div className="add-buttons">
                <Link to='/admin/payment'>
                <button className='kasikorn'>True Wallet</button>
                </Link>

                <Link to='/admin/addpayment'>
                <button className='add-payment'> Add Payment </button>
                </Link>
            </div>
        </div>

        </div>

        <div className="mainContent-body">

            <div className="addPaymentHeader">
                <div className="id"> #54 </div>
                <div className="payment-status"> status </div>
                <div className="name-surname">account number</div>
                <div className="countLimit"> Limit </div>
                <div className="counting"> Count </div>
                <div className="total"> total </div>
                {/* <div className="payment-type">payment type</div> */}
                <div className="edit-delete">edit / delete</div>
            </div>

            <div className="payment-body-wrapper">

            {kasikorn && kasikorn.map((pay) => (
                <div className="payment-body" key={pay.payment_id}>
                
            <div className="id"> #{pay.payment_id} </div>
                <div className={`payment-status`} style={getStatusStyle(statusName.available(pay.today_topup))}> 
                {statusName.available(pay.today_topup)}
                </div>
                <div className="name-surname"> {pay.payment_num} </div>
                <div className="countLimit"> {pay.payment_count_limit} </div>
                <div className="counting"> {pay.payment_count} </div>
                <div className="total"> {pay.today_topup} </div>
                {/* <div className="payment-type"> {pay.payment_type} </div> */}

                <div className="edit-delete"> 
                <Link to={`/admin/editpayment/${pay.payment_id}`}>
                <button className='edit'>Edit</button>
                </Link>
                <button onClick={() => handleDelete(pay.payment_id)} className='deleteButton'>Delete</button>
                </div>
            </div>
            ))}
            </div>
        </div>





    </div>
    </div>
  )
}

export default Kasikorn
