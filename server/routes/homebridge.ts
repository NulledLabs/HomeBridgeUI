import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as fs from "fs";

const homebridgeRouter: Router = Router();
const config = require("../../config.json");
const homebridgeDir = config.homebridgeDir

// homebridgeRouter.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
//     const token = request.headers.authorization;

//     verify(token, secret, function(tokenError) {
//         if (tokenError) {
//             return response.status(403).json({
//                 message: "Invalid token, please Log in first"
//             });
//         }

//         next();
//     });
// });

homebridgeRouter.get("/dashboard", (request: Request, response: Response) => {
    var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    response.send(configFile);
});

homebridgeRouter.post("/restart", (request: Request, response: Response) => {
    var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    response.send(configFile);
});

homebridgeRouter.post("/stop", (request: Request, response: Response) => {
    var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    response.send(configFile);
});

homebridgeRouter.post("/start", (request: Request, response: Response) => {
    var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    response.send(configFile);
});

homebridgeRouter.get("/status", (request: Request, response: Response) => {
    var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    response.send(configFile);
});

homebridgeRouter.get("/config", (request: Request, response: Response) => {
    var filePath = homebridgeDir + 'config.json';
    var configFile = fs.readFileSync(filePath,'utf8');

    response.send(configFile);
});

homebridgeRouter.put("/config", (request: Request, response: Response) => {
    var filePath = homebridgeDir + 'config.json';
    var configFile = fs.writeFileSync(filePath,'utf8');

    response.send(configFile);
});

//TODO: REST:Homebridge Log output
homebridgeRouter.get("/config/schema", (request: Request, response: Response) => {
    var filePath = '/Users/Mike/Code/HomeBridgeUI/schemas/homebridge/config.schema.json';
    var configFile = fs.readFileSync(filePath,'utf8');

    response.send(configFile);
});

//TODO: REST:Homebridge Log output
homebridgeRouter.get("/log", (request: Request, response: Response) => {
    var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    response.send(configFile);
});

export { homebridgeRouter }