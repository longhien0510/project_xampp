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