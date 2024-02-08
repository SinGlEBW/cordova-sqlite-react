import { remoteDataSqliteT } from './../common';
import { generateSQLDelete } from './../stringSQL/generateDelete';


export const removeDataSqlite:remoteDataSqliteT = (connect, nameTable, param) => {
  return new Promise((resolve, reject) => {
    //'DELETE FROM test WHERE name="isAuth" AND value="true"'
    
    let { newSQLString } = generateSQLDelete(nameTable, param);
    
    connect.transaction(
      (tx) => {
        tx.executeSql(newSQLString, [],
          (tx, res) => { resolve({status: true, msg: "Успешное удаление"})  },
          (tx, err) => { console.log(`removeDataSqlite: ${err}`) },
        );
      },
      (err) => { 
        let msg = `>>> Ошибка в -> removeDataSqlite <<<: ${nameTable}:  ${err}`
        reject({status: false, msg})
      },
      () => { 
        let msg = `Успешная транзакция removeDataSqlite. ${nameTable}`;
       
      }
    )
  })
}
