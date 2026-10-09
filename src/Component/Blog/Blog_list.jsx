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

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import MenuLeft from "../Layout/MenuLeft";

// function Blog_list() {
//   const [data, setData] = useState([]);
  
//   // 1. STATE LƯU THỜI GIAN CHẠY CỦA HAI TRƯỜNG HỢP
//   const [noCacheTime, setNoCacheTime] = useState(null); // Thời gian Không Cache (ms)
//   const [cacheTime, setCacheTime] = useState(null);     // Thời gian Có Cache (ms)
//   const [loading, setLoading] = useState(false);
//   const [currentMode, setCurrentMode] = useState("");   // Đang chạy chế độ nào

//   const CACHE_KEY = "BLOG_LIST_CACHE";

//   // 2. HÀM GỌI DỮ LIỆU KHÔNG DÙNG CACHE (GỬI REQUEST MỚI)
//   const fetchWithoutCache = async () => {
//     setLoading(true);
//     setCurrentMode("no-cache");
//     const startTime = performance.now(); // Bắt đầu đo thời gian

//     try {
//       const res = await axios.get("http://localhost/laravel8/public/api/blog");
//       const blogData = res.data.blog?.data || res.data.data || [];
//       setData(blogData);

//       const endTime = performance.now();
//       const duration = (endTime - startTime).toFixed(2);
//       setNoCacheTime(duration); // Lưu kết quả thời gian Không Cache
//     } catch (error) {
//       console.error("Lỗi gọi API:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 3. HÀM GỌI DỮ LIỆU CÓ DÙNG CACHE (LOCALSTORAGE)
//   const fetchWithCache = async () => {
//     setLoading(true);
//     setCurrentMode("cache");
//     const startTime = performance.now(); // Bắt đầu đo thời gian

//     // Kiểm tra xem đã có dữ liệu trong LocalStorage chưa
//     const cachedData = localStorage.getItem(CACHE_KEY);

//     if (cachedData) {
//       // Đọc trực tiếp từ bộ nhớ Browser
//       setData(JSON.parse(cachedData));
//       const endTime = performance.now();
//       const duration = (endTime - startTime).toFixed(2);
//       setCacheTime(duration); // Lưu kết quả thời gian Có Cache
//       setLoading(false);
//     } else {
//       // Lần đầu tiên chưa có Cache -> Gọi API rồi lưu lại
//       try {
//         const res = await axios.get("http://localhost/laravel8/public/api/blog");
//         const blogData = res.data.blog?.data || res.data.data || [];
        
//         setData(blogData);
//         localStorage.setItem(CACHE_KEY, JSON.stringify(blogData)); // Lưu Cache

//         const endTime = performance.now();
//         const duration = (endTime - startTime).toFixed(2);
//         setCacheTime(duration);
//       } catch (error) {
//         console.error("Lỗi gọi API:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Xóa Cache trong LocalStorage để test lại từ đầu
//   const clearCache = () => {
//     localStorage.removeItem(CACHE_KEY);
//     setCacheTime(null);
//     alert("Đã xóa Cache trên trình duyệt!");
//   };

//   // Mặc định lần đầu tải trang sẽ chạy gọi không cache
//   useEffect(() => {
//     fetchWithoutCache();
//   }, []);

//   function RenderData() {
//     if (loading) return <h3>⏳ Đang tải dữ liệu trang...</h3>;
//     if (data.length === 0) return <p>Không có bài viết nào.</p>;

//     return data.map((value) => (
//       <div className="single-blog-post" key={value.id}>
//         <h3>{value.title}</h3>
//         <div className="post-meta">
//           <ul>
//             <li><i className="fa fa-user" /> Mac Doe</li>
//             <li><i className="fa fa-clock-o" /> {value.created_at}</li>
//           </ul>
//         </div>
//         <Link to={`/blog/detail/${value.id}`}>
//           <img src={'http://localhost/laravel8/public/upload/blog/image/' + value.image} alt={value.title} />
//         </Link>
//         <p>{value.description}</p>
//         <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>
//           Read More
//         </Link>
//       </div>
//     ));
//   }

