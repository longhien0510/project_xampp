import React from "react";
function ListComment(props){
    const { commentList, handleReply } = props;
    function renderComment(){
        if(commentList && commentList.length > 0){
            return commentList.map((value, key)=>{
                if(value.id_comment === 0|| value.id_comment === "0"){
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
                    )
                }
                return null;
            })
        }
    }
    return (
    <div className="response-area">
      <h2>{commentList ? commentList.length : 0} RESPONSES</h2>
      <ul className="media-list">
        {renderComment()}
      </ul>        
    </div>
  );
}
export default ListComment;