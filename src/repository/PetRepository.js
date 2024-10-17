import { MONGODB } from "../constant/dao.constant.js";
import FactoryDAO from "../dao/factory.js";
import PetDTO from "../dto/Pet.dto.js";
import { customError } from "../errors/custom.error.js";


export default class petRepository{
    #petDAO;
    #petDTO;

    constructor(){
        const factory = new FactoryDAO();
        this.#petDAO = factory.createPet(MONGODB);
        this.#petDTO = new PetDTO();
    }

    async findAll(paramsFilters) {
        const $and = [];
        if (paramsFilters?.specie) $and.push({ specie: { $regex: paramsFilters.specie, $options: "i" } });
    
        const filters = $and.length > 0 ? { $and } : {};
        const pets = await this.#petDAO.findAll(filters);
        const petsDTO = pets?.map((pet) => this.#petDTO.fromPetDto(pet));
        return petsDTO;
    }
    

    async findOneById(id){
        if(id.length !== 24){
            throw customError.invalidIdError();
        } 
        const pet = await this.#petDAO.findOneById(id);

        if (!pet) throw customError.notFoundError();
        
        return this.#petDTO.fromPetDto(pet);
    }

    async save(data){
        const pet = await this.#petDAO.save(data);
        return this.#petDTO.fromPetDto(pet);
    }

    async saveMany(data){

        const pets = await this.#petDAO.saveMany(data);
        const petsDTO = pets?.map((pet) => this.#petDTO.fromPetDto(pet));
        return petsDTO;
    };

    async update(id,data){
        const pet = await this.findOneById(id);
        return await this.#petDAO.update(pet.id, data);
    };
    
    async deleteOneById(id){
        const pet = await this.findOneById(id);
        await this.#petDAO.delete(id);
        return pet;
    }
    //ya estaba
    getpetByEmail = (email) =>{
        return this.getBy({email});
    };
}