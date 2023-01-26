import { convertByTypeForDB } from '../helpers';

let LOG = process.env.REACT_APP_LOG;

export const generateSQLInsertInto = (nameTable: string, payload: object): {arrValuesPayload: any[], newSQLInsert: string} => {
  let arrTotalValuesPayload:any[] = [];
  let totalNewSqlSrt = '';

  let countBracket = 0;
  let defaultSqlStr = `INSERT INTO ${nameTable} () VALUES ()`;
  for(let i = 0; i < defaultSqlStr.length; i++ ){
    totalNewSqlSrt += defaultSqlStr[i];
  
    if(defaultSqlStr[i] === '(' && countBracket === 1){
      for(let j = 0; j < arrTotalValuesPayload.length; j++){  totalNewSqlSrt += '?,' }
      totalNewSqlSrt = totalNewSqlSrt.replace(/,$/ig, '');
    }
  
    if(defaultSqlStr[i] === '(' && countBracket === 0){
      countBracket++;
      for(let key in payload){
        totalNewSqlSrt += `${key},`;
        // LOG && (
        //   console.log(`generateSQLInsertInto >>>>>>>: ${key}:`),  
        //   console.log(payload[key])
        // );


        let val = convertByTypeForDB(payload[key]);
        arrTotalValuesPayload.push(val);
      }
      totalNewSqlSrt = totalNewSqlSrt.replace(/,$/ig, '');
    }
  }
  //'INSERT INTO test (value) VALUES (?)'
  console.log(`totalNewSqlSrt: ${totalNewSqlSrt}`)
  return {
    arrValuesPayload: arrTotalValuesPayload,
    newSQLInsert: totalNewSqlSrt
  }
}