import { querySqlite } from './../SqliteFunction/querySqlite';


import { 
  openDbSqlite, checkTableSqlite, setDataSqlite, updateDataSqlite,
  getDataSqlite, removeDataSqlite, dropTableSqlite } from './../SqliteFunction';
import { getDataT, setDataT, remoteDataT, updateDataT, commonMethodSqliteT } from './../common';


interface SqliteConstructor {
  column: {[key: string]: "ID" | "TEXT" | "INTEGER"};
};

export class Sqlite {

  static openDB = (nameDbSqlite?: string) => openDbSqlite(nameDbSqlite)
  static closeDB = () => window.db ? window.db.close() : console.log('Не возможно закрыть базу');
  
  static query = (sql) => {
    return new Promise((resolve, reject) => {
      querySqlite(Sqlite.openDB(), sql)
      .then(resolve)
      .catch(reject)
    })
  }

  static checkTable:commonMethodSqliteT = (nameTable?:string) => { 
    return new Promise((resolve, reject) => {
      checkTableSqlite(Sqlite.openDB(), nameTable)
      .then(resolve)
      .catch(reject)
    })
  }

  static setData:setDataT = (nameTable, payload, options) => {
    return new Promise((resolve, reject) => {
      setDataSqlite(Sqlite.openDB(), nameTable, payload, options)
      .then(resolve)
      .catch(reject)
    }); 
  }

  static updateData:updateDataT = (nameTable, payload, { where, stringWhere, condition }) => {
    return new Promise((resolve, reject) => {
      updateDataSqlite(Sqlite.openDB(), nameTable, payload, {where, stringWhere, condition})
      .then(resolve)
      .catch(reject)
    });
  }

  static getData:getDataT = (nameTable, params) => {
    return new Promise((resolve, reject) => {
      let propsParams = (params) ? params : {};
      getDataSqlite(Sqlite.openDB(), nameTable, propsParams)//{where, whereKey, ignoreWhere, stringWhere, condition}
      .then(resolve)
      .catch(reject)
    })
  }


  static removeData:remoteDataT = (nameTable, params) => {
    return new Promise((resolve, reject) => {
      let propsParams = (params) ? params : {};

      removeDataSqlite(Sqlite.openDB(), nameTable, propsParams )//{where, whereKey, ignoreWhere, stringWhere, condition}
      .then(resolve)
      .catch(reject)
    })
  }

  static dropTable:commonMethodSqliteT = (nameTable) => {
    //TODO: Таблицы может не быть но выводит сообщение успешное удаление
    return new Promise((resolve, reject) => {
      dropTableSqlite(Sqlite.openDB(), nameTable)
      .then(resolve)
      .catch(reject)
    })
  }
}





(window as any).Sqlite = Sqlite

