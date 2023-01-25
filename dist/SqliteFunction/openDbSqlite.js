"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDbSqlite = void 0;
const openDbSqlite = (nameDbSqlite = process.env.REACT_APP_SQLITE_DB_NAME || 'default.db') => {
    //db может быть, но openDBs пуст, а значит соединение закрыто
    if (!window.db || (nameDbSqlite && !window.db.openDBs[nameDbSqlite])) { //!Object.keys(window.db.openDBs).length 
        return window.db = window.sqlitePlugin.openDatabase({
            name: nameDbSqlite,
            location: 'default',
            androidDatabaseProvider: 'system'
        });
    }
    return window.db;
};
exports.openDbSqlite = openDbSqlite;
