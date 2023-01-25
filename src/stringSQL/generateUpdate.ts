import { UpdateWhere } from './../common';
import { convertByTypeForDB } from '../helpers';


export const generateSQLUpdate = (nameTable: string, payload: object, {where, condition, stringWhere}:UpdateWhere): {arrValuesPayload: any[], newSQLUpdate: string} => {
  
  let arrTotalValuesPayload:any[] = [];
  let defaultSqlStr = `UPDATE ${nameTable} SET `;

  for(let key in payload){
      defaultSqlStr += (`${key} = ?,`)
      let val = convertByTypeForDB(payload[key]);
      arrTotalValuesPayload.push(val);
  }
  defaultSqlStr = defaultSqlStr.replace(/,$/ig, ` ${stringWhere ? stringWhere : 'WHERE'}`);
  if(where){

      for(let [key, value] of Object.entries(where)){
        defaultSqlStr += (` ${key}="${value}" ${condition ? condition : 'AND'}`)
      }
      defaultSqlStr = defaultSqlStr.replace(/(\sAND|\sOR)$/ig, ``);
  }else{
    console.log('Не переданы из аргументов where | stringWhere');
  }

  console.log(`defaultSqlStr `,defaultSqlStr)
  return {
    arrValuesPayload: arrTotalValuesPayload,
    newSQLUpdate: defaultSqlStr
  };
  
}