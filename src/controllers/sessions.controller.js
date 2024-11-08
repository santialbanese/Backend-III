import jwt from "jsonwebtoken";
import UserService from "../services/users.service.js";
import { createHash, isValidPassword } from "../utils/security.js";

export default class SessionController {
    #userService;
    constructor() {
        this.#userService = new UserService();
    }

    async register(req, res, next) {
        try {
            const { first_name, last_name, email, password } = req.body;
            if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
            const exists = await this.#userService.getUserEmail(email);
            if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
            const hashedPassword = createHash(password);
            const user = {
                first_name,
                last_name,
                email,
                password: hashedPassword
            };
            let result = await this.#userService.getUserEmail(user);
            res.send({ status: "success", payload: result._id });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
            
            const user = await this.#userService.getUserEmail(email);
            if (!user || user.length === 0) return res.status(404).send({ status: "error", error: "User doesn't exist" });
            const userEmail = user[0]; 
            const validPassword = isValidPassword(password, userEmail.password);
            if (!validPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });
            const token = jwt.sign({ id: userEmail._id, email: userEmail.email }, "tokenSecretJWT", { expiresIn: "1h" });
            res.cookie("coderCookie", token, { maxAge: 3600000, httpOnly: true }).send({ status: "success", message: "Logged in" });
            
        } catch (error) {
            next(error);
        }
    }
    

    async current(req, res, next) {
        try {
            const cookie = req.cookies["coderCookie"];
            const user = jwt.verify(cookie, "tokenSecretJWT");
            if (user)
                return res.send({ status: "success", payload: user });
        } catch (error) {
            next(error);
        }
    }

    async unprotectedLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
            const user = await this.#userService.getUserEmail(email);
            if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });
            const ValidPassword = isValidPassword(user, password);
            if (!ValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });
            const token = jwt.sign(user, "tokenSecretJWT", { expiresIn: "1h" });
            res.cookie("unprotectedCookie", token, { maxAge: 3600000, httpOnly: true  }).send({ status: "success", message: "Unprotected Logged in" });
        } catch (error) {
            next(error);
        }
    }

    async unprotectedCurrent(req, res, next) {
        try {
            const cookie = req.cookies["unprotectedCookie"];
            const user = jwt.verify(cookie, "tokenSecretJWT");
            if (user)
                return res.send({ status: "success", payload: user });
        } catch (error) {
            next(error);
        }
    }
}