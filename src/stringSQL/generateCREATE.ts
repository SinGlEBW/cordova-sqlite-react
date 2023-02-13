export enum E_SQLitePayloadType {
  ID = 'INTEGER PRIMARY KEY',
  TEXT = 'TEXT NOT NULL',
  INTEGER = 'INTEGER NOT NULL',
  createdAt = "datetime default (datetime('now','localtime'))",
  updateAt = "datetime default (datetime('now','localtime'))",
}
/*
  
*/

export const generateSQLCreateTable = (nameTable: string, payload: object, isCreateDate?: boolean): {newSQLCreate: string} => {

  let totalNewSqlSrt = '';
  if(!Object.entries(payload).length){ throw new Error('payload пуст'); } 

  let defaultSqlStr = `CREATE TABLE IF NOT EXISTS ${nameTable} ()`;//
  for( let i = 0; i < defaultSqlStr.length; i++ ){
    totalNewSqlSrt += defaultSqlStr[i];

    if(defaultSqlStr[i] === '('){
      totalNewSqlSrt += `id ${E_SQLitePayloadType.ID},`;

      for(let key in payload){
        const value = payload[key];
        // TODO: Рассмотреть вариант использования switch
        totalNewSqlSrt += (typeof value === 'string' || typeof value === 'object' || typeof value === 'boolean') ? `${key} ${E_SQLitePayloadType.TEXT},` : ''
        totalNewSqlSrt += (typeof value === 'number') ? `${key} ${E_SQLitePayloadType.INTEGER},` : ''
      }
      // totalNewSqlSrt += 'type TEXT NOT NULL,';
      // TODO: createdAt updateAt - не правильно работают 
      if(isCreateDate !== false){
        totalNewSqlSrt += `createdAt ${E_SQLitePayloadType.createdAt},updateAt ${E_SQLitePayloadType.updateAt},`
      } 
      totalNewSqlSrt = totalNewSqlSrt.replace(/,$/ig, '');
    }
  }

  return {
    newSQLCreate: totalNewSqlSrt
  } 
}


generateSQLCreateTable("TEST", {name: '', age: ''})
