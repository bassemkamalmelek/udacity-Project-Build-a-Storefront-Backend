"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../order");
var user_1 = require("../user");
var product_1 = require("../product");
var database_1 = __importDefault(require("../../database"));
var product = new product_1.ProductModel();
var user = new user_1.UserModel();
var order = new order_1.OrderModel();
var productID = 1;
var userID = 1;
describe('Order Model', function () {
    var _product = {
        id: 1,
        product_name: 'Milk',
        price: '70.5555',
    };
    var _user = {
        id: 1,
        full_name: 'Bassem',
        password: '123',
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _addUroduct, _addUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product.create(_product)];
                case 1:
                    _addUroduct = _a.sent();
                    productID = parseInt(_addUroduct.id, 10);
                    return [4 /*yield*/, user.create(_user)];
                case 2:
                    _addUser = _a.sent();
                    userID = parseInt(_addUser.id, 10);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have an index method', function () {
        expect(product.index).toBeDefined();
    });
    it('should have a show method', function () {
        expect(product.index).toBeDefined();
    });
    it('should have a create method', function () {
        expect(product.index).toBeDefined();
    });
    it('should have a update method', function () {
        expect(product.index).toBeDefined();
    });
    it('should have a delete method', function () {
        expect(product.index).toBeDefined();
    });
    var _order1 = {
        id: 1,
        total: '70.5555',
        user_id: userID,
    };
    it('create method should add a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order.create(_order1)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(_order1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create method should add a product to order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order.addProduct(1, 1, productID, 70.5555, 70.5555)];
                case 1:
                    result = _a.sent();
                    expect(result.id).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method should return a list/count of order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order.index()];
                case 1:
                    result = _a.sent();
                    expect(result.length).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the correct order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order.show('1')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(_order1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete method should remove the order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order.delete('1')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(_order1);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql_dl, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql_dl = 'DELETE FROM orders_products; DELETE FROM orders; DELETE FROM products; DELETE FROM users;';
                    return [4 /*yield*/, conn.query(sql_dl)];
                case 2:
                    _a.sent();
                    sql = 'ALTER SEQUENCE orders_products_id_seq RESTART WITH 1; ALTER SEQUENCE orders_id_seq RESTART WITH 1; ALTER SEQUENCE products_id_seq RESTART WITH 1; ALTER SEQUENCE users_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, conn.query(sql)];
                case 3:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
