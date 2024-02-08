"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDataSqlite = void 0;
const stringSQL_1 = require("./../stringSQL");
const setDataSqlite = (connect, nameTable, payload, options) => {
    return new Promise((resolve, reject) => {
        let { newSQLCreate } = (0, stringSQL_1.generateSQLCreateTable)(nameTable, payload, (options === null || options === void 0 ? void 0 : options.isCreateDate) ? options === null || options === void 0 ? void 0 : options.isCreateDate : undefined);
        let { newSQLInsert, arrValuesPayload } = (0, stringSQL_1.generateSQLInsertInto)(nameTable, payload);
        //TODO: Возможно придётся делать проверку на соответствие структуры колонок. Добавлять если их нет или выдавать ошибку
        connect.transaction((tx) => {
            (options === null || options === void 0 ? void 0 : options.rewriteTable) && tx.executeSql(`DROP TABLE IF EXISTS ${nameTable}`);
            // options?.arrSql 
            //TODO: Добавить логику Alter table
            // UPDATE management SET updateAt = ? WHERE key="listRecords""
            tx.executeSql(newSQLCreate); //Если не существует создаст
            tx.executeSql(newSQLInsert, arrValuesPayload);
        }, (err) => {
            let msg = `>>> Ошибка в -> setDataSqlite <<<: ${err}`;
            console.error(msg);
            reject({ status: false, msg });
        }, () => {
            let msg = `Успешная транзакция setDataSqlite. ${nameTable}`;
            resolve({ status: true, msg });
        });
    });
};
exports.setDataSqlite = setDataSqlite;
/*
db.sqlBatch([
  'CREATE TABLE IF NOT EXISTS DemoTable (name, score)',
  [ 'INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101] ],
  [ 'INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202] ],
], function() {
  console.log('Populated database OK');
}, function(error) {
  console.log('SQL batch ERROR: ' + error.message);
});
*/
