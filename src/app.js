/* eslint-disable no-undef */
import { config as dotenvConfig } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongoose.config.js";

// Cargar las variables de entorno antes de usarlas
import paths from "./utils/paths.js";
dotenvConfig({ path: paths.env });
connectDB();
import UsersRouter from "./routes/users.router.js"; 
import PetRouter from "./routes/pets.router.js"; 
import MockRouter from "./routes/mock.router.js"; 
import SessionRouter from "./routes/sessions.router.js";
import AdoptionRouter from "./routes/adoption.router.js";
import { errorHandle } from "./errors/err.Handle.js";
import { logger } from "./utils/logger.js";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swagger.config.js";

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser(process.env.SECRET_KEY));

server.use("/api/users", UsersRouter); 
server.use("/api/pets", PetRouter);  
server.use("/api/mocks", MockRouter);  
server.use("/api/sessions", SessionRouter);  
server.use("/api/adoptions", AdoptionRouter);  
server.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
server.use(errorHandle);


server.listen(process.env.PORT, () => { 
    logger.info(`Ejecutándose en http://localhost:${process.env.PORT}`);
});
 