import { Request, Response } from "express";
import User from "../models/userModel";
import cloudinary from "../connectors/cloudinary";

const isErrorWithMessage = (error: unknown): error is { message: string } => {
	return (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof (error as { message: string }).message === "string"
	);
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, age, address } = req.body;
		const file = req.file;

		if (!file) {
			return res.status(400).json({ error: "Avatar file is required" });
		}

		const result = await cloudinary.uploader.upload(file.path);
		const user = new User({ name, age, avatarUrl: result.secure_url, address });
		await user.save();
		res.status(201).json(user);
	} catch (err) {
		if (isErrorWithMessage(err)) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unknown error occurred" });
		}
	}
};

export const getUsers = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const skip = (page - 1) * limit;

		const users = await User.find().skip(skip).limit(limit);
		const total = await User.countDocuments();

		res.status(200).json({
			page,
			limit,
			total,
			users,
		});
	} catch (err) {
		if (isErrorWithMessage(err)) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unknown error occurred" });
		}
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json(user);
	} catch (err) {
		if (isErrorWithMessage(err)) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unknown error occurred" });
		}
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { name, age, address } = req.body;
		const file = req.file;
		let avatarUrl = req.body.avatarUrl;

		if (file) {
			const result = await cloudinary.uploader.upload(file.path);
			avatarUrl = result.secure_url;
		}

		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ name, age, avatarUrl, address },
			{ new: true }
		);

		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json(user);
	} catch (err) {
		if (isErrorWithMessage(err)) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unknown error occurred" });
		}
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json({ message: "User deleted" });
	} catch (err) {
		if (isErrorWithMessage(err)) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unknown error occurred" });
		}
	}
};
