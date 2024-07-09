import React from "react";
import { Link } from "react-router-dom";

function PostsWrapper({ posts }) {
  console.log(posts);

  return (
    <div className="posts-wrapper">
      {posts.map((post) =>
        // post.post_type === "id-code" ? (
          <div className="post-box">
            {post.file_type === "video" ? (
              <video autoPlay loop muted>
              <source
                src={`../upload/${post.img}`}
                type="video/mp4"
              />
            </video>
            ) : (
              <img src={`../upload/${post.img}`} alt="box-image" />
            )}
            
            <div className="postText">
            <p>{post.title}</p>
            </div>
              
            <div className="post-btn">
              {post.display_date && post.display_time ? (

                <div className="statusOfDisplay"> แสดงอยู่ </div>
              ): (
                <div className="statusOfUnDisplay"> ไม่แสดง </div>
              )}
              <Link to={`/admin/post-edit/${post.id}`}>แก้ไขสินค้า</Link>
            </div>
          </div>
        // ) : (
        //   <></>
        // )
      )}
      ;
    </div>
  );
}

export default PostsWrapper;
