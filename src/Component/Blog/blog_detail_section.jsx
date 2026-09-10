import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MenuLeft from '../Layout/MenuLeft';

function BlogDetailSection(props) {
  let params = useParams();

  // 1. Dùng Object rỗng cho dữ liệu bài viết
  const [data, setData] = useState({}); 

  useEffect(() => {
    // 2. Sửa đường dẫn API nối đúng /detail/
    axios.get("http://localhost/laravel8/public/api/blog/detail/" + params.id)
      .then(res => {
        setData(res.data.data || res.data);
      })
      .catch(error => console.log(error));
  }, [params.id]);

  return (
    <section>
      <div className="container">
        <div className="row">
          <MenuLeft />

          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              
              <div className="single-blog-post">
                {/* 3. Render Tiêu đề động */}
                <h3>{data.title}</h3>

                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Mac Doe</li>
                    <li><i className="fa fa-clock-o" /> {data.created_at}</li>
                  </ul>
                </div>

                {/* 4. Render Ảnh động (Dùng data.image thay vì value.image) */}
                {data.image && (
                  <Link to="#">
                    <img 
                      src={'http://localhost/laravel8/public/upload/blog/image/' + data.image} 
                      alt={data.title} 
                    />
                  </Link>
                )}

                {/* 5. Mô tả ngắn */}
                <p><strong>{data.description}</strong></p>

                {/* 6. Nội dung HTML chi tiết từ API */}
                <div 
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: data.content }} 
                />

                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Rating area */}
            <div className="rating-area">
              <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                  <i className="fa fa-star color" />
                  <i className="fa fa-star color" />
                  <i className="fa fa-star color" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </li>
                <li className="color">(6 votes)</li>
              </ul>
              <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href="#">Pink <span>/</span></a></li>
                <li><a className="color" href="#">T-Shirt <span>/</span></a></li>
                <li><a className="color" href="#">Girls</a></li>
              </ul>
            </div>

            {/* Social Share */}
            <div className="socials-share">
              <a href="#">
                <img src="images/blog/socials.png" alt="" />
              </a>
            </div>

            {/* Response area (Comments) */}
            <div className="response-area">
              <h2>3 RESPONSES</h2>
              <ul className="media-list">
                <li className="media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" /> Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                    <a className="btn btn-primary" href="#"><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
              </ul>        
            </div>

            {/* Reply Box */}
            <div className="replay-box">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Leave a replay</h2>
                  <div className="text-area">
                    <div className="blank-arrow">
                      <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <textarea name="message" rows={11} defaultValue={""} />
                    <a className="btn btn-primary" href="#">post comment</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailSection;