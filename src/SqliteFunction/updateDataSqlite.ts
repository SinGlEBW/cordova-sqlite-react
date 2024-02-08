import { updateDataSqliteT } from './../common';
import { generateSQLUpdate } from './../stringSQL/generateUpdate';





export const updateDataSqlite:updateDataSqliteT = (connect, nameTable, payload, {where, condition, stringWhere}, isUpdateAt) => {
  return new Promise((resolve, reject) => {

    let { newSQLUpdate, arrValuesPayload } = generateSQLUpdate(nameTable, payload, {where, condition, stringWhere}, isUpdateAt);

    // UPDATE management SET value = ? WHERE key="listRecords"
// updateAt = datetime('now','localtime')
    
    connect.transaction(
      (tx) => {
        tx.executeSql( newSQLUpdate, arrValuesPayload);
      },
      (err) => { 
        let msg = `>>> Ошибка в -> updateDataSqlite <<<: ${nameTable}:  ${err}`
        reject({status: false, msg})
      },
      () => { 
        let msg = `Успешная транзакция updateDataSqlite. ${nameTable}`;
        resolve({status: true, msg}) 
      }
    )
  })
}




