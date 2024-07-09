import React from 'react'
import { Link } from 'react-router-dom';
// import './CateChoice.scss'

const CateChoice = () => {
  return (

    <div className="CateChoice">
        <div className="title">
            <div className="promoTitle">
              <h3>หมวดหมู่แนะนำ</h3>
              <h5>Category Recommended</h5>
            </div>
          </div>

        <div className="category">

            <div className="item">
                <Link className='link' to='/allcategory'>
                    <div className="anim">
                        <div className="img">
                            <img src="/upload/111.png" alt="" />
                        </div>
                        <div className="text">หมวดหมู่ทั้งหมด</div>
                    </div>
                </Link>
            </div>

            <div className="item">
                <Link className='link' to='/allgoods'>
                    <div className="anim">
                        <div className="img">
                            <img src="/upload/222.png" alt="" />
                        </div>
                        <div className="text">สินค้าทั้งหมด</div>
                    </div>
                </Link>
            </div>

        </div>
    </div>

    //   <div className="category">
      
    //   <div className="title">
    //   <div className="promoTitle">
    //     <h3>สินค้าทั้งหมด</h3>
    //     <h5>All category</h5>
    //   </div>
    // </div>

    // <div className="container">

    //   <div
    //     className="item box"
    //     // ref={(el) => (boxRef.current[index] = el)}
    //   >
    //     <Link
    //       to=''
    //       className="link"
    //     >
    //       <div className="anim">
    //         {/* <div className="bg"></div> */}
    //         <div className="img">
    //           <img src='/upload/111.png' alt="640*240" />
    //         </div>
    //         <div className="text"> testing </div>
    //       </div>
    //     </Link>
    //   </div>
    // </div>
    // </div>
  );
}

export default CateChoice
