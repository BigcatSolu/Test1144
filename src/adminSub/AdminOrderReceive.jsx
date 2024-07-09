import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './AdminOrderReceive.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const AdminOrderReceive = () => {
    const [page, setPage] = useState(1);
    const limit = 2;
    const [totalPages, setTotalPages] = useState(1);
    const [ordering, setOrdering] = useState([])
    const [status, setStatus] = useState([])
    const [selectedStatus, setSelectedStatus] = useState('');
    const [time, setTime] = useState({})
    const [countdownTime, setCountdownTime] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/order/get' , {
                    params: { page: page, limit: limit }
                })
                console.log(res.data.ordering)
                const orderingData = res.data.ordering
                setOrdering(res.data.ordering)
                setTotalPages(Math.ceil(res.data.totalCount / limit))

                const newOrderTimes = {};

                orderingData.forEach(item => {
                  if (item.countdown_start) {
                    const countdownStart = new Date(item.countdown_start);
                    const endTime = countdownStart.getTime(); // Get the end time for each item
                    const now = new Date();
                    const remainingTime = Math.max((endTime - now) / 1000, 0); // Calculate remaining time in seconds
                    newOrderTimes[item.ordering_id] = remainingTime;
                  }
                });
          
                setTime(newOrderTimes);

            //     let countdownStart = null;

            // // Find the first valid countdown_start
            //     for (const order of orderingData) {
            //     if (order.countdown_start) {
            //         countdownStart = new Date(order.countdown_start);
            //         break;
            //     }
            // }
            // // If a valid countdown_start is found, calculate the remaining time
            // if (countdownStart) {
            //     const endTime = new Date(countdownStart).getTime(); // 3 hours later
            //     const now = new Date();
            //     const remainingTime = Math.max((endTime - now) / 1000, 0); // in seconds
            //     setTime(remainingTime);
            // }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[page, selectedStatus])

    console.log(time)

    const saleDate = new Date(); // Get the current timestamp in the client's local timezone
    const saleDateUTC7 = new Date(saleDate.getTime() + (7 * 60 * 60 * 1000));
  
    const day = saleDateUTC7.getDate();
    const month = saleDateUTC7.getMonth() + 1; // Month is zero-based, so we add 1
    const year = saleDateUTC7.getFullYear();
  
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

