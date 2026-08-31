import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getValue } from '@testing-library/user-event/dist/utils';

function Blog_section_api() {
  const [data, setData] = useState([]);
  useEffect(()=>
    {axios.get("http://localhost/laravel8/public/api/blog")
    .then(res=> {res.data.blog?.data || res.data.data || []})
  }, [])

  function renderData(){
    if(data.length>0){
     return data.map((Value, key)=>{
        return(
          <div className="single-blog-post" key={Value.id}>
                  {/* <h3>Girls Pink T Shirt arrived in store</h3> */}
                  <h3>{Value.title}</h3>
                  <div className="post-meta">
                    <ul>
                      <li><i className="fa fa-user" /> Mac Doe</li>
                      {/* <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li> */}
                      <li><i className='fa fa-clock-o'/>{Value.created_at}</li>
                    </ul>
                    <span>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-half-o" />
                    </span>
                  </div>
                  {/* <a href>
                    <img src="images/blog/blog-one.jpg" alt="" />
                  </a> */}
                <Link to>
                    <img src={"http://localhost/laravel8/public/upload/blog/image/" + Value.image}/>
                </Link>
                   {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> */}
                    <p>{value.description}</p>
                  {/* <a className="btn btn-primary" href>Read More</a> */}
                  <Link className="btn btn-primary" to> Read More</Link>
                </div>
        );
      })
    }
  }

  



  return (
    <section>
      <div className="container">
        <div className="row">
          
      
          <div className="col-sm-3">
            <div className="left-sidebar">
              <h2>Category</h2>
              <div className="panel-group category-products" id="accordian">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                        <span className="badge pull-right"><i className="fa fa-plus" /></span>
                        Sportswear
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="shipping text-center">
                <img src="images/home/shipping.jpg" alt="" />
              </div>
            </div>
          </div>

          
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              
              
              {renderBlog()}

              <div className="pagination-area">
                <ul className="pagination">
                  <li><a href="#" className="active">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#"><i className="fa fa-angle-double-right" /></a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Blog_section_api;