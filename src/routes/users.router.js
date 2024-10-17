import { Router } from "express";
import UserController from "../controllers/users.controller.js";

const usersController = new UserController();
const router = Router();

router.get("/", (req, res, next) => usersController.getAllUsers(req, res, next));
router.get("/:uid", (req, res, next) => usersController.getUser(req, res, next));
router.post("/", (req, res, next) => usersController.createUser(req, res, next));
router.put("/:uid", (req, res, next) => usersController.updateUser(req, res, next));
router.delete("/:uid", (req, res, next) => usersController.deleteUser(req, res, next));


export default router;