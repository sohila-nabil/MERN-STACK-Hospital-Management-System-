import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function MessageForm() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });
  //  http://localhost:4000/api/v1/message/send

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:4000/api/v1/message/send", data, {
          // withCredentials: true,
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
          setData({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            message: "",
          });
        });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="container form-component message-form">
        <h2>Send Us A Message</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="firstname"
              type="text"
              placeholder="First Name"
              value={data.firstname}
              onChange={handleChange}
            />
            <input
              name="lastname"
              type="text"
              placeholder="Last Name"
              value={data.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
            <input
              name="phone"
              type="number"
              placeholder="Mobile Number"
              value={data.phone}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            rows={7}
            placeholder="Message"
            value={data.message}
            onChange={handleChange}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
        </form>
        <img src="/Vector.png" alt="vector" />
      </div>
    </>
  );
}

export default MessageForm;
