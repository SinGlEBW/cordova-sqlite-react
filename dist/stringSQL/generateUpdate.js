"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSQLUpdate = void 0;
const helpers_1 = require("../helpers");
const generateSQLUpdate = (nameTable, payload, { where, condition, stringWhere }) => {
    let arrTotalValuesPayload = [];
    let defaultSqlStr = `UPDATE ${nameTable} SET `;
    for (let key in payload) {
        defaultSqlStr += (`${key} = ?,`);
        let val = (0, helpers_1.convertByTypeForDB)(payload[key]);
        arrTotalValuesPayload.push(val);
    }
    defaultSqlStr = defaultSqlStr.replace(/,$/ig, ` ${stringWhere ? stringWhere : 'WHERE'}`);
    if (stringWhere) {
        defaultSqlStr += stringWhere;
    }
    else if (where) {
        for (let [key, value] of Object.entries(where)) {
            defaultSqlStr += (` ${key}="${value}" ${condition ? condition : 'AND'}`);
        }
        defaultSqlStr = defaultSqlStr.replace(/(\sAND|\sOR)$/ig, ``);
    }
    else {
        console.log('Не переданы из аргументов where | stringWhere');
    }
    return {
        arrValuesPayload: arrTotalValuesPayload,
        newSQLUpdate: defaultSqlStr
    };
};
exports.generateSQLUpdate = generateSQLUpdate;
