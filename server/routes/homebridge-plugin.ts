const config = require("../../config.json");
const homebridgeDir = config.homebridgeDir;
const homebridgeUIDir = config.homebridgeUIDir;

import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as fs from "fs";
//TODO: Need to comeback and remove this
var Plugin = require(config.homebridgeDir + "/lib/plugin.js").Plugin;
//import * as Plugin from "../homebridge/lib/plugin.js";

const homebridgePluginRouter: Router = Router();

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

homebridgePluginRouter.get("/", (request: Request, response: Response) => {
    var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    response.send(configFile);
});

homebridgePluginRouter.get("/installed", (request: Request, response: Response) => {
    //var configFile = fs.readFileSync('./installedPlugins.json','utf8');
    var configFile = Plugin.installed();

    response.send(configFile);
});

homebridgePluginRouter.get("/search", (request: Request, response: Response) => {

    // npm.load({}, function (err, npm) {
    // npm.commands.owner(['search', 'homebridge'], function (err, res) {
    //         console.log(res);
    //     });
    // });
    // var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    // response.send(configFile);
});

//TODO: More error handling
homebridgePluginRouter.get("/result", (request: Request, response: Response) => {
    var name = request.query.name;
    
    var exec = require('child_process').exec, child;

    child = exec('npm view ' + name,
        function (error, stdout, stderr) {
            if (error == null)
            {
                response.send(stdout);
                console.log('stdout: ' + stdout);
            }
            else if (error !== null) {
                response.send(stderr);
                console.log('stderr: ' + stderr);
                console.log('exec error: ' + error);
            }
    });
});

homebridgePluginRouter.put("/add", (request: Request, response: Response) => {
    var name = request.query.name;
    var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    response.send(configFile);
});

homebridgePluginRouter.delete("/remove", (request: Request, response: Response) => {
    var name = request.query.name;
    var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    response.send(configFile);
});

//TODO: Some sort of special handling since we're dealing with file reading
homebridgePluginRouter.get("/config", (request: Request, response: Response) => {
    const name = request.query.name;
    //const configPath = name + '/config.ui.json';
    //const config = require(configPath)

    const uiConfigFilePath = homebridgeUIDir + 'plugins/' + name + '.config.json';
    //var configFile = fs.readFileSync(filePath, 'utf8');
    var configFile = require(uiConfigFilePath);

    configFile.sort((a:any, b:any): number => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    response.send(configFile[0].config);
});

//TODO: Some sort of special handling since we're dealing with file writing
homebridgePluginRouter.put("/config", (request: Request, response: Response) => {
    var name = request.query.name;
    var filePath = homebridgeDir + 'node_modules/' + name + '/config.json';
    var configFile = fs.writeFileSync(filePath, 'utf8');

    response.send(configFile);
});

//TODO: Check first if the module has one, if not, check if we have one, if not, fail
homebridgePluginRouter.get("/schema", (request: Request, response: Response) => {
    const name = request.query.name;
    const configPath = name + '/config.ui.json';

    const filePath = homebridgeDir + 'node_modules/' + configPath;
    const missingFilePath = homebridgeUIDir + "plugin-schemas/" + configPath;
    var schemaFile = "{}";

    if (fs.existsSync(filePath))
    {
        schemaFile = fs.readFileSync(filePath, 'utf8');
    }
    else if (fs.existsSync(missingFilePath))
    {
        console.log("Filepath does not exist: " + filePath);
        schemaFile = fs.readFileSync(missingFilePath, 'utf8');
    }

    response.send(schemaFile);
});

//TODO: Error handling
homebridgePluginRouter.get("/readme", (request: Request, response: Response) => {
    var name = request.query.name;
    var filePath = homebridgeDir + 'node_modules/' + name + '/README.md';
    var readMeFile = fs.readFileSync(filePath, 'utf8');

    response.send(readMeFile);
});

export { homebridgePluginRouter }