import React, { useState, useEffect } from 'react';
import './PosterModal.css'; // Create this CSS file for styling
import axios from 'axios';

const PosterModal = ({ onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000000); // Automatically close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const [poster, setPoster] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/poster')
      console.log(res.data.poster)
      setPoster(res.data.poster[0])
    }
    fetchData()
  }, [])

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <>
      {poster && Object.keys(poster).length > 0 && ( // Check if poster is not empty
        <div className="modal-overlay" onClick={handleClickOutside}>
          <div className="modal-content">
            <img src={`/upload/${poster.poster_image}`} alt="Welcome Poster" className="poster-image" />
          </div>
          <button onClick={onClose} className="close-button">X</button>
        </div>
      )}
    </>
  );
};

export default PosterModal;
