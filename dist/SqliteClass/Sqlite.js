"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite = void 0;
const querySqlite_1 = require("./../SqliteFunction/querySqlite");
const SqliteFunction_1 = require("./../SqliteFunction");
;
const getStatusAndDataJson = (str) => {
    let data = null;
    try {
        data = JSON.parse(str);
    }
    catch (e) {
        return [false, data];
    }
    return [true, data];
};
class Sqlite {
}
exports.Sqlite = Sqlite;
Sqlite.isCreateDate = true;
Sqlite.openDB = () => (0, SqliteFunction_1.openDbSqlite)();
Sqlite.closeDB = () => window.db ? window.db.close() : console.log('Не возможно закрыть базу');
Sqlite.query = (sql) => {
    return new Promise((resolve, reject) => {
        (0, querySqlite_1.querySqlite)(Sqlite.openDB(), sql)
            .then(resolve)
            .catch(reject);
    });
};
Sqlite.checkTable = (nameTable) => {
    return new Promise((resolve, reject) => {
        (0, SqliteFunction_1.checkTableSqlite)(Sqlite.openDB(), nameTable)
            .then(resolve)
            .catch(reject);
    });
};
Sqlite.setData = (nameTable, payload, options) => {
    return new Promise((resolve, reject) => {
        (0, SqliteFunction_1.setDataSqlite)(Sqlite.openDB(), nameTable, payload, options)
            .then(resolve)
            .catch(reject);
    });
};
Sqlite.updateData = (nameTable, payload, { where, stringWhere, condition }) => {
    return new Promise((resolve, reject) => {
        Sqlite.getData(nameTable, { where, stringWhere, condition })
            .then(({ status, values }) => {
            let isUpdateAt = values[0] && 'createdAt' in values[0];
            (0, SqliteFunction_1.updateDataSqlite)(Sqlite.openDB(), nameTable, payload, { where, stringWhere, condition }, isUpdateAt)
                .then(resolve)
                .catch(reject);
        })
            .catch(reject);
    });
};
Sqlite.getData = (nameTable, params, isParse = false) => {
    return new Promise((resolve, reject) => {
        let propsParams = (params) ? params : {};
        (0, SqliteFunction_1.getDataSqlite)(Sqlite.openDB(), nameTable, propsParams) //{where, whereKey, ignoreWhere, stringWhere, condition}
            // .then(resolve)
            .then((data) => {
            if (isParse) {
                if (data.values.length) {
                    for (let i = 0; i < data.values.length; i++) {
                        let ob = data.values[i];
                        for (let [key, value] of Object.entries(ob)) {
                            if (['createdAt', 'updateAt', 'id'].includes(key)) {
                                continue;
                            }
                            let [isJson, parseData] = getStatusAndDataJson(value);
                            if (isJson) {
                                data.values[i][key] = parseData;
                            }
                        }
                    }
                }
            }
            resolve(data);
        })
            .catch(reject);
    });
};
Sqlite.removeData = (nameTable, params) => {
    return new Promise((resolve, reject) => {
        let propsParams = (params) ? params : {};
        (0, SqliteFunction_1.removeDataSqlite)(Sqlite.openDB(), nameTable, propsParams) //{where, whereKey, ignoreWhere, stringWhere, condition}
            .then(resolve)
            .catch(reject);
    });
};
Sqlite.dropTable = (nameTable) => {
    //TODO: Таблицы может не быть но выводит сообщение успешное удаление
    return new Promise((resolve, reject) => {
        (0, SqliteFunction_1.dropTableSqlite)(Sqlite.openDB(), nameTable)
            .then(resolve)
            .catch(reject);
    });
};
window.Sqlite = Sqlite;
