import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../index";
import axios from "axios";
function Login() {
   const [data, setData] = useState({
     email: "",
     password: "",
     confirmPassword: "",
     role: "Admin",
   });
  
   

   const { isAuthenticated, setIsAuthenticated } = useContext(Context);

   const navigateTo = useNavigate();

  const handleChange = (e) => {
     const { name, value } = e.target;
     setData((prev) => ({ ...prev, [name]: value }));
   };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:4000/api/v1/user/login", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": [
            //   "http://localhost:3001",
            //   "http://localhost:3000",
            // ],
          },
        })
        .then((res) => {
          toast.success(res?.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setData({ email: "", password: "", confirmPassword: "" });
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

   if (isAuthenticated) {
     return <Navigate to={"/"} />;
   }

   return (
     <>
       <section className="container form-component">
         <img src="/logo.png" alt="logo" className="logo" />
         <h1 className="form-title">WELCOME TO ZEECARE</h1>
         <p>Only Admins Are Allowed To Access These Resources!</p>
         <form onSubmit={handleLogin}>
           <input
             type="text"
             placeholder="Email"
             name="email"
             value={data.email}
             onChange={handleChange}
           />
           <input
             type="password"
             placeholder="Password"
             name="password"
             value={data.password}
             onChange={handleChange}
           />
           <input
             type="password"
             placeholder="Confirm Password"
             name="confirmPassword"
             value={data.confirmPassword}
             onChange={handleChange}
           />
           <div style={{ justifyContent: "center", alignItems: "center" }}>
             <button type="submit">Login</button>
           </div>
         </form>
       </section>
     </>
   );
}

export default Login;
