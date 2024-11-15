import { ERROR_INVALID_ID, ERROR_NOT_FOUND_ID } from "../constant/message.constant.js";
import { generateUsersMock } from "../mocks/user.mock.js";
//import { customError } from "../errors/custom.error.js";
import UserService from "../services/users.service.js";

export default class UserController{
    #userService;

    constructor(){
        this.#userService = new UserService();
    }


    async getAllUsers(req,res, next){
        try {
            const users = await this.#userService.findAll(req.query);
            res.send({status:"success",payload:users});
        } catch (error) {
            next(error);
        } 
    }
    
    async getUser (req, res, next) {
        try {
            const user = await this.#userService.findOneById(req.params.uid);
    
            res.send({status: "success", payload: user});
    
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

    async createUser(req, res, next){
        try {
            const user = await this.#userService.insertOne(req.body);
            res.send({status:"success",payload:user});
        } catch (error) {
            next(error);
        }
    }

    async createManyUser(req, res, next, count){
        try {
            if(!count) count = 5;
            const users = await generateUsersMock(Number(count));
            const response = await this.#userService.insertMany(users);
            return response;
            //res.send({ status:"success", payload:response });
        } catch (error) {
            next(error);
        }
    }
    
    async updateUser (req,res, next){
        try {
            const user = await this.#userService.updateOne(req.params.uid, req.body);
            res.send({status:"success",payload:user});
        } catch (error) {
            next(error);
        }
    }
    
    async deleteUser (req,res, next){
        try {
            await this.#userService.deleteOneById(req.params.uid);
            res.send({status:"success",message:"User deleted"});
        } catch (error) {
            next(error);
        }
    }
}