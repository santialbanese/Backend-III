import UserService from "../services/users.service.js";
import PetService from "../services/pets.service.js";
import AdopionService from "../services/adoptions.service.js";
export default class AdoptionController {
    #usersService;
    #petService;
    #adoptionService;
    constructor(){
        this.#usersService = new UserService();
        this.#petService = new PetService();
        this.#adoptionService = new AdopionService();
    }
    async getAllAdoptions(req, res, next) {
        try {
            const result = await this.#adoptionService.findAll();
            res.send({ status: "success", payload: result });
        } catch (error) {
            next(error);
        }
    }

    async getAdoption(req, res, next) {
        try {
            const adoptionId = req.params.aid;
            const adoption = await this.#adoptionService.findOneById({ id: adoptionId });
            if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
            res.send({ status: "success", payload: adoption });
        } catch (error) {
            next(error);
        }
    }

    async createAdoption(req, res, next) {
        try {
            const { uid, pid } = req.params;
            const user = await this.#usersService.findOneById(uid);
            if (!user) return res.status(404).send({ status: "error", error: "user Not found" });
            const pet = await this.#petService.findOneById(pid);
            console.log(user);
            console.log(pet);
            if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });
            if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });
            user.pets.push(pet.id);
            console.log(user.id); 
            console.log(pet.id);
            await this.#usersService.updateOne(user.id, { pets: user.pets });
            await this.#petService.updateOne(pet.id, { adopted: true, owner: user.id });
            await this.#adoptionService.insertOne({ owner: user.id, pet: pet.id });
            res.send({ status: "success", message: "Pet adopted" });
        } catch (error) {
            next(error);
        }
    }
}