import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import paymentStatus from '../components/PaymentStatus'
import './adminpayment.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AdminAddPayment = () => {

    const [payment, setPayment] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/api/payment/true')
            console.log(res.data)
            setPayment(res.data)
        }
        fetchData()
    }, [])

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Available':
                return { backgroundColor: 'green', color: 'white', display: 'flex', justifyContent: 'center', borderRadius: '8px'};
            case 'working':
                return { backgroundColor: '#007bff', color: 'white',display: 'flex', justifyContent: 'center', borderRadius: '8px'};
            case 'Not Available':
                return { backgroundColor: 'red', color: 'white',display: 'flex', justifyContent: 'center', borderRadius: '8px' };
            default:
                return {};
        }
    };

    // todayTopup >= 400 ? 'Almost There' :
    const statusName = {
        available: (todayTopup, limit) => todayTopup >= limit ? 'Not Available' : 
        'Available'
      };

    const handleDelete = async (payment_id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete('/api/payment/delete', {
                        data: { payment_id: payment_id }
                    })
                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
              Swal.fire({
                title: "Deleted!",
                text: "Your payment has been deleted.",
                icon: "success",
                timer: 1300
              });
            }
          });

    }

  return (
    <div className="adminLayout">
      <Sidebar />

      <div className="mainContent">
        <div className="mainContent-payment-header">
          <div className="payment-header-title">
            <p>True Wallet Managements</p>
          </div>

          <div className="link">
            <div className="add-buttons">
              <Link to="/admin/kasikorn">
                <button className="kasikorn">Kasikorn</button>
              </Link>

              <Link to="/admin/addpayment">
                <button className="add-payment"> Add Payment </button>
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
            {payment &&
              payment.map((pay) => (
                <div className="payment-body" key={pay.payment_id}>
                  <div className="id"> #{pay.payment_id} </div>
                  <div className={`payment-status ${pay.status}`}>
                    {pay.status === "Not Available" ? (
                      <span className="not-available">Not Available</span>
                    ) : (
                      pay.status
                    )}
                  </div>
                  {/* <div className={`payment-status`} style={getStatusStyle(statusName.available(pay.payment_count, pay.payment_count_limit))}> 
                {statusName.available(pay.today_topup)}
                </div> */}
                  <div className="name-surname"> {pay.payment_num} </div>
                  <div className="countLimit"> {pay.payment_count_limit} </div>
                  <div className="counting"> {pay.payment_count} </div>
                  <div className="total"> {pay.today_topup} </div>
                  {/* <div className="payment-type"> {pay.payment_type} </div> */}

                  <div className="edit-delete">
                    <Link to={`/admin/editpayment/${pay.payment_id}`}>
                      <button className="edit">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(pay.payment_id)}
                      className="deleteButton"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddPayment
