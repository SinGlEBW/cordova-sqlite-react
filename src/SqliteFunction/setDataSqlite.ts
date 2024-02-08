import { setDataSqliteT } from './../common';
import { generateSQLCreateTable, generateSQLInsertInto } from './../stringSQL';


export const setDataSqlite:setDataSqliteT = (connect, nameTable, payload, options) => {
  return new Promise((resolve, reject) => {
    
    let { newSQLCreate } = generateSQLCreateTable(nameTable, payload, options?.isCreateDate ? options?.isCreateDate : undefined )
    let { newSQLInsert, arrValuesPayload } = generateSQLInsertInto(nameTable, payload);
    //TODO: Возможно придётся делать проверку на соответствие структуры колонок. Добавлять если их нет или выдавать ошибку
    
    connect.transaction(
      (tx) => {

        options?.rewriteTable && tx.executeSql(`DROP TABLE IF EXISTS ${nameTable}`);
        // options?.arrSql 
        //TODO: Добавить логику Alter table
        // UPDATE management SET updateAt = ? WHERE key="listRecords""

        tx.executeSql(newSQLCreate);//Если не существует создаст
        tx.executeSql(newSQLInsert, arrValuesPayload);
      },
      (err) => { 
        let msg = `>>> Ошибка в -> setDataSqlite <<<: ${err}`
        console.error(msg);
        reject({status: false, msg})
      },
      () => { 
        let msg = `Успешная транзакция setDataSqlite. ${nameTable}`;
        resolve({status: true, msg}) 
      }
    )
  })
}




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







