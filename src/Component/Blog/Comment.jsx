import React, { useState } from 'react';
import axios from 'axios';

function Comment(props) {
    const [comment, setComment] = useState('');

    function handlePostComment(e) {
        e.preventDefault();
        const isLoggedIn= localStorage.getItem("isLoggedIn");
        const token = localStorage.getItem("token");
        const authUser= localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")): null;

        if(!isLoggedIn|| !token|| !authUser){
            alert("vui lòng đăng nhập để comment");
            return;
        }

        if(comment.trim()===""){
            alert("vui lòng nhập nội dung bình luận");
            return;
        }

        let url = 'http://localhost/laravel8/public/api/blog/comment/' + props.idBlog;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        const formData= new FormData();
        formData.append("id_blog", props.idBlog);
        formData.append("id_user", authUser.id);
        formData.append("name_user", authUser.name);
        formData.append("id_comment", props.idComment ? props.idComment : 0);
        formData.append("comment", comment);
        formData.append("image_user", authUser.avatar);

        axios.post(url, formData, config)
            .then(res=>{
                if(res.data.data){
                    alert("Đăng bình luận thành công")
                    setComment("");

                    window.location.reload();
                }
               
            })
        .catch(error=>{
            console.log(error);
        })

        
    }
    const authData = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;
    const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn") && localStorage.getItem("token") && authData);
    const displayName = authData?.name || 'Bạn chưa đăng nhập';

    return (
         <div className="replay-box">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Leave a replay</h2>
                  <div className="text-area">
                    <div className="blank-arrow">
                      {/* thay thế your name khi login */}
                      <label>{displayName}</label>
                    </div>
                    <span>*</span>
                    <textarea 
                    name="message" 
                    rows={11} 
                    value={comment} 
                    onChange={(e)=> setComment(e.target.value)} 
                    disabled={!isLoggedIn}
                    placeholder={isLoggedIn ? "Write your comment here..." : "Vui lòng đăng nhập để bình luận"}/>
                    <button 
                      className="btn btn-primary" 
                      onClick={handlePostComment}
                      disabled={!isLoggedIn}
                    >
                      post comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
    );
}

export default Comment;