useEffect(() => {
  if (time > 0) {
      const timer = setInterval(() => {
          setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
  }

}, [time]);

// const formatTime = (seconds) => {
//   const days = Math.floor(seconds / (3600 * 24));
//   const hours = Math.floor((seconds % (3600 * 24)) / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = Math.floor(seconds % 60);

//   let formattedTime = '';

//   if (days > 0) {
//     formattedTime += `${days} day `;
//   }

//   if (hours > 0 || days > 0) {
//     formattedTime += `${hours} hour `;
//   }

//   formattedTime += `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

//   return formattedTime;
// };

    useEffect(() => {
        const fetchData = async () => {
            try {
             const res = await axios.get('/api/orderstatus')
             console.log(res.data)
             setStatus(res.data) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[page])

    useEffect(() => {
      const timers = Object.keys(time).map(orderId => {
          return setInterval(() => {
              setTime(prevTime => {
                  const newTime = { ...prevTime };
                  if (newTime[orderId] > 0) {
                      newTime[orderId] -= 1;
                  }
                  return newTime;
              });
          }, 1000);
      });
  
      return () => {
          timers.forEach(timer => clearInterval(timer));
      };
  }, [time]);

    const formatTime = (seconds) => {
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
    
      let formattedTime = '';
    
      // if (days > 0) {
      //   formattedTime += `${days} day `;
      // }
    
      // if (hours > 0 || days > 0) {
      //   formattedTime += `${hours} hour `;
      // }
    
      // formattedTime += `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

      if (days > 0) {
        formattedTime += `${days} วัน :`;
      }
    
      if (hours > 0 || days > 0) {
        formattedTime += ` ${hours} ชม :`;
      }
    
      formattedTime += `${minutes.toString().padStart(2, '0')}นาที : ${remainingSeconds.toString().padStart(2, '0')} วิ`;
    
      return formattedTime;
    };

    const handleSelectStatus = (order) => async (selectedOption) => {
      if (!selectedOption) {
        console.error("Selected option is undefined");
        return;
      }
      const selectedStatusId = selectedOption.value;
      console.log(selectedStatusId)
      // const selectedStatusId = e.target.value;

      // console.log(selectedStatusId)

      Swal.fire({
        title: "Are you sure?",
        text: "คุณแน่ใจหรือไม่ที่ต้องการเปลี่ยนสถานะของออเดอร์!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ไช่ ฉันแน่ใจ!"
      }).then( async (result) => {

        if (result.isConfirmed) {

          if (selectedStatusId === 3) {
            // Add logic to update the sale table
            try {
              const res = await axios.post('/api/sale', {
                boxpass_id: 0,
                user_id: order.user_id,
                sale_date: formattedDate,
                sale_amount: order.ordering_amount,
                boxpass_username: '',
                boxpass_password: '',
                boxpass_email: '',
                boxpass_code: '',
                post_title: order.ordering_title,
              })
            console.log(res)

            const alert = await axios.post('/api/order/out', {
              ordering_title: order.ordering_title,
              ordering_note: order.ordering_note,
              ordering_type: order.ordering_type,
              ordering_username: order.ordering_username,
              ordering_password: order.ordering_password
            })
    
            } catch (error) {
              console.log(error)
            }
          }

          // if AFK have countdown_duration value

          if (order.countdown_duration) {
            try {
              const res = await axios.put("/api/order/update", {
                status_id:   selectedStatusId,
                ordering_id: order.ordering_id,
                countdown_time: order.countdown_duration
              });
              console.log(res.data);

              // removeing the countdown_duration

              const remove = await axios.put('/api/order/remove', {
                ordering_id: order.ordering_id
              })


        
              // Update the status name in the local state
              setStatus((prevStatus) => {
                return prevStatus.map((sta) =>
                  sta.status_id === selectedStatusId
                    ? { ...sta, status_name: res.data.status_name }
                    : sta
                );
              });
        
              // Update the selected status
              setSelectedStatus((prevSelectedStatus) => ({
                ...prevSelectedStatus,
                [order.ordering_id]: selectedStatusId,
              }));
        
              // Fetch the updated list of orders
              const updatedRes = await axios.get("/api/order/get", {
                params: { page: page, limit: limit },
              });
              setOrdering(updatedRes.data.ordering);
              setTotalPages(Math.ceil(updatedRes.data.totalCount / limit));
              
            } catch (error) {
              console.log(error);
            }
                Swal.fire({
                  title: "เปลี่ยนสถานะสำเร็จ",
                  text: "Your order has been update.",
                  icon: "success"
                });
          }


      try {

        // if (!countdownTime) {

        // }

        const res = await axios.put("/api/order/update", {
          status_id: selectedStatusId,
          ordering_id: order.ordering_id,
          countdown_time: countdownTime
        });
        console.log(res.data);
  
        // Update the status name in the local state
        setStatus((prevStatus) => {
          return prevStatus.map((sta) =>
            sta.status_id === selectedStatusId
              ? { ...sta, status_name: res.data.status_name }
              : sta
          );
        });
  
        // Update the selected status
        setSelectedStatus((prevSelectedStatus) => ({
          ...prevSelectedStatus,
          [order.ordering_id]: selectedStatusId,
        }));
  
        // Fetch the updated list of orders
        const updatedRes = await axios.get("/api/order/get", {
          params: { page: page, limit: limit },
        });
        setOrdering(updatedRes.data.ordering);
        setTotalPages(Math.ceil(updatedRes.data.totalCount / limit));
        
      } catch (error) {
        console.log(error);
      }
          Swal.fire({
            title: "เปลี่ยนสถานะสำเร็จ",
            text: "Your order has been update.",
            icon: "success"
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      });
      };


    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages));
      };
    
      const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
      };

      const statusName = {
        1: 'ระหว่างเตรียมการ',
        2: 'กำลังดำเนินการ',
        3: 'เสร็จสิ้น',
        4: 'ยกเลิก',
      }

      const statusNameStyles = {
        1: { color: 'orange' },
        2: { color: 'blue' },
        3: { color: 'green' },
        4: { color: 'red' },
      };

      const animatedComponents = makeAnimated();  

      const options = status.map(sta => ({
        value: sta.status_id,
        label: sta.status_name
      }));
      

      const getStatusOption = (statusId) => {
        return options.find(option => option.value === statusId);
      };
      
      
      

  return (
    <div className="adminOrderReceive getReport">
      <div className="header">
        <h4>สินค้าประเภทออเดอร์</h4>
      </div>

      <div className="report">
        {ordering.length > 0 ? (
          <div className="orderingContainer">
            {ordering.map((order) => (
              <div className="card" key={order.ordering_id}>
                <div className="cardheader">
                <h5> {order.ordering_title} </h5>
                {/* <h5> {getCategoryLabel(order.category_id)} </h5> */}
                {/* <h5> {order.ordering_type} </h5> */}
                <h5> {order.ordering_type} </h5>
                </div>
                <div className="ordering-body-wrapper">

                <div className="orderWrapper">
                  <p className='order-title'>id: </p>
                  <div className="orderContent">
                  <p>{order.ordering_username}</p>
                  </div>
                </div>
                <div className="orderWrapper">
                  <p className='order-title'>ps: </p>
                  <div className="orderContent">
                  <p>{order.ordering_password}</p>
                  </div>
                </div>

                <div className="orderWrapper">
                  <p className='order-title'>ข้อมูลติดต่อ: </p>
                  <div className="orderContent">
                  <p>
                   {order.ordering_contact}
                  </p>
                  </div>
                </div>

                <div className="orderWrapper">
                  <p className='order-title'>ทำเมลแดง: </p>
                    <div className="orderContent">
                  <p>
                   {order.ordering_redmail}
                  </p>
                    </div>
                </div>

                <div className="orderWrapper">
                  <p className='order-title'>ห้ามเข้าซ้อน: </p>
                  <div className="orderContent">
                  <p>
                   {order.ordering_warning}
                  </p>
                  </div>
                </div>

                <div className="orderWrapper">
                  <p className='order-title'>คุกกี้: </p>
                  <div className="orderContent">
                  <p>
                   {order.ordering_cookie}
                  </p>
                  </div>
                </div>

                <div className="orderWrapper">
                  <p className='order-title'>ข้อมูลติดต่อ: </p>
                  <div className="orderContent">
                  <p>
                   {order.ordering_contact}
                  </p>
                  </div>
                </div>

                <div className="orderWrapper">
                  <p className='order-title'>option: </p>
                  <div className="orderContent">
                  <p>
                   {order.ordering_option}
                  </p>
                  </div>
                </div>

                <div className="orderWrapper">
                  <p className='order-title'>
                  หมายเหตุ:
                  </p>
                  <div className="orderContent">
                   <p className='note'> {order.ordering_note} </p>
                  </div>
                </div>
                </div>
                {order.ordering_type === 'afk' ? (

                  <div className="countdowning">
                    <span>
                  สถานะ:
                    </span>
                  {order.countdown_start && time[order.ordering_id] > 0 ? (
                    <div className='countdown-timer'>
                    <div>
                    {formatTime(time[order.ordering_id])}
                    </div>
                    </div>
                  ) : (
                    <span className={`status-${order.status_id}`}>{statusName[order.status_id]}</span>

                  )}
                </div>
                ) : (
                  <div className="countdowning">
                  <span>
                สถานะ:
                  </span>
                {order.countdown_start && time[order.ordering_id] > 0 ? (
                  <div className='countdown-timer'>
                  <div>
                  {formatTime(time[order.ordering_id])}
                  </div>
                  </div>
                ) : (
                  <span className={`status-${order.status_id}`}>{statusName[order.status_id]}</span>

                )}
              </div>
                )}
                {/* <div className="orderImage"> */}
                    {/* <img src={`../upload/${order.ordering_img}`} alt="" /> */}
                {/* </div> */}
                <div className="timing">
                  {/* <div className='userContact'> {order.ordering_contact} </div> */}
                  {order.ordering_type === 'afk' ? (
                    <input
                    type="text"
                    className='timerInput'
                    placeholder="(hh:mm:ss)"
                    onChange={(e) => setCountdownTime(e.target.value)}
                    />
                    ) : (
                    <span></span>
                    )}
                    <Select
                      value={getStatusOption(selectedStatus[order.ordering_id] || order.status_id)}
                      className='selected'
                      // value={id}
                      onChange={handleSelectStatus(order)}
                      components={animatedComponents}
                      options={options}
                      closeMenuOnSelect={true}
                      name={selectedStatus[order.ordering_id] || order.status_id}
                      placeholder="Select a post"
                    />
                  {/* <select
                    value={selectedStatus[order.ordering_id] || order.status_id}
                    onChange={handleSelectStatus(order)}
                  >
                    {status.map((sta) => (
                      <option
                        key={sta.status_id}
                        value={sta.status_id}
                      > {sta.status_name} </option>
                    ))}
                  </select> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="adminNotavialible">No order available</div>
        )}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <div className="circle-container">
          {[...Array(totalPages)].map((_, index) => (
            <div
              key={index}
              className={`circle ${page === index + 1 ? "active" : ""}`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminOrderReceive
