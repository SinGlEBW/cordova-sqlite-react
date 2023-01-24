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
        console.log(msg); 
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




// export const setDataSqlite: CreateTableType = (payload, nameTable, isCreateDate) => {
//   let db = openDbSqlite((process.env.REACT_APP_SQLITE_DB_NAME as string)); //намеренно не избавляюсь т.к. из-за использования других функций всё равно имеет зависимость, так хоть аргументов меньше

//   let { newSQLCreate } = generateSQLCreateTable(payload, nameTable, isCreateDate)
//   let { newSQLInsert, arrValuesPayload } = generateSQLInsertInto(payload, nameTable);


  
//   db.transaction(
//     (tx) => {

//       tx.executeSql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`, [],
//         (tx, res) => {
//           //TODO: Мало проверить существование таблицы, нужно проверить соответствие полей таблицы и передаваемых полей
//           console.log('setDataSqlite>>>',res.rows.item(0));
//           if(res.rows.item(0) && res.rows.item(0).name === nameTable){    
//             /* Добавить в будущем проверку.... */
            
//             tx.executeSql(newSQLInsert, arrValuesPayload);
            
//           }else{
//             tx.executeSql(newSQLCreate);
//             tx.executeSql(newSQLInsert, arrValuesPayload);
//           }                                  
//         },
//         (tx, err) => { console.log(`Ошибка транзакции в SqliteStore.checkTable: ${err.message}.`);  },    

//       )

//     },
//     (err) => { 
//       console.error(`>>> Ошибка в SqliteStore -> setDataSqlite <<<: ${err}`);  
//     },
//     () => { console.log('Успешное создание таблицы');  }
//   )

// }






// export const setDataSqlite: CreateTableType = (payload, nameTable, isCreateDate) => new Promise<{status: boolean}>((resolve, reject) => {
//   let db = openDbSqlite((process.env.REACT_APP_SQLITE_DB_NAME as string)); //намеренно не избавляюсь т.к. из-за использования других функций всё равно имеет зависимость, так хоть аргументов меньше

//   let { newSQLCreate } = generateSQLCreateTable(payload, nameTable, isCreateDate)
//   let { newSQLInsert, arrValuesPayload } = generateSQLInsertInto(payload, nameTable);

//   db.transaction(
//     (tx) => {
//       tx.executeSql(`DROP TABLE IF EXISTS ${nameTable}`);
//       tx.executeSql(newSQLCreate);
//       tx.executeSql(newSQLInsert, arrValuesPayload, () => resolve({status: true}));//статус использовал в DarkMode
//     },
//     (err) => { console.error(`>>> Ошибка в SqliteStore -> createTable <<<: ${err}`); reject(new Error('Не удалось создать и записать в таблицу'))  },
//     () => { console.log('Успешное создание таблицы');  }
//   )

// })

