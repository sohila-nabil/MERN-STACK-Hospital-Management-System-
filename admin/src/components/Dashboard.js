import React, { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../index";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

function Dashboard() {
   const [appointments, setAppointments] = useState([]);
   const [doctors, setDoctors] = useState([]);


   const fetchAppointments = useCallback(async () => {
     try {
       const { data } = await axios.get(
         "http://localhost:4000/api/v1/appointement/all-appointments",
         {
           withCredentials: true,
           headers: {
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": [
               "http://localhost:3001",
               ["http://localhost:3000"],
             ],
           },
         }
       );
       setAppointments(data.appointements);
       console.log(data.appointements);
     } catch (error) {
       setAppointments([]);
     }
   }, [setAppointments]);
  
  
  const fetchDoctors = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/all-doctors",
        {
          withCredentials: true,
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
    } catch (error) {
      setDoctors([]);
    }
  }, [setDoctors]);
  
   useEffect(() => {
     fetchAppointments();
     fetchDoctors();
   }, [fetchAppointments, fetchDoctors]);

   const handleUpdateStatus = async (appointmentId, status) => {
     try {
       const { data } = await axios.put(
         `http://localhost:4000/api/v1/appointement/update/${appointmentId}`,
         { status },
         {
           withCredentials: true,
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       setAppointments((prevAppointments) =>
         prevAppointments.map((appointment) =>
           appointment._id === appointmentId
             ? { ...appointment, status }
             : appointment
         )
       );
       toast.success(data.message);
     } catch (error) {
       toast.error(error.response.data.message);
     }
   };

  const { isAuthenticated, admin } = useContext(Context);
   if (!isAuthenticated) {
     return <Navigate to={"/login"} />;
   }

   return (
     <>
       <section className="dashboard page">
         <div className="banner">
           <div className="firstBox">
             <img src="/doc.png" alt="docImg" />
             <div className="content">
               <div>
                 <p>Hello ,</p>
                 <h5>{admin && `${admin.firstname} ${admin.lastname}`} </h5>
               </div>
               <p>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                 Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                 Assumenda repellendus necessitatibus itaque.
               </p>
             </div>
           </div>
           <div className="secondBox">
             <p>Total Appointments</p>
             <h3>{appointments.length}</h3>
           </div>
           <div className="thirdBox">
             <p>Registered Doctors</p>
             <h3>{doctors.length}</h3>
           </div>
         </div>
         <div className="banner">
           <h5>Appointments</h5>
           <table>
             <thead>
               <tr>
                 <th>Patient</th>
                 <th>Date</th>
                 <th>Doctor</th>
                 <th>Department</th>
                 <th>Status</th>
                 <th>Visited</th>
               </tr>
             </thead>
             <tbody>
               {appointments && appointments.length > 0
                 ? appointments.map((appointment) => (
                     <tr key={appointment._id}>
                       <td>{`${appointment.firstname} ${appointment.lastname}`}</td>
                       <td>{appointment.appointment_date.substring(0, 16)}</td>
                       <td>{`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}</td>
                       <td>{appointment.department}</td>
                       <td>
                         <select
                           className={
                             appointment.status  === "Pending"
                               ? "value-pending"
                               : appointment.status  === "Accepted"
                               ? "value-accepted"
                               : "value-rejected"
                           }
                           value={appointment.status }
                         onChange={(e) =>
                             {console.log(e.target.value);
                             handleUpdateStatus(appointment._id, e.target.value)}
                           }
                         >
                           <option value="Pending" className="value-pending">
                             Pending
                           </option>
                           <option value="Accepted" className="value-accepted">
                             Accepted
                           </option>
                           <option value="Rejected" className="value-rejected">
                             Rejected
                           </option>
                         </select>
                       </td>
                       <td>
                         {appointment.hasVisited === true ? (
                           <GoCheckCircleFill className="green" />
                         ) : (
                           <AiFillCloseCircle className="red" />
                         )}
                       </td>
                     </tr>
                   ))
                 : "No Appointments Found!"}
             </tbody>
           </table>

           {}
         </div>
       </section>
     </>
   );
}

export default Dashboard;
