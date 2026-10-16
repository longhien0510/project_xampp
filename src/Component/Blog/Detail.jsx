import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';
import ListComment from './ListComment';
import Rate from './Rate';
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


  return (
    <section>
      <div className="container">
        <div className="row">
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
            {/* <div className="rating-area">
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
                <Rate/>
              </ul>
              <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href="#">Pink <span>/</span></a></li>
                <li><a className="color" href="#">T-Shirt <span>/</span></a></li>
                <li><a className="color" href="#">Girls</a></li>
              </ul>
            </div> */}
            <Rate idBlog={params.id} />

            {/* Social Share */}
            <div className="socials-share">
              <a href="#">
                <img src="images/blog/socials.png" alt="" />
              </a>
            </div>

          {/**hien thi listcomment */}
          <ListComment
              commentList={commentList} 
              handleReply={handleReply}
          />
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