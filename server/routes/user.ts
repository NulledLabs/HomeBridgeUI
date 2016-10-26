import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "../config";
import * as fs from "fs";

const userRouter: Router = Router();

// const user = {
//     hashedPassword: "6fb3a68cb5fe34d0c2c9fc3807c8fa9bc0e7dd10023065ea4233d40a2d6bb4a7e336a82f48bcb5a7cc95b8a590cf03a4a07615a226d09a89420a342584a" +
//     "a28748336aa0feb7ac3a12200d13641c8f8e26398cfdaf268dd68746982bcf59415670655edf4e9ac30f6310bd2248cb9bc185db8059fe979294dd3611fdf28c2b731",
//     salt: "OxDZYpi9BBJUZTTaC/yuuF3Y634YZ90KjpNa+Km4qGgZXGI6vhSWW0T91rharcQWIjG2uPZEPXiKGnSAQ73s352aom56AIYpYCfk7uNsd+7AzaQ6dxTnd9AzCCdIc/J" +
//     "62JohpHPJ5eGHUJJy3PAgHYcfVzvBHnIQlTJCQdQAonQ=",
//     username: "john"
// };
const user = require('../../config.json');

userRouter.post("/change", function (request: Request, response: Response, next: NextFunction) {

    if (!request.body.hasOwnProperty("username")) {
        let err = new Error("No username");
        return next(err);
    }

    if (!request.body.hasOwnProperty("password")) {
        let err = new Error("No password");
        return next(err);
    }

    var username = request.body.username;
    var password = request.body.password;

    //TODO: Save to config.json

    const salt = randomBytes(128).toString("base64");

    pbkdf2(password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
        response.json({
            hashed: hash.toString("hex"),
            salt: salt
        });
    });
});

export { userRouter }
