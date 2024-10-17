import UserRepository from "../repository/UserRepository.js";

export default class UserService{
    #userRepository;

    constructor(){
        this.#userRepository = new UserRepository();
    }

    async findAll(filters){
        return await this.#userRepository.findAll(filters); 
    }

    async findOneById(id){
        return await this.#userRepository.findOneById(id);
    }

    async insertOne(data){
        return await this.#userRepository.save(data);
    }

    async insertMany(data){
        return await this.#userRepository.saveMany(data);
    };

    async updateOne(id, data){
        const user = await this.findOneById(id);
        const newValues = {...user, ...data};
        return await this.#userRepository.update(user.id.toString(), newValues);

    }

    async deleteOneById(id){
        return await this.#userRepository.deleteOneById(id);
    }

    async getUserEmail(email){
        return this.#userRepository.getUserByEmail(email);
    }
}