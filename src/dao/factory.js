import { MONGODB } from "../constant/dao.constant.js";
import UserModel from "./mongo/models/User.js";
import MongoDAO from "./mongo/mongo.dao.js";
import PetModel from "./mongo/models/Pet.js";
import AdoptionModel from "./mongo/models/Adoption.js";

export default class FactoryDAO{

    createUser(classname){
        if(MONGODB == classname){
            return new MongoDAO(UserModel);
        }
    }
    createPet(classname){
        if(MONGODB == classname){
            return new MongoDAO(PetModel);
        }
    }
    createAdoption(classname){
        if(MONGODB == classname){
            return new MongoDAO(AdoptionModel);
        }
    }
}