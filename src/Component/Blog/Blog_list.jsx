import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MenuLeft from "../Layout/MenuLeft";

function Blog_list(){
const [data, setData]= useState([]);
    useEffect(()=>{
        axios.get("http://localhost/laravel8/public/api/blog")
        .then(res=>{
          setData(res.data.blog?.data || res.data.data || [])
        })
        .catch(error=>{
            console.log(error);
        })
    },[])

    function RenderData(){
        if(data.length > 0){
            return data.map((value, key)=>{
                return (
                     <div className="single-blog-post" key={value.id} >
                  {/* <h3>Girls Pink T Shirt arrived in store</h3> */}
                  <h3>{value.title}</h3>
                  <div className="post-meta">
                    <ul>
                      <li><i className="fa fa-user" /> Mac Doe</li>
                      {/* <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li> */}
                      <li><i className="fa fa-clock-o" /> {value.created_at}</li>
                    </ul>
                    <span>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-half-o" />
                    </span>
                  </div>
                  {/* <Link to>
                    <img src="images/blog/blog-one.jpg" alt="" />
                  </Link> */}
                    <Link to>
                                <img src={'http://localhost/laravel8/public/upload/blog/image/' + value.image} alt="" />
                              </Link>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> */}
                  <p>{value.description}</p>
                  {/* <a className="btn btn-primary" href>Read More</a> */}
                   {/* <Link className="btn btn-primary" to> Read More</Link> */}
                   {/* gan render cua blog-detail */}
                   <Link  className="btn btn-primary" to={"/blog/detail/" + value.id}
>                        Read More</Link>
                </div>
                );
            })
        }
    }



    return(
        <section>
      <div className="container">
        <div className="row">
          
      
          <MenuLeft/>
          
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              
              
              {RenderData()}

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
export default Blog_list