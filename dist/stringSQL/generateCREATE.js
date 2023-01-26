"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSQLCreateTable = exports.E_SQLitePayloadType = void 0;
var E_SQLitePayloadType;
(function (E_SQLitePayloadType) {
    E_SQLitePayloadType["ID"] = "INTEGER PRIMARY KEY";
    E_SQLitePayloadType["TEXT"] = "TEXT NOT NULL";
    E_SQLitePayloadType["INTEGER"] = "INTEGER NOT NULL";
    E_SQLitePayloadType["createdAt"] = "datetime default (datetime('now','localtime'))";
    E_SQLitePayloadType["updateAt"] = "datetime default (datetime('now','localtime'))";
})(E_SQLitePayloadType = exports.E_SQLitePayloadType || (exports.E_SQLitePayloadType = {}));
/*
  
*/
const generateSQLCreateTable = (nameTable, payload, isCreateDate) => {
    let totalNewSqlSrt = '';
    if (!Object.entries(payload).length) {
        throw new Error('payload пуст');
    }
    let defaultSqlStr = `CREATE TABLE IF NOT EXISTS ${nameTable} ()`; //
    for (let i = 0; i < defaultSqlStr.length; i++) {
        totalNewSqlSrt += defaultSqlStr[i];
        if (defaultSqlStr[i] === '(') {
            totalNewSqlSrt += `id ${E_SQLitePayloadType.ID},`;
            for (let key in payload) {
                const value = payload[key];
                // TODO: Рассмотреть вариант использования switch
                totalNewSqlSrt += (typeof value === 'string' || typeof value === 'object' || typeof value === 'boolean') ? `${key} ${E_SQLitePayloadType.TEXT},` : '';
                totalNewSqlSrt += (typeof value === 'number') ? `${key} ${E_SQLitePayloadType.INTEGER},` : '';
            }
            // totalNewSqlSrt += 'type TEXT NOT NULL,';
            // TODO: createdAt updateAt - не правильно работают 
            if (isCreateDate !== false) {
                totalNewSqlSrt += `createdAt ${E_SQLitePayloadType.createdAt},updateAt ${E_SQLitePayloadType.updateAt},`;
            }
            totalNewSqlSrt = totalNewSqlSrt.replace(/,$/ig, '');
        }
    }
    return {
        newSQLCreate: totalNewSqlSrt
    };
};
exports.generateSQLCreateTable = generateSQLCreateTable;
(0, exports.generateSQLCreateTable)("TEST", { name: '', age: '' });
