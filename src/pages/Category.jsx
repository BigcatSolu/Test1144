import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Category = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const toggleModal = (post) => {
    const itemsArray = post.des.split(",");
    setItems(itemsArray);
    const itemListHTML = itemsArray
      .map((item, index) => `<li key=${index}>${item}</li>`)
      .join("");

    Swal.fire({
      title: post.title,
      html: `
            <div class="img" style="width: 450px; height: 450px; border-radius: 14px; overflow: hidden; ">
                <img src="${post.img}" alt="" style="width: 100%; height: 100%; object-fit: cover;"/>
            </div>
            <div class="details">
                <p>

                </p>
                <ul style="display: flex; justify-content: flex-start; flex-direction: column;">
                ${itemListHTML}
                </ul>
            </div>
            <div class="buttons">
                <p>${post.remaining} ในสต็อก</p>
            </div>
        `,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "สั่งซื้อตอนนี้เลย",
      showCancelButton: true,
      focusConfirm: false,
      customClass: {
        container: "sweet-container",
        popup: "sweet-popup",
        closeButton: "sweet-close",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/orderdetails");
      }
    });
  };

  const cate = useLocation().search; // /category?cate=1
  const [remain, setRemain] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(`/api/posts${cate}`);
        // setPosts(res.data);
        const view = await axios.get(`/api/posts/remain${cate}`);
        setRemain(view.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cate]);

  console.log(remain)

  const categoryNames = {
    1: "Boxfruits",
    2: "Code",
    3: "Order",
    4: "PreOrder",
    5: "AFK"
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categ = Number(queryParams.get('cate'));

  const categoryName = categoryNames[categ] || "Unknown Category";
  // const engCategoryName = categoryNames[categ] || "Unknown Category";

  console.log(remain)

  const location1 = useLocation();
  const queryParams1 = new URLSearchParams(location1.search);
  const categoryName1 = queryParams1.get('name');

  console.log(categoryName1)

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axios.get('/')
  //   }
  //   fetch()
  // },[])

  return (
    <div className="category">
      <div className="title">
        <div className="promoTitle">
          <h3> {categoryName1} </h3>
          <h5>หมวดหมู่สินค้า</h5>
        </div>
      </div>

      <div className="container">

        {remain.length > 0 && remain.map((post) => (
          <div
            className="card btn-modal"
            key={post.id}
            // onClick={() => toggleModal(post)}
          >
            <div className="container">
              <div className="img">
                {post.file_type === "video" ? (
                  <video autoPlay loop muted>
                  <source
                    src={`../upload/${post.img}`}
                    type="video/mp4"
                  />
                </video>
                ) : (
                  <img src={`../upload/${post.img}`} alt="" />
                )}
              </div>
              <div className="mainContent">
                <div className="content">
                  <div className="contentHeader">
                  <h5>{post.title}</h5>
                  </div>
                  <div className="priceInfo">
                    {remain && remain[0].cate === 1 || remain[0].cate === 2  ? (
                      <div className="remaining">
                      เหลือ : {post.boxpass_remain} ชิ้น
                    </div>
                    ) : (
                      <div className="remaining">
                      ราคาเริ่มต้น
                    </div>
                    )}
                    <div className="price"> {post.price} ฿</div>
                  </div>
                </div>
                <Link
                  to={`/order/${post.id}`}
                  className="link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bBtn">สั่งซื้อตอนนี้เลย</div>
                </Link>
                {post.type === 'id' || post.type === 'code' ? (
                  <div className="id-code">สินค้าจำนวน {post.boxpass_remain} ชิ้น</div>
                ) : (
                  <div className="order-preorder">สินค้าประเภทออเดอร์</div>
                )}
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
