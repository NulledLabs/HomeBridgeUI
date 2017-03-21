import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";

const protectedRouter = Router();

//TODO: Change secret to be in config.json
protectedRouter.use((request, response, next) => {
    const token = request.headers.authorization;

    verify(token, secret, function(tokenError) {
        if (tokenError) {
            return response.status(403).json({
                message: "Invalid token, please Log in first"
            });
        }

        next();
    });
});

protectedRouter.get("/", (request, response) => {
    response.json({
        text: "Greetings, you have valid token.",
        title: "Protected call"
    });
});

export { protectedRouter }