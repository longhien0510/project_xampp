import { useEffect, useState } from 'react';
import { Rating } from "react-simple-star-rating";
import axios from 'axios';

 function Rate(props) {
  const [rating, setRating] = useState(0);
  useEffect(()=>{
    if(props.idBlog)
    axios.get("http://localhost/laravel8/public/api/blog/rate/"+ props.idBlog)
    .then(res=>{
        const rateData= res.data.data;
        if(rateData && rateData.length > 0){
            let sum = 0;
            for(let i= 0; i < rateData.length; i++){
                sum += rateData[i].rate;
            }
            let TBC = sum / rateData.length;
            setRating(Math.round(TBC));// Math.round= lam tron;

        }
    })
  }, [props.idBlog])
  const handleRating = (rate) => {
    
     const isLoggedIn= localStorage.getItem("isLoggedIn");
        const token = localStorage.getItem("token");
        const authUser= localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")): null;

        if(!isLoggedIn|| !token|| !authUser){
            alert("vui lòng đăng nhập để đánh giá");
            return;
        }
        setRating(rate);

        let url = 'http://localhost/laravel8/public/api/blog/rate/' + props.idBlog;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
    const formData= new FormData();
        formData.append("blog_id", props.idBlog);
        formData.append("user_id", authUser.id);
        formData.append("rate", rate)
        axios.post(url, formData, config)
            .then(res=>{
                if(res.data.data|| res.data){
                    alert("Đánh giá thành công")

                    window.location.reload();
                }
               
            })
        .catch(error=>{
            console.log(error);
        })
  };

  return (
    <div>
      <Rating
        onClick={handleRating}
        initialValue={rating}
        size={35}
        transition
        fillColor="gold"
        emptyColor="gray"
      />
    
    </div>
  );
}
export default Rate;			
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					