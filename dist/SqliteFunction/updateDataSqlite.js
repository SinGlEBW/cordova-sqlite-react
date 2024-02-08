"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDataSqlite = void 0;
const generateUpdate_1 = require("./../stringSQL/generateUpdate");
const updateDataSqlite = (connect, nameTable, payload, { where, condition, stringWhere }, isUpdateAt) => {
    return new Promise((resolve, reject) => {
        let { newSQLUpdate, arrValuesPayload } = (0, generateUpdate_1.generateSQLUpdate)(nameTable, payload, { where, condition, stringWhere }, isUpdateAt);
        // UPDATE management SET value = ? WHERE key="listRecords"
        // updateAt = datetime('now','localtime')
        connect.transaction((tx) => {
            tx.executeSql(newSQLUpdate, arrValuesPayload);
        }, (err) => {
            let msg = `>>> Ошибка в -> updateDataSqlite <<<: ${nameTable}:  ${err}`;
            reject({ status: false, msg });
        }, () => {
            let msg = `Успешная транзакция updateDataSqlite. ${nameTable}`;
            resolve({ status: true, msg });
        });
    });
};
exports.updateDataSqlite = updateDataSqlite;
