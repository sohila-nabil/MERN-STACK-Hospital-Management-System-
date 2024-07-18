import userModel from "../models/userModel.js";
import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js";
import { generateToken } from "../utils/jwToken.js";
import { v2 } from "cloudinary";

const patientRegister = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, phone, nic, password, gender, dob } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !nic ||
    !password ||
    !gender ||
    !dob
  ) {
    return next(new ErrorHandler("Please Provide All Details", 400));
  }
  let isRegistered = await userModel.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User Alreadt Registered", 400));
  }
  const user = await userModel.create({
    firstname,
    lastname,
    email,
    phone,
    nic,
    password,
    gender,
    dob: new Date(dob),
    role: "Patient",
  });
  generateToken(user, "User Registered Successfully", 200, res);
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide All Details", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password dosnt match", 400)
    );
  }
  let user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password or Email", 400));
  }
  const isPassMatched = await user.comparePassword(password);
  if (!isPassMatched) {
    return next(new ErrorHandler("Invalid Password or Email", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User With This Role not Found", 400));
  }
  generateToken(user, "User Loggd in Successfully", 200, res);
});

const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    nic,
    role,
    password,
    gender,
    dob,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !nic ||
    !role ||
    !password ||
    !gender ||
    !dob
  ) {
    return next(new ErrorHandler("Please Provide All Details", 400));
  }
  let isRegisterd = await userModel.findOne({ email });
  if (isRegisterd) {
    return next(
      new ErrorHandler(
        `${isRegisterd.role}  with this Email Already Existed`,
        400
      )
    );
  }
  const admin = await userModel.create(req.body);
  res.status(200).json({ success: true, msg: "Admin Added Successfully" });
});

const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await userModel.find({ role: "Doctor" });
  res.status(200).json({ success: true, doctors });
});

const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
});

const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Admin Logged out Successfully" });
});

const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Patient Logged out Successfully" });
});

const addDoctor = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar is Required", 400));
  }
  let doc_avatar = req.files.doc_avatar;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(doc_avatar?.mimetype)) {
    return next(new ErrorHandler("File Format not Supported", 400));
  }
  const {
    firstname,
    lastname,
    email,
    phone,
    nic,
    password,
    gender,
    dob,
    doctorDept,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !nic ||
    !password ||
    !gender ||
    !dob ||
    !doctorDept
  ) {
    return next(new ErrorHandler("Please Provide All Details", 400));
  }
  let isRegisterd = await userModel.findOne({ email });
  if (isRegisterd) {
    return next(
      new ErrorHandler(
        `${isRegisterd.role}  with this Email Already Existed`,
        400
      )
    );
  }
  const cloudRes = await v2.uploader.upload(doc_avatar.tempFilePath);
  if (!cloudRes || cloudRes.error) {
    console.error(
      "Cloudinary Error",
      cloudRes.error || "untoken cloudainary error"
    );
    return next(new ErrorHandler("Error uploading to Cloudinary", 500));
  }
  const doctor = await userModel.create({
    firstname,
    lastname,
    email,
    phone,
    nic,
    role: "Doctor",
    password,
    gender,
    dob,
    doctorDept,
    doc_avatar: {
      public_id: cloudRes.public_id,
      url: cloudRes.secure_url,
    },
  });
  res
    .status(200)
    .json({ success: true, message: "New Doctor Registered", doctor });
});

export {
  patientRegister,
  login,
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  addDoctor,
};
