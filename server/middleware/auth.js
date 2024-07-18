import userModel from "../models/userModel.js";
import { catchAsyncError } from "./catchAsyncErrors.js";
import { ErrorHandler } from "./errorMiddleware.js";
import jwt from "jsonwebtoken";


export const authAdmin = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin Not Authenticated", 400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(decode.id)
    if (req.user.role !== "Admin") {
         return next(
           new ErrorHandler(`${req.user.role} Not Autherized for this resource!`, 403)
         );
    }
    next();
});

export const authPatient = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler("Patient Not Authenticated", 400));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await userModel.findById(decode.id);
  if (req.user.role !== "Patient") {
    return next(
      new ErrorHandler(
        `${req.user.role} Not Autherized for this resource!`,
        403
      )
    );
  }
  next();
});
