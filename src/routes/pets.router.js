import { Router } from "express";
import PetsController from "../controllers/pets.controller.js";

const petsController = new PetsController();
const router = Router();

router.get("/", (req, res, next) => petsController.getAllPets(req, res, next));
router.get("/:pid", (req, res, next) => petsController.getPet(req, res, next));
router.post("/", (req, res, next) => petsController.createPet(req, res, next));
router.put("/:pid", (req, res, next) => petsController.updatePet(req, res, next));
router.delete("/:pid", (req, res, next) => petsController.deletePet(req, res, next));


export default router;