import { MONGODB } from "../constant/dao.constant.js";
import FactoryDAO from "../dao/factory.js";
import { customError } from "../errors/custom.error.js";

export default class AdoptionRepository {
    #adoptionDAO;
    constructor(){
        const factory = new FactoryDAO();
        this.#adoptionDAO = factory.createAdoption(MONGODB); 
    }

    async findAll(paramsFilters) {
        const $and = [];
        if (paramsFilters?.specie) $and.push({ specie: { $regex: paramsFilters.specie, $options: "i" } });
    
        const filters = $and.length > 0 ? { $and } : {};
        const adoptions = await this.#adoptionDAO.findAll(filters);
        return adoptions;
    }
    

    async findOneById(id){
        if(id.length !== 24){
            throw customError.invalidIdError();
        } 
        const adoption = await this.#adoptionDAO.findOneById(id);

        if (!adoption) throw customError.notFoundError();
        
        return adoption;
    }

    async save(data){
        const adoption = await this.#adoptionDAO.save(data);
        return adoption;
    }

    async saveMany(data){

        const adoptions = await this.#adoptionDAO.saveMany(data);
        return adoptions;
    };

    async update(id,data){
        const adoption = await this.findOneById(id);
        return await this.#adoptionDAO.update(adoption.id, data);
    };
    
    async deleteOneById(id){
        const adoption = await this.findOneById(id);
        await this.#adoptionDAO.delete(id);
        return adoption;
    }
    //ya estaba
    getpetByEmail = (email) =>{
        return this.getBy({email});
    };
}