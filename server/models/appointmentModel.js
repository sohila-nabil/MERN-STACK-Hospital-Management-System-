import mongoose from "mongoose";
import validator from "validator";
import moment from "moment";
const appointmentSchema = new mongoose.Schema({
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
  appointment_date: {
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
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    required: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

const appointmentModel = mongoose.model("Appointemt", appointmentSchema)
export default appointmentModel;