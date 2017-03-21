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

const homebridgePluginRouter = Router();

// homebridgeRouter.use((req & { headers: { authorization: string } }, res, next: NextFunction) => {
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

homebridgePluginRouter.get("/", (req, res) => {
    var configFile = fs.readFileSync(homebridgeDir + 'config.json','utf8');

    res.send(configFile);
});

homebridgePluginRouter.get("/add", (req, res) => {
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

homebridgePluginRouter.get("/remove", (req, res) => {
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

homebridgePluginRouter.get("/update", (req, res) => {
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

homebridgePluginRouter.get("/info", (req, res) => {
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

homebridgePluginRouter.get("/installed", (req, res) => {
    //var configFile = fs.readFileSync('./installedPlugins.json','utf8');
    Plugin.addPluginPath(homebridgeDir + "node_modules");
    console.log("Homebridge plugin paths:" + Plugin.paths.join(", "));

    var installedPlugins = Plugin.installed();
    var configFile = {};

    for (var i = 0; i < installedPlugins.length; i++)
    {
        var plugin = installedPlugins[i];
        let pjson = Plugin.loadPackageJSON(plugin.pluginPath);
        configFile[pjson.name] = pjson;
    }

    res.json(configFile);
});

homebridgePluginRouter.get("/outdated", (req, res) => {
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

homebridgePluginRouter.get("/search", (req, res) => {
    var query = req.query.query;
    var from = req.query.from;
    var size = req.query.size;
    var url = `https://api.npms.io/v2/search?q=${query}+keywords%3Ahomebridge-plugin&from=${from}&size=${size}`;
    req.pipe(request(url)).pipe(res);

    // npm.load({}, function (err, npm) {
    // npm.commands.owner(['search', 'homebridge'], function (err, res) {
    //         console.log(res);
    //     });
    // });
    // var configFile = fs.readFileSync('/Users/Mike/Code/homebridge/config.json','utf8');

    // res.send(configFile);
});

//TODO: More error handling
homebridgePluginRouter.get("/result", (req, res) => {
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
homebridgePluginRouter.get("/config", (req, res) => {
    const name = req.query.name;
    //const configPath = name + '/config.ui.json';
    //const config = require(configPath)

    var configFile = getConfig(name).configs;
    var latestConfig = {};
    if (configFile && configFile.length > 0)
    {
        latestConfig = configFile[0].config || {};
    }

    res.send(latestConfig);
});

//TODO: Some sort of special handling since we're dealing with file writing
homebridgePluginRouter.put("/config", (req, res) => {
    var name = req.query.name;
    var config = req.body;

    var configSave = saveConfigSection(name, config);

    homebridge.buildFullConfig();

    res.send(configSave);
});

//TODO: Check first if the module has one, if not, check if we have one, if not, fail
homebridgePluginRouter.get("/schema", (req, res) => {
    const name = req.query.name;
    const configPath = name + '/config.ui.json';

    // TODO: change this to the global node_modules folder.  
    //       It's not a dependency of homebridge, it's a peer-dependency...
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
homebridgePluginRouter.get("/readme", (req, res) => {
    var name = req.query.name;
    var filePath = homebridgeDir + 'node_modules/' + name + '/README.md';
    var readMeFile = fs.readFileSync(filePath, 'utf8');

    res.send(readMeFile);
});

function getConfig(name)
{
    const uiConfigFilePath = getConfigFilePath(name);
    var configFile = {};
    
    if (fs.existsSync(uiConfigFilePath))
    {
        var configFile = require(uiConfigFilePath);

        configFile.configs.sort((a, b) => {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
    }

    return configFile || {};
}

function saveConfigSection(name, configSection)
{
    const uiConfigFilePath = getConfigFilePath(name);
    var configFile = getConfig(name);

    config.configs.push({ timestamp: Date.now, config: configSection })

    var configFileWrite = fs.writeFileSync(uiConfigFilePath, 'utf8');

    return true;
}

function getConfigFilePath(name)
{
    return homebridgeUIDir + 'homebridgeconfigs/' + name + '.config.json';
}

export { homebridgePluginRouter }