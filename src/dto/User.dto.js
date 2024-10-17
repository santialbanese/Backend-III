import { createHash } from "../utils/security.js";

export default class UserDTO {
    fromModel(model) {
        return {
            id: model._id,
            fullName: `${model.first_name} ${model.last_name}`,
            email: model.email,
            password: model.password,
            role: model.role,
            pets: model.pets.map(pet => ({
                id: pet._id,       
                name: pet.name     
            }))
        };
    }

    fromData(data) {
        /* if(data?.fullName){
            const name = data.fullName?.split(" ");
            return {
                id: data.id || null,
                first_name: name[0] ?? "",
                last_name: name[1] ?? "",
                email: data.email,
                age: data.age,
                password: data.password ? createHash(data.password) : null,
                role: data.role,
                pets: data.pets?.map(pet => ({
                    id: pet._id,       
                    name: pet.name     
                })) || []
            };
        } */
        return {
            id: data.id || null,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password ? createHash(data.password) : null,
            role: data.role,
            pets: data.pets?.map(pet => ({
                id: pet._id,       
                name: pet.name     
            })) || []
        };
    }
}
