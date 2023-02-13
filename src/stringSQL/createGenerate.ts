import { Params } from './../common';
import { convertByTypeForDB } from '../helpers';
// import { Params } from '../types/commonType';


type chunkSQLT = 'DELETE FROM' | 'SELECT * FROM'


export const createGenerateSqlString = (chunkSQL:chunkSQLT) => {
  
  const ignoreForWhereKey = ({total, key, value, condition, ignoreWhere}) => {
    let ignoreStatus = false;
  
    if(ignoreWhere){
      let findItemInx = ignoreWhere[key].findIndex((ignK) => ignK === value);
      if(~findItemInx){
        ignoreStatus = true;
        ignoreWhere[key].splice(findItemInx, 1);
      }
    }
    total.defaultSqlStr += (` ${key} ${ignoreStatus ? '!=' : '='} "${value}" ${condition ? condition : 'OR'}`);
  }
  
  const ignoreConcatKey = ({total, key, value, condition, checkOptions}) => {
    total.defaultSqlStr += (`${checkOptions === 1 ? '' : condition ? condition : ' OR'} ${key} != "${value}"`)//${condition ? condition : 'OR'}
  }
  
  
  const whereTotalHelpers = ({ob, total, condition, ignoreWhere, checkOptions}, cb?: (...param:any) => void) => {
    let entries = Object.entries(ob) as any;
    for(let [key, value] of entries){
      for(let i = 0; i < value.length; i++){
        cb && typeof cb === 'function' && cb({total, key, value: value[i], condition, ignoreWhere, checkOptions});
      }
      !ignoreWhere && (total.defaultSqlStr = total.defaultSqlStr.replace(/(\sAND|\sOR)$/ig, ``));
      total.defaultSqlStr += ','
    }
    total.defaultSqlStr = total.defaultSqlStr.replace(/,$/ig, ``);
  }



  return (nameTable:string, {where, whereKey, stringWhere, ignoreWhere, condition}:Params): {newSQLString: string, arrValuesPayload?: any[]} => {
    /*
      generateSQLDelete('Test', {whereKey: {name: ['Вася', "Петя"], age: [17,20]}})
      'DELETE FROM Test WHERE name = "Вася" OR name = "Петя", age = "17" OR age = "20"'
    */
   
    let checkOptions = 0;
    let total = {
      defaultSqlStr: `${chunkSQL} ${nameTable} ${stringWhere ? stringWhere : 'WHERE'}`
    }

    let arrTotalValuesPayload:any[] = [];
    // total.defaultSqlStr = total.defaultSqlStr.replace(/,$/ig, ` ${stringWhere ? stringWhere : 'WHERE'}`);
  
    if(stringWhere){
      checkOptions++;
      total.defaultSqlStr += ` ${stringWhere}`;
    }else if(whereKey && Object.keys(whereKey).length){
      whereTotalHelpers({ob: whereKey, total , condition, ignoreWhere, checkOptions}, ignoreForWhereKey)
      console.log('Передан whereKey');
      checkOptions++;
    }else if(where && Object.keys(where).length){
      checkOptions++;

      for(let [key, value] of Object.entries(where)){
        if(chunkSQL === 'SELECT * FROM'){
          total.defaultSqlStr += (` ${key} = ?,`);
          let val = convertByTypeForDB(value);
          arrTotalValuesPayload.push(val);

        }else{
          total.defaultSqlStr += (` ${key}="${value}" ${condition ? condition : 'OR'}`);
        }
      }

      (chunkSQL === 'SELECT * FROM')
        ? total.defaultSqlStr = total.defaultSqlStr.replace(/,$/ig, ``)
        : total.defaultSqlStr = total.defaultSqlStr.replace(/(\sAND|\sOR)$/ig, ``);
        
    }
    
    if(ignoreWhere && Object.keys(ignoreWhere).length){
      checkOptions++;
      whereTotalHelpers({ob: ignoreWhere, total, condition, ignoreWhere, checkOptions}, ignoreConcatKey)
    }
    if(checkOptions === 0){
      if(chunkSQL === 'DELETE FROM'){
        console.log(`Доп параметры не переданы, будут удалены все ключи в таблице ${nameTable}`);
      }
      total.defaultSqlStr = total.defaultSqlStr.replace(/\sWHERE$/ig, ``);
    }
    total.defaultSqlStr = total.defaultSqlStr.replace(/(\sAND|\sOR)$/ig, ``);

    return (
      (chunkSQL === 'SELECT * FROM') 
      ? { arrValuesPayload: arrTotalValuesPayload, newSQLString: total.defaultSqlStr } 
      : { newSQLString: total.defaultSqlStr }
    )
  }
}

