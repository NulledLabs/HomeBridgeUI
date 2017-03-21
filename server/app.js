"use strict";
import express from "express";
import { join } from "path";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';

import { loginRouter } from "./routes/login";
import { protectedRouter } from "./routes/protected";
import { metalRouter } from "./routes/metal";
import { homebridgeRouter } from "./routes/homebridge";
import { homebridgePluginRouter } from "./routes/homebridge-plugin";
import { npmRouter } from "./routes/npm";

var isProduction = process.env.NODE_ENV === 'production';
var host = process.env.APP_HOST || 'localhost';
var port = isProduction ? 8080 : 3000;
var publicPath = path.resolve(__dirname, '..', 'public');
var compiler = require('../webpack.config');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', function(socket){
    socket.emit('cmd', 'hi');
});
app.disable("x-powered-by");
if (!isProduction) {
  app.use(webpackMiddleware(webpack(compiler), {
    // publicPath is required, whereas all other options are optional

    noInfo: false,
    // display no info to console (only warnings and errors)

    quiet: false,
    // display nothing to the console

    lazy: false,
    // switch into lazy mode
    // that means no watching, but recompilation on every request

    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    // watch options (only lazy: false)

    publicPath: "/assets/",
    // public path to bind the middleware to
    // use the same as in webpack

    index: "index.html",
    // the index path for web server

    headers: { "X-Custom-Header": "yes" },
    // custom headers

    stats: {
      colors: true
    },
    // options for formating the statistics

    reporter: null,
    // Provide a custom reporter to change the way how logs are shown.

    serverSideRender: false,
    // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
  }));
  app.use(express.static(publicPath));

} else {
    app.use(express.static(join(__dirname, './dist')));
}


//app.use(favicon(join(__dirname, "./dist", "favicon.ico")));

app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api", protectedRouter);
app.use("/login", loginRouter);
app.use("/client", express.static(join(__dirname, '../client')));
app.use("/metal", metalRouter);
app.use("/homebridge", homebridgeRouter);
app.use("/homebridgeplugin", homebridgePluginRouter);
app.use("/npm", npmRouter);

// error handlers
// development error handler
// will print stacktrace

if (app.get("env") === "development") {
    console.log("Environment:development");
    app.use(express.static(join(__dirname, '../node_modules')));

    app.use(express.static(join(__dirname, '../tools')));

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}
  // This route deals enables HTML5Mode by forwarding missing files to the index.html
  app.all('/*', function(req, res) {
    res.sendfile(publicPath + '/index.html');
  });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err, req, res, next) {
    console.log("Request " + req.url);
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app, server }
