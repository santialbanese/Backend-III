import { ERROR_INVALID_ID, ERROR_NOT_FOUND_ID } from "../constant/message.constant.js";
import { generatePetsMock } from "../mocks/pet.mock.js";
//import { customError } from "../errors/custom.error.js";
import PetService from "../services/pets.service.js";

export default class PetController{
    #petService;

    constructor(){
        this.#petService = new PetService();
    }


    async getAllPets(req,res, next){
        try {
            const pets = await this.#petService.findAll(req.query);
            res.send({status:"success",payload:pets});
        } catch (error) {
            next(error);
        }
    }
    
    async getPet (req, res, next) {
        try {
            const pet = await this.#petService.findOneById(req.params.pid);
    
            res.send({status: "success", payload: pet});
    
        } catch (error) {
            if (error.message === ERROR_INVALID_ID) {
                return res.status(400).send({ status: "error", error: "ID inválido" });
            }
            if (error.message === ERROR_NOT_FOUND_ID) {
                return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
            }
            next(error);
        }
    }

    async createPet(req, res, next){
        try {
            const pet = await this.#petService.insertOne(req.body);
            res.send({status:"success",payload:pet});
        } catch (error) {
            next(error);
        }
    }

    async createManyPets(req, res, next, count){
        try {
            if(!count) count = 1;
            const pets = generatePetsMock(Number(count));
            const response = await this.#petService.insertMany(pets);
            return response;
            //res.send({ status:"success", payload:response });
        } catch (error) { 
            next(error);
        }
    }
    
    async updatePet (req,res, next){
        try {
            const pet = await this.#petService.updateOne(req.params.pid, req.body);
            res.send({status:"success",payload:pet});
        } catch (error) {
            next(error);
        }
    }
    
    async deletePet (req,res, next){
        try {
            await this.#petService.deleteOneById(req.params.pid);
            res.send({status:"success",message:"pet deleted"});
        } catch (error) {
            next(error);
        }
    }
}