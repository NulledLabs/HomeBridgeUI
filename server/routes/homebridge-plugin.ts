const config = require("../../config.json");
const homebridgeDir = config.homebridgeDir;
const homebridgeUIDir = config.homebridgeUIDir;
const npmCheck: any = require('npm-check');
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
    var configFile = fs.readFileSync(homebridgeDir + 'config.json','utf8');

    response.send(configFile);
});

homebridgePluginRouter.get("/add", (request: Request, response: Response) => {
    var name = request.query.name;

    console.log("npm install -g " + name);
    
    var exec = require('child_process').exec, child;

    child = exec('npm install -g ' + name,
        function (error, stdout, stderr) {
            if (error == null)
            {
                console.log(name + ':stdout: ' + stdout);

                response.send(stdout);
            }
            else if (error !== null)
            {
                console.log(name + ':stderr: ' + stderr);
                console.log(name + ':exec error: ' + error);

                response.send(stderr);
            }
    });
});

homebridgePluginRouter.get("/remove", (request: Request, response: Response) => {
    var name = request.query.name;

    console.log("npm uninstall -g " + name);
    
    var exec = require('child_process').exec, child;

    child = exec('npm uninstall -g ' + name,
        function (error, stdout, stderr) {
            if (error == null)
            {
                console.log('stdout: ' + stdout);

                response.send(stdout);
            }
            else if (error !== null)
            {
                console.log('stderr: ' + stderr);
                console.log('exec error: ' + error);

                response.send(stderr);
            }
    });
});

homebridgePluginRouter.get("/update", (request: Request, response: Response) => {
    var name = request.query.name;

    console.log("npm update -g " + name);
    
    var exec = require('child_process').exec, child;

    child = exec('npm update -g ' + name,
        function (error, stdout, stderr) {
            if (error == null)
            {
                console.log('stdout: ' + stdout);

                response.send(stdout);
            }
            else if (error !== null)
            {
                console.log('stderr: ' + stderr);
                console.log('exec error: ' + error);

                response.send(stderr);
            }
    });
});

homebridgePluginRouter.get("/installed", (request: Request, response: Response) => {
    //var configFile = fs.readFileSync('./installedPlugins.json','utf8');
    Plugin.addPluginPath(homebridgeDir + "node_modules");
    console.log("Homebridge plugin paths:" + Plugin.paths.join(", "));

    var installedPlugins :Array<any> = Plugin.installed();
    var configFile = {};

    for (var i = 0; i < installedPlugins.length; i++)
    {
        var plugin :any = installedPlugins[i];
        let pjson = Plugin.loadPackageJSON(plugin.pluginPath);
        configFile[pjson.name] = pjson;
    }

    response.json(configFile);
});

homebridgePluginRouter.get("/outdated", (request: Request, response: Response) => {
    var name = request.query.name;

    console.log("npm outdated -g -json");

    var exec = require('child_process').exec, child;

    child = exec('npm outdated -g -json',
        function (error, stdout, stderr) {
            if (error == null)
            {
                console.log('stdout: ' + stdout);

                response.send(stdout);
            }
            else if (error !== null) {
                console.log('stderr: ' + stderr);
                console.log('exec error: ' + error);

                response.send(stderr);
            }
    });
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

//TODO: Some sort of special handling since we're dealing with file reading
homebridgePluginRouter.get("/config", (request: Request, response: Response) => {
    const name = request.query.name;
    //const configPath = name + '/config.ui.json';
    //const config = require(configPath)

    var configFile = getConfigHistory(name);
    var latestConfig :any = {};
    if (configFile.length > 0)
    {
        latestConfig = configFile[0].config || {};
    }

    response.send(latestConfig);
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
    const missingFilePath = homebridgeUIDir + "ui-schemas/" + configPath;
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

function getConfigHistory(name :string) :any[]
{
    const uiConfigFilePath = homebridgeUIDir + 'homebridgeconfigs/' + name + '.config.json';
    var configFile :any = {};
    
    if (fs.existsSync(uiConfigFilePath))
    {
        var configFile = require(uiConfigFilePath);

        configFile.configs.sort((a:any, b:any): number => {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
    }

    return configFile.configs || {};
}

export { homebridgePluginRouter }