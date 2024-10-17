export default class PetDTO {
    fromPetDto = (pet) =>{
        return {
            id: pet._id,
            name:pet.name||"",
            specie:pet.specie||"",
            image: pet.image||"",
            birthDate:pet.birthDate||"12-30-2000",
            adopted:false
        };
    };
}