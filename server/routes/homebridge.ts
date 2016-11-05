import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as fs from "fs";
import * as os from "os";

const homebridgeRouter: Router = Router();

const config = require("../../config.json");

const homebridgeDir = config.homebridgeDir;

const homebridgeHomeDir = os.homedir() + "/.homebridge/";

const homebridgeUIDir = config.homebridgeUIDir;
const homebridgeConfigsDir = homebridgeUIDir + "homebridgeconfigs/";

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

homebridgeRouter.get("/config/rebuild", (request: Request, response: Response) => {
    buildFullConfig();

    response.send("Rebuilding Homebridge Config");
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

function buildFullConfig()
{
    var homebridgeConfig = {"bridge":{}, "description":"", "platforms":[], "accessories":[]};

    var homebridgeConfigFile :any = require(homebridgeConfigsDir + 'homebridge.config.json');
    homebridgeConfig = merge([homebridgeConfig, homebridgeConfigFile.configs[homebridgeConfigFile.configs.length - 1].config]);

    var configDir = homebridgeConfigsDir;
    var configFiles :string[] = fs.readdirSync(configDir);

    configFiles.forEach(fileName => {
        let configFile :any = require(configDir + fileName);
        let config = configFile.configs[configFile.configs.length - 1].config;
        if (config.accessories != null)
        {
            //homebridgeConfig.accessories.push(accessories);
            homebridgeConfig.accessories = homebridgeConfig.accessories.concat(config.accessories);
        }
        if (config.platforms != null)
        {
            //homebridgeConfig.platforms.push(platforms);
            homebridgeConfig.platforms = homebridgeConfig.platforms.concat(config.platforms);
        }
    });

    // if (!fs.existsSync(homebridgeHomeDir.substr(0, homebridgeHomeDir.length - 1))) {
    //     fs.mkdirSync(homebridgeHomeDir.substr(0, homebridgeHomeDir.length - 1));
    // }
    var configFile = fs.writeFileSync(homebridgeHomeDir + "config.json", JSON.stringify(homebridgeConfig, null, '\t'), 'utf8');
}

function merge(args :any[]) :any
{
    const newObj = {};
    for (const obj of args) {
        for (const key in obj) {
            //copy all the fields
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

export { homebridgeRouter, buildFullConfig }