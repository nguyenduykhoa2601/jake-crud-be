import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI ?? "", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// Default route for the root URL
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to the Express.js CRUD API");
});

// User routes
app.use("/api/users", userRoutes);

export default app;