//   return (
//     <section>
//       <div className="container">
//         <div className="row">
//           <MenuLeft />

//           <div className="col-sm-9">
//             <div className="blog-post-area">
              
//               {/* ------------ BANG BẢNG HIỂN THỊ VÀ SO SÁNH THỜI GIAN CHẠY ------------ */}
//               <div style={{
//                 padding: '20px', 
//                 marginBottom: '25px', 
//                 backgroundColor: '#f8f9fa', 
//                 borderRadius: '10px',
//                 border: '1px solid #e0e0e0',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//               }}>
//                 <h3 style={{ marginTop: 0, textAlign: 'center', color: '#333' }}>
//                   📊 Bảng So Sánh Thời Gian Chạy (Performance)
//                 </h3>

//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                  
//                   {/* CỘT 1: KHÔNG CACHE */}
//                   <div style={{
//                     padding: '15px',
//                     backgroundColor: '#fff',
//                     borderRadius: '8px',
//                     border: '2px solid #ef5350',
//                     textAlign: 'center'
//                   }}>
//                     <h4 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>❌ Không Dùng Cache</h4>
//                     <button 
//                       className="btn btn-danger" 
//                       onClick={fetchWithoutCache}
//                       disabled={loading}
//                     >
//                       {loading && currentMode === 'no-cache' ? 'Đang tải...' : 'Chạy Gọi API Trực Tiếp'}
//                     </button>
                    
//                     <div style={{ marginTop: '15px' }}>
//                       <span style={{ fontSize: '14px', color: '#666' }}>Thời gian phản hồi:</span>
//                       <h2 style={{ color: '#d32f2f', margin: '5px 0 0 0' }}>
//                         {noCacheTime ? `${noCacheTime} ms` : '--'}
//                       </h2>
//                     </div>
//                   </div>

//                   {/* CỘT 2: CÓ CACHE */}
//                   <div style={{
//                     padding: '15px',
//                     backgroundColor: '#fff',
//                     borderRadius: '8px',
//                     border: '2px solid #66bb6a',
//                     textAlign: 'center'
//                   }}>
//                     <h4 style={{ color: '#2e7d32', margin: '0 0 10px 0' }}>⚡ Có Dùng Cache (LocalStorage)</h4>
//                     <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
//                       <button 
//                         className="btn btn-success" 
//                         onClick={fetchWithCache}
//                         disabled={loading}
//                       >
//                         {loading && currentMode === 'cache' ? 'Đang tải...' : 'Chạy Lấy Dữ Liệu Cache'}
//                       </button>
//                       <button className="btn btn-warning" onClick={clearCache}>Xóa Cache</button>
//                     </div>

//                     <div style={{ marginTop: '15px' }}>
//                       <span style={{ fontSize: '14px', color: '#666' }}>Thời gian phản hồi:</span>
//                       <h2 style={{ color: '#2e7d32', margin: '5px 0 0 0' }}>
//                         {cacheTime ? `${cacheTime} ms` : '--'}
//                       </h2>
//                     </div>
//                   </div>

//                 </div>

//                 {/* THÔNG BÁO CHÊNH LỆCH */}
//                 {noCacheTime && cacheTime && (
//                   <div style={{ 
//                     marginTop: '15px', 
//                     padding: '10px', 
//                     backgroundColor: '#e8f5e9', 
//                     borderRadius: '5px', 
//                     textAlign: 'center',
//                     fontWeight: 'bold',
//                     color: '#1b5e20' 
//                   }}>
//                     🎉 Cache giúp trang tải nhanh hơn khoảng: {(noCacheTime / cacheTime).toFixed(1)} lần!
//                   </div>
//                 )}
//               </div>
//               {/* ------------------------------------------------------------- */}

//               <h2 className="title text-center">Latest From our Blog</h2>

//               {RenderData()}

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Blog_list;