import AdoptionRepository from "../repository/AdoptionRepository.js";

export default class adopionService{
    #adoptionRepository;

    constructor(){
        this.#adoptionRepository = new AdoptionRepository();
    }

    async findAll(filters){
        return await this.#adoptionRepository.findAll(filters); 
    }

    async findOneById(id){
        return await this.#adoptionRepository.findOneById(id);
    }

    async insertOne(data){
        return await this.#adoptionRepository.save(data);
    }

    async insertMany(data){
        return await this.#adoptionRepository.saveMany(data);
    };

    async updateOne(id, data){
        const adoption = await this.findOneById(id);
        const newValues = {...adoption, ...data};
        return await this.#adoptionRepository.update(adoption.id.toString(), newValues);

    }

    async deleteOneById(id){
        return await this.#adoptionRepository.deleteOneById(id);
    }
}