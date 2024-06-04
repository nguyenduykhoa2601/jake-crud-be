import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
const router = express.Router();

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Welcome to CRUD API");
});

app.use(bodyParser.json());
app.use("/api", userRoutes);

mongoose
	.connect(process.env.MONGO_URI!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error("Database connection error", err);
	});
const serverless = require("serverless-http");
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
