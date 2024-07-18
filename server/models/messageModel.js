import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minLength: [10, "Message Must Contain At Least 10 Characters"],
  },
});

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
