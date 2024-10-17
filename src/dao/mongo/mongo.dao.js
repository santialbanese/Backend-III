export default class MongoDAO{
    #model;

    constructor(model){
        this.#model = model;
    }

    async findAll(params){
        return await this.#model.find(params);
    };


    async findOneById(id){
        return await this.#model.findOne({ _id: id });
    };

    async save(doc){
        return await this.#model.create(doc);
    };

    async saveMany(docs){
        return await this.#model.insertMany(docs);
    };

    async update(id,doc){
        return await this.#model.findByIdAndUpdate(
            { _id: id },
            { $set: doc },
            { new: true, runValidators: true } 
        );
    };

    async delete(id){
        return await this.#model.findByIdAndDelete({_id: id});
    };
}