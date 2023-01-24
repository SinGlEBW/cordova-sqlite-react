"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropTableSqlite = void 0;
//TODO: Можно допилит проверку таблицы. Её может не быть и отправлять сообщение не успешное удаление, а что либо другое
const dropTableSqlite = (connect, nameTable) => {
    return new Promise((resolve, reject) => {
        connect.transaction((tx) => { tx.executeSql(`DROP TABLE IF EXISTS ${nameTable}`); }, (error) => { reject({ status: false, msg: `Ошибка транзакции в dropTable:  ${error}` }); }, () => { resolve({ status: true, msg: `Таблица ${nameTable} успешно удалена` }); });
    });
};
exports.dropTableSqlite = dropTableSqlite;
/*-------------------------------------------------------------------------------------------------------------------------------------*/ 
