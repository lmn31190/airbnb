import express from "express";
import { login, register, profile, logout } from "../controllers/auth.js";

const router = express.Router();

router.get("/profile", profile)
router.post("/register", register)
router.post("/login",login)
router.post("/logout",logout)

export default router;