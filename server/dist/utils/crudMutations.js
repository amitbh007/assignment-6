"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObject = exports.updateObject = exports.readObjects = exports.addObject = exports.getObjects = void 0;
const fs = __importStar(require("fs"));
const getObjects = () => {
    const data = fs.readFileSync("../database/data.json", { encoding: "utf8" });
    const jsonData = JSON.parse(data);
    return jsonData;
};
exports.getObjects = getObjects;
const addObject = (user) => {
    const data = fs.readFileSync("../database/data.json", { encoding: "utf8" });
    const jsonData = JSON.parse(data);
    jsonData.push(user);
    fs.writeFileSync("../data.json", JSON.stringify(jsonData));
    return jsonData;
};
exports.addObject = addObject;
const readObjects = () => {
    const data = fs.readFileSync("../database/data.json", { encoding: "utf8" });
    const jsonData = JSON.parse(data);
    return jsonData;
};
exports.readObjects = readObjects;
const updateObject = (email, user) => {
    const data = fs.readFileSync("../database/data.json", { encoding: "utf8" });
    const jsonData = JSON.parse(data);
    const i = jsonData.findIndex((e) => e.email == email);
    if (i < 0)
        return jsonData;
    jsonData[i] = user;
    fs.writeFileSync("../database/data.json", JSON.stringify(jsonData));
    return jsonData;
};
exports.updateObject = updateObject;
const deleteObject = (email) => {
    const data = fs.readFileSync("../database/data.json", { encoding: "utf8" });
    const jsonData = JSON.parse(data);
    const i = jsonData.findIndex((e) => e.email == email);
    if (i < 0)
        return jsonData;
    jsonData.splice(i, 1);
    fs.writeFileSync("../database/data.json", JSON.stringify(jsonData));
    return jsonData;
};
exports.deleteObject = deleteObject;
//# sourceMappingURL=crudMutations.js.map