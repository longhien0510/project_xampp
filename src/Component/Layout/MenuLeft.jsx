import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function MenuLeft(){
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost/laravel8/public/api/category-brand")
        .then(res=>{
            setCategory(res.data.category|| []); setBrand(res.data.brand || []);
        })
        .catch(error => console.log(error));
    },[])

    function renderCaterogy(){
        return category.map(value => (
                 <div className="panel panel-default" key={value.id}>
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <Link to={"/category/"+value.id}>
                        {value.category}
                        </Link>
                      </h4>
                    </div>
                    {/* <div id="sportswear" className="panel-collapse collapse">
                      <div className="panel-body">
                        
                      </div>
                    </div> */}
                  </div>
            ))
    }

        function renderBrand(){
          return brand.map(value => (
                <li key={value.id}>
                    <Link to ={"/brand/"+ value.id}>
                    <span className="pull-right">({value.count || 0})</span>
                    {value.brand}
                    </Link>
                    </li>
            ))
    }

        return (
        <div className="col-sm-3">
              <div className="left-sidebar">
                 {/* CATEGORY */}
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                 { renderCaterogy()}
                </div>
                {/*/category-products*/}
                
                <div className="brands_products">{/*brands_products*/}
                    {/* BRAND */}
                  <h2>Brands</h2>
                  <div className="brands-name">
                    <ul className="nav nav-pills nav-stacked">
                     {renderBrand()}
                    </ul>
                  </div>
                </div>{/*/brands_products*/}
                <div className="price-range">
                    {/*price-range*/}
                  <h2>Price Range</h2>
                  <div className="well">
                    <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
                    <b>$ 0</b> <b className="pull-right">$ 600</b>
                  </div>
                </div>{/*/price-range*/}
                <div className="shipping text-center">{/*shipping*/}
                  <img src="images/home/shipping.jpg" alt="" />
                </div>{/*/shipping*/}
              </div>
            </div>
  );
}
export default MenuLeft;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost/laravel8/public/api/category-brand";

// function MenuLeft() {
//   const [category, setCategory] = useState([]);
//   const [brand, setBrand] = useState([]);

//   const [sequentialTime, setSequentialTime] = useState(null);
//   const [parallelTime, setParallelTime] = useState(null);
//   const [benchmarkLoading, setBenchmarkLoading] = useState(false);

//   const updateData = (response) => {
//     setCategory(response.data.category || []);
//     setBrand(response.data.brand || []);
//   };

//   useEffect(() => {
//     axios
//       .get(API_URL)
//       .then((response) => updateData(response))
//       .catch((error) => console.error("Lỗi tải dữ liệu:", error));
//   }, []);

//   // Chạy tuần tự: request thứ hai bắt đầu sau khi request thứ nhất hoàn thành
//   const runSequential = async () => {
//     const startTime = performance.now();

//     const firstResponse = await axios.get(API_URL);
//     const secondResponse = await axios.get(API_URL);

//     const endTime = performance.now();

//     updateData(secondResponse);
//     setSequentialTime((endTime - startTime).toFixed(2));
//   };

//   // Chạy bất đồng bộ song song: hai request được gửi cùng lúc
//   const runParallel = async () => {
//     const startTime = performance.now();

//     const [firstResponse, secondResponse] = await Promise.all([
//       axios.get(API_URL),
//       axios.get(API_URL),
//     ]);

//     const endTime = performance.now();

//     updateData(firstResponse);
//     setParallelTime((endTime - startTime).toFixed(2));
//   };

//   const comparePerformance = async () => {
//     setBenchmarkLoading(true);

//     try {
//       await runSequential();
//       await runParallel();
//     } catch (error) {
//       console.error("Lỗi benchmark:", error);
//     } finally {
//       setBenchmarkLoading(false);
//     }
//   };

//   const renderCategory = () => {
//     return category.map((value) => (
//       <div className="panel panel-default" key={value.id}>
//         <div className="panel-heading">
//           <h4 className="panel-title">
//             <Link to={`/category/${value.id}`}>
//               {value.category}
//             </Link>
//           </h4>
//         </div>
//       </div>
//     ));
//   };

//   const renderBrand = () => {
//     return brand.map((value) => (
//       <li key={value.id}>
//         <Link to={`/brand/${value.id}`}>
//           <span className="pull-right">({value.count || 0})</span>
//           {value.brand}
//         </Link>
//       </li>
//     ));
//   };

//   return (
//     <div className="col-sm-3">
//       <div className="left-sidebar">
//         <h2>Category</h2>

//         <div className="panel-group category-products" id="accordian">
//           {renderCategory()}
//         </div>

//         <div className="brands_products">
//           <h2>Brands</h2>

//           <div className="brands-name">
//             <ul className="nav nav-pills nav-stacked">
//               {renderBrand()}
//             </ul>
//           </div>
//         </div>

//         <div
//           style={{
//             marginTop: "20px",
//             padding: "15px",
//             border: "1px solid #ddd",
//             backgroundColor: "#f8f8f8",
//           }}
//         >
//           <h4>So sánh thời gian chạy</h4>

//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={comparePerformance}
//             disabled={benchmarkLoading}
//           >
//             {benchmarkLoading ? "Đang đo..." : "Chạy so sánh"}
//           </button>

//           <p style={{ marginTop: "15px" }}>
//             Chạy tuần tự:
//             <strong>
//               {sequentialTime !== null
//                 ? ` ${sequentialTime} ms`
//                 : " Chưa có kết quả"}
//             </strong>
//           </p>

//           <p>
//             Chạy song song:
//             <strong>
//               {parallelTime !== null
//                 ? ` ${parallelTime} ms`
//                 : " Chưa có kết quả"}
//             </strong>
//           </p>

//           {sequentialTime !== null && parallelTime !== null && (
//             <p style={{ color: "#2e7d32", fontWeight: "bold" }}>
//               {Number(parallelTime) < Number(sequentialTime)
//                 ? "Chạy song song nhanh hơn."
//                 : "Chạy tuần tự nhanh hơn trong lần đo này."}
//             </p>
//           )}
//         </div>

//         <div className="price-range">
//           <h2>Price Range</h2>

//           <div className="well">
//             <input
//               type="text"
//               className="span2"
//               defaultValue=""
//               data-slider-min={0}
//               data-slider-max={600}
//               data-slider-step={5}
//               data-slider-value="[250,450]"
//               id="sl2"
//             />
//             <br />
//             <b>$ 0</b>
//             <b className="pull-right">$ 600</b>
//           </div>
//         </div>

//         <div className="shipping text-center">
//           <img src="images/home/shipping.jpg" alt="Shipping" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MenuLeft;