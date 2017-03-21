"use strict";
var express = require('express');
var npmRouter = express.Router();
exports.npmRouter = npmRouter;
var Queue = require('better-queue');
var readline = require('readline');
var spawn = require('child_process').spawn;
var numTasks = 0;
var q = new Queue(function (cmd, cb) {
    var io = cmd.io;
    console.log("running", cmd.action, cmd.package);
    //console.log(process.env);
    //var child = spawn('notepad', ['c:\\temp\\dup.txt']);
    //var child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', [cmd.action, '-g', cmd.package]);
    //var child = spawn('yarn', ['global', cmd.action, cmd.package, '--json'], {
    var child = spawn('npm', [cmd.action, '-g', cmd.package], {
        shell: true
    });
    var linereader = readline.createInterface(child.stdout, child.stdin);
    linereader.on('line', function (data) {
        console.log("linereader.line:", data);
        io.emit('cmd', {
            "id": cmd.id,
            "action": cmd.action,
            "package": cmd.package,
            "message": data,
            "numTasks": numTasks
        });
    });
    var errreader = readline.createInterface(child.stderr, child.stdin);
    errreader.on('line', function (data) {
        console.log("errreader.line:", data);
        io.emit('cmd', {
            "id": cmd.id,
            "action": cmd.action,
            "package": cmd.package,
            "message": data,
            "numTasks": numTasks
        });
    });
    child.on('error', function (err) {
        console.log("ERROR: ", err);
    });
    child.on('exit', function (code) {
        cb(null);
    });
});
/* GET home page. */
npmRouter.post('/', function (req, res, next) {
    var pkg = req.body.name;
    var action = req.body.action;
    console.log(action, pkg);
    var cmd = {
        "id": new Date().getTime(),
        "action": action,
        "package": pkg,
        "io": res.io
    };
    numTasks++;
    q.push(cmd, function () {
        numTasks--;
        res.io.emit('cmd', {
            numTasks: numTasks
        });
    });
    res.send('ok');
});
//# sourceMappingURL=npm.js.map