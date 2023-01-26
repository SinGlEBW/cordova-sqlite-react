"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDataSqlite = void 0;
const generateUpdate_1 = require("./../stringSQL/generateUpdate");
const updateDataSqlite = (connect, nameTable, payload, { where, condition, stringWhere }, isUpdateAt) => {
    return new Promise((resolve, reject) => {
        let { newSQLUpdate, arrValuesPayload } = (0, generateUpdate_1.generateSQLUpdate)(nameTable, payload, { where, condition, stringWhere }, isUpdateAt);
        // UPDATE management SET value = ? WHERE key="listRecords"
        // updateAt = datetime('now','localtime')
        connect.transaction((tx) => {
            tx.executeSql(newSQLUpdate, arrValuesPayload);
        }, (err) => {
            let msg = `>>> Ошибка в -> updateDataSqlite <<<: ${nameTable}:  ${err}`;
            reject({ status: false, msg });
        }, () => {
            let msg = `Успешная транзакция updateDataSqlite. ${nameTable}`;
            resolve({ status: true, msg });
        });
    });
};
exports.updateDataSqlite = updateDataSqlite;
// export function overwriteOldData (nameTable, keyName, version, rawData) {
//   return new Promise((resolve, reject) => {
//     console.group('overwriteOldData')
//     console.log('---------------------------------------------');
//     console.log('keyName', keyName);
//     console.log('version', version);
//     console.log('rawData', rawData);
//     console.log('---------------------------------------------');
//     if(window.cordova && window.sqlitePlugin){ 
//       let db = openDbSqlite();
//       db.transaction(
//         (tx) => {
//           console.log(`UPDATE ${nameTable} SET version = ?, rawData = ? WHERE name="${keyName}"`);
//           tx.executeSql(`UPDATE ${nameTable} SET version = ?, rawData = ? WHERE name="${keyName}"`, 
//             [
//               (typeof version  === 'string') ? Number(version) : version,
//               ((typeof rawData === 'object') || (typeof rawData === 'boolean')) ? JSON.stringify(rawData) : rawData.trim(),
//             ],
//             (tx, res) => {
//               console.log('Данные обновлены возвращаю res.insertId');
//               console.log(res);
//               resolve(res.insertId); 
//             },
//             (tx, err) => console.error(err)
//           ); 
//         },
//         //При проверке таблицы не закрывать бд т.к. она закрывается в момент транзакции getDataFromSqlite
//         (error) => { console.log('Ошибка транзакции в overwriteOldData: '); reject(error);  }, 
//         () => { console.log('Успех транзакции overwriteOldData');  } 
//       );
//       return;
//     }
//     reject(new Error('Не установлен плагин cordova || cordova-sqlite-storage'));
//   })
// }
