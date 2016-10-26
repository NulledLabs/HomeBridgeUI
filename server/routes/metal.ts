import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";

const metalRouter: Router = Router();

//TODO: Change secret to be in config.json
metalRouter.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
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

//TODO: Reboot stub
metalRouter.post("/reboot", (request: Request, response: Response) => {
    response.json({
        text: "Greetings, you have valid token.",
        title: "Protected call"
    });
});

//TODO: Log stub
metalRouter.get("/logs", (request: Request, response: Response) => {
    response.json({
        text: "Greetings, you have valid token.",
        title: "Protected call"
    });
});

export { metalRouter }





