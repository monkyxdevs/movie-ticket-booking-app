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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateJwt = AuthenticateJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const client_1 = require("@prisma/client");
function AuthenticateJwt(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const authorizationHeaders = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        const client = new client_1.PrismaClient;
        if (!authorizationHeaders) {
            return res.status(403).json({ message: "Access Denied: No Token Provided" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(authorizationHeaders, config_1.SECERT);
            const user = yield client.user.findUnique({ where: { userId: decoded.userId } });
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }
            if (user.email !== decoded.email) {
                return res.status(400).send({ message: "Token data does not match user data" });
            }
            req.user = user;
        }
        catch (error) {
            return res.status(400).send({ message: "Invalid or Expired Token" });
        }
    });
}
