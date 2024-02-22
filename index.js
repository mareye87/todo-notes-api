import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import todoRoute from "./routes/todoRoute.js";
import cors from "cors";
import env from "dotenv";
env.config();

console.log(process.env.NODE_ENV);

const app = express();

//middleware for parsing request body:
app.use(express.json());

// middleware for handling CORS Policy
app.use(
  cors({
    origin: ["http://localhost:5173", "https://todo-notes-mc2o.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

//todo routes
app.use("/todo", todoRoute);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
