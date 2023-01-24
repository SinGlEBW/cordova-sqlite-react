"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySqlite = void 0;
const querySqlite = (connect, sql) => {
    return new Promise((resolve, reject) => {
        connect.transaction((tx) => { tx.executeSql(sql); }, (error) => { reject({ status: false, msg: `Ошибка транзакции в querySqlite:  ${error}` }); }, () => { resolve({ status: true, msg: `Успешная транзакция в querySqlite` }); });
    });
};
exports.querySqlite = querySqlite;
