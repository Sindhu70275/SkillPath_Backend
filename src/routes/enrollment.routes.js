import express from "express";
import {
	enrollSkill,
	unenrollSkill,
	addToWishlist,
	removeFromWishlist,
	getUserDashboard,
} from "../controllers/enrollment.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/enroll/:skillId", enrollSkill);
router.delete("/enroll/:skillId", unenrollSkill);

router.post("/wishlist/:skillId", addToWishlist);
router.delete("/wishlist/:skillId", removeFromWishlist);

router.get("/dashboard", getUserDashboard);

export default router;
