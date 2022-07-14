"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var validateTokenMiddleware = function (req, res, next) {
    try {
        var authHeader = req.get('Authorization');
        if (authHeader) {
            var _bearer = authHeader.split(' ')[0].toLowerCase();
            var _token = authHeader.split(' ')[1];
            if (_token && _bearer === 'bearer') {
                var tkDecode = jsonwebtoken_1.default.verify(_token, config_1.default.tokenSecret);
                if (tkDecode) {
                    next();
                }
                else {
                    next('Athorization error');
                }
            }
            else {
                next('Athorization error');
            }
        }
        else {
            next('Athorization error');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.validateTokenMiddleware = validateTokenMiddleware;
