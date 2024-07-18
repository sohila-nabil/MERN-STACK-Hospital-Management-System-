import {
  patientRegister,
  login,
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  addDoctor,
} from "../controllers/userCtrl.js";
import express from "express";
import { authAdmin, authPatient } from "../middleware/auth.js";
const userRoute = express.Router();

userRoute.post("/patient/register", patientRegister);
userRoute.post("/login", login);
userRoute.post("/admin/add-new", authAdmin, addNewAdmin);
userRoute.post("/doctor/add-new", authAdmin, addDoctor);
userRoute.get("/admin/me", authAdmin, getUserDetails);
userRoute.get("/patient/me", authPatient, getUserDetails);
userRoute.get("/all-doctors", getAllDoctors);
userRoute.get("/admin/logout", authAdmin, logoutAdmin);
userRoute.get("/patient/logout", authPatient, logoutPatient);

export default userRoute;
