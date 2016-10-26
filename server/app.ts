import * as express from "express";
import { join } from "path";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";

import { loginRouter } from "./routes/login";
import { protectedRouter } from "./routes/protected";
import { metalRouter } from "./routes/metal";
import { homebridgeRouter } from "./routes/homebridge";
import { homebridgePluginRouter } from "./routes/homebridge-plugin";

const app: express.Application = express();
app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use(express.static(join(__dirname, '../public')));

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api", protectedRouter);
app.use("/login", loginRouter);
app.use("/client", express.static(join(__dirname, '../client')));
app.use("/metal", metalRouter);
app.use("/homebridge", homebridgeRouter);
app.use("/homebridgeplugin", homebridgePluginRouter);

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    console.log("Environment:development");
    app.use(express.static(join(__dirname, '../node_modules')));
    app.use(express.static(join(__dirname, '../tools')));

    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }
