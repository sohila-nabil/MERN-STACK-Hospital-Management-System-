import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: [3, "Fisrt Name Must Contain At Least 3 Characters"],
  },
  lastname: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must Contain At Least 3 Characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide a Valid Email "],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone Number Must Contain Exact 11 Digit"],
    maxLength: [11, "Phone Number Must Contain Exact 11 Digit"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [13, "Nic Number Must Contain Exact 13 Digit"],
    maxLength: [13, "Nic Number Must Contain Exact 13 Digit"],
  },
  dob: {
    type: Date,
    required: true,
    set: (value) => {
      const date = moment(value, "YYYY-MM-DD");
      if (date.isValid()) {
        return date.toDate();
      } else {
        throw new Error(`Invalid date format for value "${value}"`);
      }
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Nic Number Must Contain Exact 8 Digit"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDept: {
    type: String,
  },
  doc_avatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
