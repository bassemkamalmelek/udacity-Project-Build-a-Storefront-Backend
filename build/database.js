"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import psotgres
var pg_1 = require("pg");
//import configs
var config_1 = __importDefault(require("./config"));
var client = new pg_1.Pool({
    host: config_1.default.host,
    port: parseInt(config_1.default.port, 10),
    database: config_1.default.database,
    user: config_1.default.user,
    password: config_1.default.password,
});
client.on('error', function (err) {
    console.log(err.message);
});
exports.default = client;
