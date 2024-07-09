import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './BannerCom.css'

const GetReport = () => {
    const [page, setPage] = useState(1);
    const limit = 2;
    const [totalPages, setTotalPages] = useState(1);
    const [report, setReport] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/report/get', {
                    params: { page: page, limit: limit },
                })
                console.log(res.data.banners)
                setReport(res.data.banners)
                setTotalPages(Math.ceil(res.data.totalCount / limit));
            } catch (error) {
                console.log("ERROR",error)
            }
        }
        fetchData()
    },[page, report])

    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages));
      };
    
      const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
      };

    const handleAccept = async (reportId) => {
        
        try {
            const res = await axios.put(`/api/report/update/${reportId}`)            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='getReport'>
      <div className="header">
        <h4>แจ้งปัญหา / สอบถาม</h4>
      </div>
      
      <div className="report">
        {report.length > 0 ? (
        <div className="reportContainer">
            {report.map((re) => (
                <div className="card" key={re.report_id}>
                <h5>{re.report_title}</h5>
                <div className="img">
                    <img src={`../upload/${re.report_img}`} alt="" />
                </div>
                <div> {re.report_description} </div>

                <div className="contact">
                <p>{re.report_contact}</p>
                <button className='greenBtn' onClick={() => handleAccept(re.report_id)}>รับเรื่อง</button>
                </div>
            </div>
            ))}
        </div>
        ) : (
            <div className="div">No report available</div>
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
              className={`circle ${page === index + 1 ? 'active' : ''}`}
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
  )
}

export default GetReport
