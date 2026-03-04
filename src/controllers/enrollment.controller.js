import {
	enrollSkillService,
	unenrollSkillService,
	addToWishlistService,
	removeFromWishlistService,
	getUserDashboardService,
} from "../services/enrollment.service.js";

export const enrollSkill = async (req, res, next) => {
	try {
		const enrollment = await enrollSkillService(
			req.user.id,
			req.params.skillId,
		);
		res.status(201).json({
			status: "success",
			message: "Skill enrolled successfully!",
			data: enrollment,
		});
	} catch (error) {
		next(error);
	}
};

export const unenrollSkill = async (req, res, next) => {
	try {
		const result = await unenrollSkillService(req.user.id, req.params.skillId);
		res.json({
			status: "success",
			message: "Skill unenrolled successfully!",
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const addToWishlist = async (req, res, next) => {
	try {
		const wishlist = await addToWishlistService(
			req.user.id,
			req.params.skillId,
		);
		res.status(201).json({
			status: "success",
			message: "Skill added to wishlist!",
			data: wishlist,
		});
	} catch (error) {
		next(error);
	}
};

export const removeFromWishlist = async (req, res, next) => {
	try {
		const result = await removeFromWishlistService(
			req.user.id,
			req.params.skillId,
		);
		res.json({
			status: "success",
			message: "Skill removed from wishlist!",
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getUserDashboard = async (req, res, next) => {
	try {
		const { filter } = req.query;
		const dashboard = await getUserDashboardService(req.user.id, filter);
		res.json({
			status: "success",
			message: "Dashboard fetched successfully!",
			data: dashboard,
		});
	} catch (error) {
		next(error);
	}
};
