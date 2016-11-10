const config = require("../../config.json");
const homebridgeDir = config.homebridgeDir;
const homebridgeUIDir = config.homebridgeUIDir;
import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as fs from "fs";
import * as homebridge from "./homebridge";
const request = require('request');

//TODO: Need to comeback and remove this
var Plugin = require(config.homebridgeDir + "/lib/plugin.js").Plugin;
//import * as Plugin from "../homebridge/lib/plugin.js";

const homebridgePluginRouter: Router = Router();

// homebridgeRouter.use((req: Request & { headers: { authorization: string } }, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;

//     verify(token, secret, function(tokenError) {
//         if (tokenError) {
//             return res.status(403).json({
//                 message: "Invalid token, please Log in first"
//             });
//         }

//         next();
//     });
// });

homebridgePluginRouter.get("/", (req: Request, res: Response) => {
    var configFile = fs.readFileSync(homebridgeDir + 'config.json','utf8');

    res.send(configFile);
});

homebridgePluginRouter.get("/add", (req: Request, res: Response) => {
    var name = req.query.name;

    console.log("npm install -g " + name);
    
    var exec = require('child_process').exec, child;

    child = exec('npm install -g ' + name,
        function (error, stdout, stderr) {
            if (error == null)
            {
                console.log(name + ':stdout: ' + stdout);

                res.send(stdout);
            }
            else if (error !== null)
            {
                console.log(name + ':stderr: ' + stderr);
                console.log(name + ':exec error: ' + error);

                res.send(stderr);
            }
    });
});

homebridgePluginRouter.get("/remove", (req: Request, res: Response) => {
    var name = req.query.name;

    console.log("npm uninstall -g " + name);
    
    var exec = require('child_process').exec, child;

    child = exec('npm uninstall -g ' + name,
        function (error, stdout, stderr) {
            if (error == null)
            {
                console.log('stdout: ' + stdout);

                res.send(stdout);
            }
            else if (error !== null)
            {
                console.log('stderr: ' + stderr);
                console.log('exec error: ' + error);

                res.send(stderr);
            }
    });
});

homebridgePluginRouter.get("/update", (req: Request, res: Response) => {
    var name = req.query.name;

    console.log("npm update -g " + name);
    
    var exec = require('child_process').exec, child;

    child = exec('npm update -g ' + name,
        function (error, stdout, stderr) {
            if (error == null)
            {
                console.log('stdout: ' + stdout);

                res.send(stdout);
            }
            else if (error !== null)
            {
                console.log('stderr: ' + stderr);
                console.log('exec error: ' + error);

                res.send(stderr);
            }
    });
});

homebridgePluginRouter.get("/info", (req: Request, res: Response) => {
    var name = req.query.name;
    var url = `https://registry.npmjs.org/${name}`;
    req.pipe(request(url)).pipe(res);
    // console.log("npm update -g " + name);
    
    // var exec = require('child_process').exec, child;

    // child = exec('npm update -g ' + name,
    //     function (error, stdout, stderr) {
    //         if (error == null)
    //         {
    //             console.log('stdout: ' + stdout);

    //             res.send(stdout);
    //         }
    //         else if (error !== null)
    //         {
    //             console.log('stderr: ' + stderr);
    //             console.log('exec error: ' + error);

    //             res.send(stderr);
    //         }
    // });
});

homebridgePluginRouter.get("/installed", (req: Request, res: Response) => {
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

    res.json(configFile);
});

homebridgePluginRouter.get("/outdated", (req: Request, res: Response) => {
    var name = req.query.name;

    console.log("npm outdated -g -json");

    var exec = require('child_process').exec, child;

    child = exec('npm outdated -g -json',
        function (error, stdout, stderr) {
            if (error == null)
            {
                console.log('stdout: ' + stdout);

                res.send(stdout);
            }
            else if (error !== null) {
                console.log('stderr: ' + stderr);
                console.log('exec error: ' + error);

                res.send(stderr);
            }
    });
});

homebridgePluginRouter.get("/search", (req: Request, res: Response) => {

    // npm.load({}, function (err, npm) {
    // npm.commands.owner(['search', 'homebridge'], function (err, res) {
    //         console.log(res);
    //     });
    // });
    // var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    // res.send(configFile);
});

//TODO: More error handling
homebridgePluginRouter.get("/result", (req: Request, res: Response) => {
    var name = req.query.name;
    
    var exec = require('child_process').exec, child;

    child = exec('npm view ' + name,
        function (error, stdout, stderr) {
            if (error == null)
            {
                res.send(stdout);
                console.log('stdout: ' + stdout);
            }
            else if (error !== null) {
                res.send(stderr);
                console.log('stderr: ' + stderr);
                console.log('exec error: ' + error);
            }
    });
});

//TODO: Some sort of special handling since we're dealing with file reading
homebridgePluginRouter.get("/config", (req: Request, res: Response) => {
    const name = req.query.name;
    //const configPath = name + '/config.ui.json';
    //const config = require(configPath)

    var configFile :any[] = getConfig(name).configs;
    var latestConfig :any = {};
    if (configFile && configFile.length > 0)
    {
        latestConfig = configFile[0].config || {};
    }

    res.send(latestConfig);
});

//TODO: Some sort of special handling since we're dealing with file writing
homebridgePluginRouter.put("/config", (req: Request, res: Response) => {
    var name = req.query.name;
    var config = req.body.config;

    var configSave = saveConfigSection(name, config);

    homebridge.buildFullConfig();

    res.send(configSave);
});

//TODO: Check first if the module has one, if not, check if we have one, if not, fail
homebridgePluginRouter.get("/schema", (req: Request, res: Response) => {
    const name = req.query.name;
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

    res.send(schemaFile);
});

//TODO: Error handling
homebridgePluginRouter.get("/readme", (req: Request, res: Response) => {
    var name = req.query.name;
    var filePath = homebridgeDir + 'node_modules/' + name + '/README.md';
    var readMeFile = fs.readFileSync(filePath, 'utf8');

    res.send(readMeFile);
});

function getConfig(name :string) :any
{
    const uiConfigFilePath = getConfigFilePath(name);
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

    return configFile || {};
}

function saveConfigSection(name :string, configSection :string) :boolean
{
    const uiConfigFilePath = getConfigFilePath(name);
    var configFile = getConfig(name);

    config.configs.push({ timestamp: Date.now, config: configSection })

    var configFileWrite = fs.writeFileSync(uiConfigFilePath, 'utf8');

    return true;
}

function getConfigFilePath(name :string)
{
    return homebridgeUIDir + 'homebridgeconfigs/' + name + '.config.json';
}

export { homebridgePluginRouter }