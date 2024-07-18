import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../index";
import { Link, useNavigate, Navigate } from "react-router-dom";
function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "Patient",
  });

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
            "Access-Control-Allow-Origin": [
              "http://localhost:3001",
              ["http://localhost:3000"],
            ],
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setData({ email: "", password: "", confirmPassword: "" });
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            value={data.confirmPassword}
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
