import express from "express";
import { authAdmin, authPatient } from "../middleware/auth.js";
import {
  addAppointment,
  getAllAppointements,
  updateAppointementStatue,
  deleteAppointement,
} from "../controllers/appointmentCtrl.js";
const appointmentRoute = express.Router();

appointmentRoute.post("/add-appointment", authPatient, addAppointment);
appointmentRoute.get("/all-appointments", authAdmin, getAllAppointements);
appointmentRoute.put("/update/:id", authAdmin, updateAppointementStatue);
appointmentRoute.delete("/delete/:id", authAdmin, deleteAppointement);

export default appointmentRoute;
