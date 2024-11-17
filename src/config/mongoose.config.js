import { connect, Types } from "mongoose";
import { logger } from "../utils/logger.js";

export const connectDB = () => { 
    const URI = process.env.MONGODB_URI;

    try {
        connect(URI, { dbName: "Backend3" }); 
        logger.info("Conectado a MongoDB"); 
    } catch (error) {
        console.error("Error al conectar con MongoDB", error.message);
    }
};
export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};