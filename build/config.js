"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import dotenv
var dotenv_1 = __importDefault(require("dotenv"));
//config dotenv and declear the vars
dotenv_1.default.config();
var _a = process.env, POSTGRES_PORT = _a.POSTGRES_PORT, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, ENV = _a.ENV, DCRYPT_PASSWORD = _a.DCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS, TOKEN_SECRET = _a.TOKEN_SECRET, INIT_USER = _a.INIT_USER, INIT_PASSWORD = _a.INIT_PASSWORD;
exports.default = {
    user: POSTGRES_USER,
    init_user: INIT_USER,
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
    devdb: POSTGRES_DB,
    testdb: POSTGRES_TEST_DB,
    password: POSTGRES_PASSWORD,
    init_password: INIT_PASSWORD,
    port: POSTGRES_PORT,
    max: 10,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 0,
    pepper: DCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
};
