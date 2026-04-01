import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
	const payload = {
		id: user._id,
		role: user.role,
		email: user.emailId,   
        fullName: user.fullName,
	};

	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (user) => {
	const payload = { id: user._id };

	return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const createUserData = (user) => {
	return {
		id: user._id,
		fullName: user.fullName,
		emailId: user.emailId,
		role: user.role,
		userPhoto: user.userPhoto || "",
	};
};
