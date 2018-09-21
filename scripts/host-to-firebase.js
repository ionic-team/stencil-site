"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const readFile = util_1.promisify(fs_1.default.readFile);
const writeFile = util_1.promisify(fs_1.default.writeFile);
const HOSTCONFIG_SRC = './www/host.config.json';
const FIREBASE_SRC = './firebase-base.json';
const FIREBASE_DEST = './firebase.json';
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const hostDataSrc = yield readFile(HOSTCONFIG_SRC, 'utf-8');
        const hostData = JSON.parse(hostDataSrc);
        const firebaseDataSrc = yield readFile(FIREBASE_SRC, 'utf-8');
        const firebaseData = JSON.parse(firebaseDataSrc);
        const headerData = hostData.hosting.rules;
        const fireBaseHeaders = headerData.map(entry => {
            const headers = entry.headers.map(header => ({
                "key": header.name,
                "value": header.value
            }));
            return {
                source: entry.include,
                headers
            };
        });
        const finalData = {
            hosting: Object.assign({}, firebaseData.hosting, { headers: fireBaseHeaders })
        };
        yield writeFile(FIREBASE_DEST, JSON.stringify(finalData), { encoding: 'utf8' });
    });
})();
