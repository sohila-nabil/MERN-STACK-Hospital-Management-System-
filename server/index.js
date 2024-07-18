import express from "express";
import dbConnection from "./config/dbConnection.js";
import "dotenv/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import messageRoute from "./routes/messageRoute.js";
import userRoute from "./routes/userRoute.js";
import appointmentRoute from "./routes/appointmentRoue.js";

const app = express();


// middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["POST", "GET", "PUT", "DELETE", "HEAD"],
    credentials: true,
  
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/api/v1/message", messageRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/appointement", appointmentRoute);

const port = process.env.PORT || 5000;
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`server in working on ${port}`);
});
