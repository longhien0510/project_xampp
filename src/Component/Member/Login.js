// import { useState } from "react";
// import React from "react";

// function Login(){
//     const [inputs, setInputs]= useState({
//         email:"", 
//         pass: ""
//     });
//     const [err, setErr]= useState({});

//     const HandleInput=(e) => {
//         const nameInput= e.target.name;
//         const valueInput =e.target.value;
//         setInputs(state => ({
//             ...state,
//             [nameInput]: valueInput
//         }))
//     }
//     function HandleSubmit(e){
//         e.preventDefault();
//         let errorsSubmit={};
//         let flag= true;

//         if (inputs.email==""){
//             errorsSubmit.email="vui long nhap email";
//             flag = false;
//         }
//         if (inputs.pass==""){
//             errorsSubmit.pass="vui long nhap password";
//             flag = false;
//         }

        

//         if (!flag) {
//             setErr(errorsSubmit);
//             return ;
//         }

//         const emailRegister = localStorage.getItem("email");
//         const passRegister = localStorage.getItem("password");

//         if(inputs.email == emailRegister && inputs.pass == passRegister){
//             setErr({});
//             alert("Login thanh công")
//         }else{
//             setErr({
//                 login: "Thông tin đang không đúng kiểm tra lại !"
//             })
//         }

//     }

//     function HandleEmailBlur(e){
//     const email= e.target.value;
//     const dinhDangEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if(dinhDangEmail.test(email)) {
//         setErr(state=>({
//             ...state,
//             email:""
//         }))
//     }
//     else{
//         setErr(state=>({
//             ...state,
//             email:"Vui long nhap dung dinh dang email"
//         }))
//     }
// }

//     function renderError(){
//         if(Object.keys(err).length > 0){
//             return Object.keys(err).map((key, index)=>{
//                 return (
//                     <li key= {index}>{err[key]}</li>
//                 )
//             })
//         }
//     }

//     return (
//   <div className="col-sm-4 col-sm-offset-1">
//     <div className="login-form">
//       <h2>Login to your account</h2>
//       {renderError()}
//       <form onSubmit={HandleSubmit}>
//         <input 
//           type="text" 
//           name="email" 
//           placeholder="Email Address" 
//           onChange={HandleInput} 
//           onBlur={HandleEmailBlur} 
//         />
//         <input 
//           type="password" 
//           name="pass" 
//           placeholder="Password" 
//           onChange={HandleInput} 
//         />
//         <button type="submit" className="btn btn-default">Login</button>
//       </form>
//     </div>
//   </div>
// );
// }
// export default Login;





import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "" 
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const HandleInput = (e) => {
        let nameInput = e.target.name;
        let valueInput = e.target.value;
            
        setInput(state => ({
            ...state,
            [nameInput]: valueInput
        }));
    };

    function HandleSubmit(e) {
        e.preventDefault();
        let Errors = {};
        let flag = true;

        if (input.email === "") {
            Errors.email = "Vui lòng nhập email";
            flag = false;
        }
        if (input.password === "") {
            Errors.password = "Vui lòng nhập password";
            flag = false;
        }

        if (!flag) {
            setError(Errors);
            return;
        }

  
        const data = {
            email: input.email,
            password: input.password, 
            level: 0
        };


        axios.post("http://localhost/laravel8/public/api/login", data)
            .then(res => {
                console.log("Response API:", res);

                if (res.data.errors || res.data.error) {
                    setError(res.data.errors || res.data.error);
                } else if (res.data.response === "success" || res.data.token) {
                    setError({});

          
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("auth", JSON.stringify(res.data.Auth || res.data.auth));
                    localStorage.setItem("isLoggedIn", "true");

                    alert("dang nhap thanh cong!");
                    navigate('/'); 
                }
            })
            .catch(error => {
                console.log(error);
                if (error.response && (error.response.data.errors || error.response.data.error)) {
                    setError(error.response.data.errors || error.response.data.error);
                } else if (error.response && error.response.data.message) {
                    setError({ login: error.response.data.message });
                }
            });
    }

    function HandleEmailBlur(e) {
        const email = e.target.value;
        const dinhDangEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (dinhDangEmail.test(email)) {
            setError(state => ({
                ...state,
                email: ""
            }));
        } else {
            setError(state => ({
                ...state,
                email: "Vui lòng nhập đúng định dạng email"
            }));
        }
    }

    function renderError() {
        if (Object.keys(error).length > 0) {
            return (
                <ul style={{ color: 'red' }}>
                    {Object.keys(error).map((key, index) => (
                        <li key={index}>
                            {Array.isArray(error[key]) ? error[key][0] : error[key]}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    }

    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
                <h2>Login to your account</h2>
                {renderError()}
                <form onSubmit={HandleSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={input.email}
                        onChange={HandleInput}
                        onBlur={HandleEmailBlur}
                    />
                    <input
                        type="password"
                        name="password" 
                        placeholder="Password"
                        value={input.password}
                        onChange={HandleInput}
                    />
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;














