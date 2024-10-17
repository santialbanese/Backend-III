import { Router } from "express";
import UserController from "../controllers/users.controller.js";
import PetController from "../controllers/pets.controller.js";

const usersController = new UserController();
const petsController = new PetController();

const router = Router();

router.get("/mockingusers", async (req, res, next) => {
    const users = await usersController.createManyUser(req, res, next);
    res.status(201).json({status: "ok", payload: users});
});
router.get("/mockingpets", async (req, res, next) => {
    const pets = await petsController.createManyPets(req, res, next);
    res.status(201).json({status: "ok", payload: pets});
});
router.get("/generatedata/:cu/:cp", async (req, res, next) => {
    const { cu, cp } = req.params;
    const users = await usersController.createManyUser(null, null, next, cu);
    const pets = await petsController.createManyPets(null, null, next, cp);
    res.status(201).json({status: "ok", payload: {users, pets}});
});


export default router;