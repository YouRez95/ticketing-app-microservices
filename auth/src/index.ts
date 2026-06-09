import mongoose from "mongoose";
import app from "./app";

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to db");
    app.listen(3000, () => {
      console.log("Server listening on port 3000!");
    });
  } catch (err) {
    console.error("Failed to start app:", err);
  }
};

start();
