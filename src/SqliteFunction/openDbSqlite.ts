import { SQLitePlugin } from './../common';


export const openDbSqlite = (nameDbSqlite = (process.env.REACT_APP_SQLITE_DB_NAME as string) || 'default') => {
  //db может быть, но openDBs пуст, а значит соединение закрыто
  if(!window.db || (nameDbSqlite && !window.db.openDBs[nameDbSqlite]) ){//!Object.keys(window.db.openDBs).length 
   
    
    return window.db = window.sqlitePlugin.openDatabase({
      name: nameDbSqlite,
      location: 'default',
      androidDatabaseProvider: 'system'
    });
    
  }
  
  return window.db as SQLitePlugin.Database;
}

