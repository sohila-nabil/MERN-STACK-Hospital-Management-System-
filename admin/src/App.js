import React, { useContext, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SideBar from "./components/SideBar";
import Login from "./components/Login";
import AddNewAdmin from "./components/AddNewAdmin";
import AddNewDoctor from "./components/AddNewDoctor";
import Doctors from "./components/Doctors";
import Message from "./components/Message";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Context } from "./index";


function App() {
  const { setIsAuthenticated, setAdmin } = useContext(Context);

  const getUser = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/admin/me",
        { withCredentials: true }
      );
      setIsAuthenticated(true);
      setAdmin(res.data.user);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setAdmin({});
    }
  }, [setIsAuthenticated, setAdmin]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/add-new-admin" element={<AddNewAdmin/>} />
        <Route path="/add-new-doctor" element={<AddNewDoctor/>} />
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="/message" element={<Message/>} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
