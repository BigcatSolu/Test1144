import React from 'react';
import './styles.css'; 
// Import your CSS file where you define styles for colors

const PaymentStatus = ({ todayTopup }) => {
  let statusName = '';
  let colorClass = '';

  if (todayTopup > 0 && todayTopup < 400) {
    statusName = 'Available';
    colorClass = 'green';
  } else if (todayTopup >= 400 && todayTopup < 500) {
    statusName = 'Almost There';
    colorClass = 'orange';
  } else if (todayTopup >= 500) {
    statusName = 'Unavailable';
    colorClass = 'red';
  }

  return (
    <div className={`payment-status ${colorClass}`}>
      {statusName}
    </div>
  );
};

export default PaymentStatus;
