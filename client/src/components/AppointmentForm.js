import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctor_firstname: "",
    doctor_lastname: "",
    address: "",
    hasVisited: false,
  });
  const [doctors, setDoctors] = useState([]);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Raidiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/all-doctors",
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": [
              "http://localhost:3001",
              ["http://localhost:3000"],
            ],
          },
        }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    console.log(data);
    };
    const handleSelectChange = (e) => {
        const [firstname, lastname] = e.target.value.split(" ");
        setData((prevData) => ({
            ...prevData,
            doctor_firstname: firstname,
            doctor_lastname: lastname
        }));
    };
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
    //   const hasVisitedBool = Boolean(data.hasVisited);
      await axios
        .post(
          "http://localhost:4000/api/v1/appointement/add-appointment",
          data,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(
          (res) => toast.success(res.data.message),
          setData({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            nic: "",
            dob: "",
            gender: "",
            appointment_date: "",
            department: "",
            doctor_firstname: "",
            doctor_lastname: "",
            address: "",
            hasVisited: "",
          })
        );
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
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
              type="date"
              placeholder="Appointment Date"
              name="appointment_date"
              value={data.appointment_date}
              onChange={handleChange}
            />
          </div>
          <div>
            <select
              name="department"
              value={data.department}
              onChange={handleChange}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${data.doctor_firstname} ${data.doctor_lastname}`}
              onChange={handleSelectChange}
              disabled={!data.department}
            >
              <option value="">Select Doctor</option>
              {doctors
                ?.filter((doctor) => doctor.doctorDept === data.department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstname} ${doctor.lastname}`}
                    key={index}
                  >
                    {doctor.firstname} {doctor.lastname}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              name="hasVisited"
              checked={data.hasVisited}
              onChange={handleChange}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
