import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Test = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/posts');
        setData(res.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  console.log(selectedOption)

  return (
    <div className='add'>
      <div className="container">
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="" disabled>Select an option</option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>{item.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Test;
