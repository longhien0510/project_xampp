import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MenuLeft from '../Layout/MenuLeft';
import Comment from './Comment';

function BlogDetailSection(props) {
  let params = useParams();

  const [data, setData] = useState({}); 
  const [commentList, setCommentList] = useState([]); // Luu danh sach comment
  const [idComment, setIdComment] = useState(0);     // Dung cho chuc nang Reply

  useEffect(() => {
    axios.get("http://localhost/laravel8/public/api/blog/detail/" + params.id)
      .then(res => {
        const blogData = (res.data.data || res.data);
        setData(blogData);
        setCommentList(blogData.comment || []);
      })
      .catch(error => console.log(error));
  }, [params.id]);

  // Luu id comment cha va cuon muot xuong form nhap comment
  const handleReply = (id) => {
    setIdComment(id);

    const replyForm = document.getElementById("replay-box");
    if (replyForm) {
      replyForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ham render comment gop truc tiep comment con vao media-body cua comment cha
  function renderComment() {
    if (commentList.length > 0) {
      return commentList.map((value, key) => {
        // 1. Chi loc va hien thi COMMENT CHA (id_comment == 0)
        if (value.id_comment === 0 || value.id_comment === "0") {
          return (
            <li key={key} className="media">
              <a className="pull-left" href="#avatar">
                <img 
                  className="media-object" 
                  src={'http://localhost/laravel8/public/upload/user/avatar/' + value.image_user} 
                  alt={value.name_user} 
                  style={{ width: '60px', height: '60px' }}
                />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" /> {value.name_user}</li>
                  <li><i className="fa fa-clock-o" /> {value.created_at}</li>
                </ul>
                <p>{value.comment}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleReply(value.id)}
                >
                  <i className="fa fa-reply" /> Reply
                </button>

                {/* 2. RENDER TRUC TIEP COMMENT CON VANO BEN TRONG MEDIA-BODY CUA CHA */}
                {commentList.map((value2, key2) => {
                  if (value2.id_comment === value.id || value2.id_comment === String(value.id)) {
                    return (
                      <div key={key2} className="media second-media" style={{ marginTop: '20px' }}>
                        <a className="pull-left" href="#avatar">
                          <img 
                            className="media-object" 
                            src={'http://localhost/laravel8/public/upload/user/avatar/' + value2.image_user} 
                            alt={value2.name_user} 
                            style={{ width: '45px', height: '45px' }}
                          />
                        </a>
                        <div className="media-body">
                          <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user" /> {value2.name_user}</li>
                            <li><i className="fa fa-clock-o" /> {value2.created_at}</li>
                          </ul>
                          <p>{value2.comment}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}

              </div>
            </li>
          );
        }
        return null;
      });
    }
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <MenuLeft />

          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              
              <div className="single-blog-post">
                <h3>{data.title}</h3>

                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Mac Doe</li>
                    <li><i className="fa fa-clock-o" /> {data.created_at}</li>
                  </ul>
                </div>

                {data.image && (
                  <Link to="#">
                    <img 
                      src={'http://localhost/laravel8/public/upload/blog/image/' + data.image} 
                      alt={data.title} 
                    />
                  </Link>
                )}

                <p><strong>{data.description}</strong></p>

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
              <h2>{commentList.length} RESPONSES</h2>
              <ul className="media-list">
                {renderComment()}
              </ul>        
            </div>

        
            <div id="replay-box">
              <Comment 
                idBlog={params.id} 
                idComment={idComment} 
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailSection;