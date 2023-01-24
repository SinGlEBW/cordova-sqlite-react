import { commonFunctionSqliteT } from './../common';
//TODO: Можно допилит проверку таблицы. Её может не быть и отправлять сообщение не успешное удаление, а что либо другое
export const dropTableSqlite:commonFunctionSqliteT = (connect, nameTable) => {
  return new Promise((resolve, reject) => {
  
    connect.transaction(
      (tx) => { tx.executeSql(`DROP TABLE IF EXISTS ${nameTable}`); },
      (error) => { reject({status: false, msg: `Ошибка транзакции в dropTable:  ${error}`}); }, 
      () => { resolve({status: true, msg: `Таблица ${nameTable} успешно удалена`}); }
    )
  })
}

/*-------------------------------------------------------------------------------------------------------------------------------------*/