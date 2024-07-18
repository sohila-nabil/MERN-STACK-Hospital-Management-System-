import messageModel from "../models/messageModel.js";
import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js";

const sendMessage = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, phone, message } = req.body;
  if (!firstname || !lastname || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill Full Form", 400));
  }

  await messageModel.create({ firstname, lastname, email, phone, message });
  res.status(200).json({ success: true, msg: "Message Send Successfully" });
});

const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await messageModel.find({});
  res.status(200).json({ success: true, messages });
});

export { sendMessage, getAllMessages };
