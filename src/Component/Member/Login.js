import { useState } from "react";
import React from "react";

function Login(){
    const [inputs, setInputs]= useState({
        email:"", 
        pass: ""
    });
    const [err, setErr]= useState({});

    const HandleInput=(e) => {
        const nameInput= e.target.name;
        const valueInput =e.target.value;
        setInputs(state => ({
            ...state,
            [nameInput]: valueInput
        }))
    }
    function HandleSubmit(e){
        e.preventDefault();
        let errorsSubmit={};
        let flag= true;

        if (inputs.email==""){
            errorsSubmit.email="vui long nhap email";
            flag = false;
        }
        if (inputs.pass==""){
            errorsSubmit.pass="vui long nhap password";
            flag = false;
        }

        

        if (!flag) {
            setErr(errorsSubmit);
            return ;
        }

        const emailRegister = localStorage.getItem("email");
        const passRegister = localStorage.getItem("password");

        if(inputs.email == emailRegister && inputs.pass == passRegister){
            setErr({});
            alert("Login thanh công")
        }else{
            setErr({
                login: "Thông tin đang không đúng kiểm tra lại !"
            })
        }

    }

    function HandleEmailBlur(e){
    const email= e.target.value;
    const dinhDangEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(dinhDangEmail.test(email)) {
        setErr(state=>({
            ...state,
            email:""
        }))
    }
    else{
        setErr(state=>({
            ...state,
            email:"Vui long nhap dung dinh dang email"
        }))
    }
}

    function renderError(){
        if(Object.keys(err).length > 0){
            return Object.keys(err).map((key, index)=>{
                return (
                    <li key= {index}>{err[key]}</li>
                )
            })
        }
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
          onChange={HandleInput} 
          onBlur={HandleEmailBlur} 
        />
        <input 
          type="password" 
          name="pass" 
          placeholder="Password" 
          onChange={HandleInput} 
        />
        <button type="submit" className="btn btn-default">Login</button>
      </form>
    </div>
  </div>
);
}
export default Login;