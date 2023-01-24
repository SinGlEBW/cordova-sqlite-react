"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertByTypeFromDB = exports.convertByTypeForDB = void 0;
const convertByTypeForDB = (value) => {
    let val;
    if (typeof value === "object" || typeof value === "boolean") {
        val = JSON.stringify(value);
    }
    else if (typeof value === 'string') {
        val = value.trim();
    }
    else {
        val = value;
    }
    return val;
};
exports.convertByTypeForDB = convertByTypeForDB;
const convertByTypeFromDB = (value) => {
    try {
        return JSON.parse(value);
    }
    catch (err) {
        return isNaN(Number(value)) ? value : Number(value);
    }
};
exports.convertByTypeFromDB = convertByTypeFromDB;
