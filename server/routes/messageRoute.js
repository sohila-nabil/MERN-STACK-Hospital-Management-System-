import { sendMessage, getAllMessages } from "../controllers/messageCtrl.js";
import express from "express";
import { authAdmin } from "../middleware/auth.js";

const messageRoute = express.Router();

messageRoute.post("/send", sendMessage);
messageRoute.get("/all-messages", authAdmin, getAllMessages);

export default messageRoute;
