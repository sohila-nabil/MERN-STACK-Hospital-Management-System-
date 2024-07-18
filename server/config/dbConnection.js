import mongoose from "mongoose";



const dbConnection = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/hospital-MS")
    .then(() => {
      console.log("db successfully connected");
    })
    .catch((err) => {
      console.log(`db not connected ${err}`);
    });
};

export default dbConnection