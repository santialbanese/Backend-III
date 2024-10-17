import { Router } from "express";
import SessionsController from "../controllers/sessions.controller.js";

const sessionsController = new SessionsController();
const router = Router();

router.post("/register", (req, res, next) => sessionsController.register(req, res, next));
router.get("/login", (req, res, next) => sessionsController.login(req, res, next));
router.get("/current", (req, res, next) => sessionsController.current(req, res, next));
/* router.get("/unprotectedLogin",sessionsController.unprotectedLogin);
router.get("/unprotectedCurrent",sessionsController.unprotectedCurrent); */

export default router;