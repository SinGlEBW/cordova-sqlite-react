"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTableSqlite = void 0;
const checkTableSqlite = (connect, nameTable) => {
    return new Promise((resolve, reject) => {
        connect.transaction((tx) => {
            let sql = nameTable
                ? `SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`
                : `SELECT name FROM sqlite_master WHERE type='table'`;
            tx.executeSql(sql, [], (tx, res) => {
                if (nameTable) {
                    let isTable = res.rows.item(0) && res.rows.item(0).name === nameTable;
                    if (isTable) {
                        resolve({ status: true, msg: `Таблица ${nameTable} существует` });
                        return;
                    }
                    resolve({ status: false, msg: `Таблица ${nameTable} не найдена` });
                }
                else {
                    let tables = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        tables.push(res.rows.item(i));
                    }
                    resolve({ status: true, msg: 'Список найденных таблиц', tables });
                }
            }, (tx, err) => { console.log(err); });
        }, (err) => { reject({ status: false, msg: `Ошибка транзакции checkTable: ${err}` }); }, () => { });
    });
};
exports.checkTableSqlite = checkTableSqlite;
/*-------------------------------------------------------------------------------------------------------------------------------------*/ 
