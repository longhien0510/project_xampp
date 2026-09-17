import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
        level: 0
    });
// khai bao bien usestate lưu trữ dữ liệu
    const [errors, setErrors] = useState({});
    const [emailValid, setEmailValid] = useState(null);
    const [getFile, setFile]= useState([]);

// xư lí đầu vao    
    const HandleInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput(state => ({
            ...state,
            [nameInput]: valueInput
        }));
    };
// xử lí định dạng, gửi api
    function HandleSubmit(e) {
        e.preventDefault();
        let error = {};
        let flag = true;

        if (input.name === "") {
            error.name = "Vui long nhap thong tin name";
            flag = false;
        }
        if (input.email === "") {
            error.email = "Vui long nhap thong tin email";
            flag = false;
        }
        if (input.password === "") {
            error.password = "Vui long nhap thong tin password";
            flag = false;
        }
        if (input.phone === "") {
            error.phone = "Vui long nhap thong tin phone";
            flag = false;
        }
        if (input.address === "") {
            error.address = "Vui long nhap thong tin address";
            flag = false;
        }
          if (getFile.length === 0) {
        error.avatar = "Vui long cung cap hinh anh";
        flag = false;

    } else {

        const file = getFile[0];

   
        if (file.size > 1024 * 1024) {
            error.avatar =
                "Hinh anh khong duoc lon hon 1MB";
            flag = false;
        }


        const allowedTypes = [
            "image/png",
            "image/jpeg"
        ];

        if (!allowedTypes.includes(file.type)) {
            error.avatar =
                "Vui long chon file PNG, JPG hoac JPEG";
            flag = false;
        }
    }

        if (!flag) {
            setErrors(error);
            return;
        }

        setErrors({});
        localStorage.setItem("email", input.email);
        localStorage.setItem("password", input.password);

        axios.post("http://localhost/laravel8/public/api/register", input)
            .then(res => {
                console.log(res);
                alert("Register Successfully !");
            })
            .catch(error => {
                console.log(error);
            });
    }

    function renderError() {
        if (Object.keys(errors).length > 0) {
            return (
                <ul style={{ color: 'red' }}>
                    {Object.keys(errors).map((key) => (
                        <li key={key}>{errors[key]}</li>
                    ))}
                </ul>
            );
        }
        return null;
    }
    // hàm xử lí định dạng email
    function HandleEmailBlur(e){
    const email= e.target.value;
    const dinhDangEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(dinhDangEmail.test(email)) {
        setEmailValid(true);
        setErrors(state=>({
            ...state,
            email:""
        }))
    }
    else{
        setEmailValid(false);
        setErrors(state=>({
            ...state,
            email:"Vui long nhap dung dinh dang email"
        }))
    }
}

function HandleFile(e){
    setFile(e.target.files);
}

    return (
  <div className="col-sm-4">
    <div className="signup-form">
      <h2>New User Signup!</h2>
      {renderError()}
      <form onSubmit={HandleSubmit}>
        <input type="text" name="name" placeholder="Name" value={input.name} onChange={HandleInput} />
        <input type="text" name="email" placeholder="Email" value={input.email} onChange={HandleInput} onBlur={HandleEmailBlur} />
        <input type="password" name="password" placeholder="Password" value={input.password} onChange={HandleInput} />
        <input type="text" name="phone" placeholder="Phone" value={input.phone} onChange={HandleInput} />
        <input type="text" name="address" placeholder="Address" value={input.address} onChange={HandleInput} />
        <input type="file" name="avatar" onChange={HandleFile} />
        <input type="text" name="level" placeholder="Level" value={input.level} onChange={HandleInput} />
        <button type="submit" className="btn btn-default">Register</button>
      </form>
    </div>
  </div>
);
}

export default Register;