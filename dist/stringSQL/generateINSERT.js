"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSQLInsertInto = void 0;
const helpers_1 = require("../helpers");
const generateSQLInsertInto = (nameTable, payload) => {
    let arrTotalValuesPayload = [];
    let totalNewSqlSrt = '';
    let countBracket = 0;
    let defaultSqlStr = `INSERT INTO ${nameTable} () VALUES ()`;
    for (let i = 0; i < defaultSqlStr.length; i++) {
        totalNewSqlSrt += defaultSqlStr[i];
        if (defaultSqlStr[i] === '(' && countBracket === 1) {
            for (let j = 0; j < arrTotalValuesPayload.length; j++) {
                totalNewSqlSrt += '?,';
            }
            totalNewSqlSrt = totalNewSqlSrt.replace(/,$/ig, '');
        }
        if (defaultSqlStr[i] === '(' && countBracket === 0) {
            countBracket++;
            for (let key in payload) {
                totalNewSqlSrt += `${key},`;
                let val = (0, helpers_1.convertByTypeForDB)(payload[key]);
                arrTotalValuesPayload.push(val);
            }
            totalNewSqlSrt = totalNewSqlSrt.replace(/,$/ig, '');
        }
    }
    //'INSERT INTO test (value) VALUES (?)'
    console.log(`totalNewSqlSrt: ${totalNewSqlSrt}`);
    return {
        arrValuesPayload: arrTotalValuesPayload,
        newSQLInsert: totalNewSqlSrt
    };
};
exports.generateSQLInsertInto = generateSQLInsertInto;
