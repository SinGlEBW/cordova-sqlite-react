"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSQLDelete = void 0;
const createGenerate_1 = require("./createGenerate");
exports.generateSQLDelete = (0, createGenerate_1.createGenerateSqlString)('DELETE FROM');
