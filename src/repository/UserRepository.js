import { MONGODB } from "../constant/dao.constant.js";
import FactoryDAO from "../dao/factory.js";
import UserDTO from "../dto/User.dto.js";
import { customError } from "../errors/custom.error.js";


export default class UserRepository{
    #userDAO;
    #userDTO;

    constructor(){
        const factory = new FactoryDAO();
        this.#userDAO = factory.createUser(MONGODB);
        this.#userDTO = new UserDTO();
    }

    async findAll(paramsFilters) {
        const $and = [];
    
        if (paramsFilters?.fullName) {
            const [first_name, last_name] = paramsFilters.fullName.split(" ");
    
            if (first_name) {
                $and.push({ first_name: { $regex: first_name, $options: "i" } });
            }
            
            if (last_name) {
                $and.push({ last_name: { $regex: last_name, $options: "i" } });
            } 
        }
        if(paramsFilters?.email){
            $and.push({ email: { $regex: paramsFilters.email, $options: "i" } });
        }
    
        const filters = $and.length > 0 ? { $and } : {};
        const users = await this.#userDAO.findAll(filters);
        const usersDTO = users?.map((user) => this.#userDTO.fromModel(user));
        return usersDTO;
    }
    

    async findOneById(id){
        if(id.length !== 24){
            throw customError.invalidIdError();
        } 
        
        const user = await this.#userDAO.findOneById(id);

        if (!user) throw customError.notFoundError();
        
        return this.#userDTO.fromModel(user);
    }

    async save(data){
        const userDTO = this.#userDTO.fromData(data);
        const user = await this.#userDAO.save(userDTO); 
        return this.#userDTO.fromModel(user);
    }

    async saveMany(data){

        const users = await this.#userDAO.saveMany(data);
        const usersDTO = users?.map((user) => this.#userDTO.fromModel(user));
        return usersDTO;
    };

    async update(id,data){
        const user = await this.findOneById(id);
        return await this.#userDAO.update(user.id, data);
    };
    
    async deleteOneById(id){
        const user = await this.findOneById(id);
        await this.#userDAO.delete(id);
        return user;
    }
    //ya estaba
    async getUserByEmail(email){
        return await this.findAll({email});
    };
}