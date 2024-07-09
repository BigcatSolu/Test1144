import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MainCategory = () => {

  const [category, setCategory] = useState([])

// const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(`api/posts${cate}`)
        // setPosts(res.data)
        const res = await axios.get(`api/category`)
        setCategory(res.data)
      }catch(err) {
        console.log(err)
      }
    }
    fetchData()
  },[])

  console.log(category)
  
  return (
    <div>
      <div className="title">
          <div className="promoTitle">
            <h3>หมวดหมู่แนะนำ</h3>
            <h5>Category Recommended</h5>
          </div>
        </div>

        <div className="category">

          {category.map((cat) => (
            <div className="item" key={cat.category_id}>
            <Link to={`/category?cate=${cat.category_id}`} className="link">
              <div className="anim">
                <div className="bg"></div>
                <img src={`../upload/${cat.category_img}`} alt="640*240" />
                <div className="text">{cat.category_name}</div>
              </div>
            </Link>
          </div>
          ))}
        </div>
    </div>
  )
}

export default MainCategory
