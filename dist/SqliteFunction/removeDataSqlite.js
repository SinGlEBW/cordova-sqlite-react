"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDataSqlite = void 0;
const generateDelete_1 = require("./../stringSQL/generateDelete");
const removeDataSqlite = (connect, nameTable, param) => {
    return new Promise((resolve, reject) => {
        //'DELETE FROM test WHERE name="isAuth" AND value="true"'
        let { newSQLString } = (0, generateDelete_1.generateSQLDelete)(nameTable, param);
        connect.transaction((tx) => {
            tx.executeSql(newSQLString, [], (tx, res) => { resolve({ status: true, msg: "Успешное удаление" }); }, (tx, err) => { console.log(`removeDataSqlite: ${err}`); });
        }, (err) => {
            let msg = `>>> Ошибка в -> removeDataSqlite <<<: ${nameTable}:  ${err}`;
            reject({ status: false, msg });
        }, () => {
            let msg = `Успешная транзакция removeDataSqlite. ${nameTable}`;
        });
    });
};
exports.removeDataSqlite = removeDataSqlite;
