import React, { useContext, useState } from "react";
import { Context } from "../index";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AddNewAdmin() {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [adminData, setAdminData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nic: "",
    role: "Admin",
    password: "",
    gender: "",
    dob: "",
  });
  

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setAdminData({ ...adminData, [name]: value });
  }
  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:4000/api/v1/user/admin/add-new", adminData, {
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
          toast.success(res.data.msg);
          setIsAuthenticated(true);
          setTimeout(() => {
             navigateTo("/");
          },3000)
         setAdminData({
           firstname: "",
           lastname: "",
           email: "",
           phone: "",
           nic: "",
           password: "",
           gender: "",
           dob: "",
         });
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">ADD NEW ADMIN</h1>
        <form onSubmit={handleAddNewAdmin}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={adminData.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={adminData.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              name="phone"
              value={adminData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              name="nic"
              value={adminData.nic}
              onChange={handleChange}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              name="dob"
              value={adminData.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <select
              name="gender"
              value={adminData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default AddNewAdmin;
