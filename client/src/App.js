import React, { useContext, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointement from "./pages/Appointement";
import Aboutus from "./pages/Aboutus";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Context } from "./index";
import axios from "axios";

function App() {
  const { setIsAuthenticated, setUser } = useContext(Context);

  const getUser = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/patient/me",
        { withCredentials: true }
      );
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
    }
  }, [setIsAuthenticated, setUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointement" element={<Appointement />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />

      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
