import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../index";
import { Link, Navigate, useNavigate } from "react-router-dom";
export default function Register() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      await axios
        .post("http://localhost:4000/api/v1/user/patient/register", data, {
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
          setData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phone: "",
            nic: "",
            dob: "",
            gender: "",
          });
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
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleRegistration}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={data.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              name="nic"
              value={data.nic}
              onChange={handleChange}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              name="dob"
              value={data.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <select name="gender" value={data.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}
