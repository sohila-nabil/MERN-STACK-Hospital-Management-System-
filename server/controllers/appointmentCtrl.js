import appointmentModel from "../models/appointmentModel.js";
import { catchAsyncError } from "./../middleware/catchAsyncErrors.js";
import { ErrorHandler } from "./../middleware/errorMiddleware.js";
import userModel from "./../models/userModel.js";

const addAppointment = catchAsyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstname,
    doctor_lastname,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstname ||
    !doctor_lastname ||
    !address
  ) {
    return next(new ErrorHandler("Please Provide All Details"), 400);
  }
  const isConflict = await userModel.find({
    firstname: doctor_firstname,
    lastname: doctor_lastname,
    doctorDept: department,
    role: "Doctor",
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not Found"), 404);
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict!, Please Contact through Email or Phone"
      ),
      404
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await appointmentModel.create({
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: { firstname: doctor_firstname, lastname: doctor_lastname },
    hasVisited,
    address,
    doctorId,
    patientId,
  });

  res
    .status(200)
    .json({ success: true, message: "Appointement Sent Successfully!" });
});

const getAllAppointements = catchAsyncError(async (req, res, next) => {
  const appointements = await appointmentModel.find({});
  res.status(200).json({ success: true, appointements });
});

const updateAppointementStatue = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let appointement = await appointmentModel.findById(id);
  if (!appointement) {
    return next(new ErrorHandler("Appointement not Found"), 404);
  }
  appointement = await appointmentModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res
    .status(200)
    .json({ success: true, message: "Appointement Updated Successfully" });
});

const deleteAppointement = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const appointement = await appointmentModel.findById(id);
  if (!addAppointment) {
    return next(new ErrorHandler("Appointement not Found"), 404);
  }
  await appointement.deleteOne();
  res
    .status(200)
    .json({ success: true, message: "Appointement deleted Successfully" });
});

export {
  addAppointment,
  getAllAppointements,
  updateAppointementStatue,
  deleteAppointement,
};
