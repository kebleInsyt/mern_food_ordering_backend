import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRouter from "./routes/MyUserRoute";

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.error("Database connection error:", error));

const app = express(); 
app.use(express.json());  // ✅ Enable JSON body parsing
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({message: "health OK!" });
});

// get the routes
app.use("/api/my/user", myUserRouter);


// const PORT = process.env.PORT || 8001;

app.listen(7000, () => {
  // Start the server and listen on the specified port
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});
