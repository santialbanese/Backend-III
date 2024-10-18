import { Router} from "express";
import AdoptionController from "../controllers/adoptions.controller.js";
const adoptionController = new AdoptionController();
const router = Router();

router.get("/", (req, res, next) => adoptionController.getAllAdoptions(req, res, next));
router.get("/:aid", (req, res, next) => adoptionController.getAdoption(req, res, next));
router.post("/:uid/:pid", (req, res, next) => adoptionController.createAdoption(req, res, next));

export default router;