import PetRepository from "../repository/PetRepository.js";

export default class petService{
    #petRepository;

    constructor(){
        this.#petRepository = new PetRepository();
    }

    async findAll(filters){
        return await this.#petRepository.findAll(filters); 
    }

    async findOneById(id){
        return await this.#petRepository.findOneById(id);
    }

    async insertOne(data){
        return await this.#petRepository.save(data);
    }

    async insertMany(data){
        return await this.#petRepository.saveMany(data);
    };

    async updateOne(id, data){
        const pet = await this.findOneById(id);
        const newValues = {...pet, ...data};
        return await this.#petRepository.update(pet.id.toString(), newValues);

    }

    async deleteOneById(id){
        return await this.#petRepository.deleteOneById(id);
    }
}