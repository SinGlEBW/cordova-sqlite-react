"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSQLSelect = void 0;
const createGenerate_1 = require("./createGenerate");
exports.generateSQLSelect = (0, createGenerate_1.createGenerateSqlString)('SELECT * FROM');
