import express from "express";
import { registerUser, loginUser, currentUser } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get current user (protected route)
router.get("/me", auth, currentUser);

export default router;
