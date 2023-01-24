import { getDataSqliteT } from './../common';
import { generateSQLSelect } from './../stringSQL/generateSELECT';

//INFO: Возможно от проверки таблицы можно избавиться отловив ошибку и определив по ней что нет таблицы
export  const getDataSqlite:getDataSqliteT = (connect, nameTable, params) => {
  return new Promise((resolve, reject) => {

    connect.transaction(
      (tx) => {      console.log(`getDataSqlite: >> Проверка таблицы: ${nameTable}`);
        tx.executeSql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`, [],
          (tx, res) => {
            let isTables = res.rows.item(0) && res.rows.item(0).name === nameTable; 

            if(isTables){      console.log(`getDataSqlite: >> запрашиваем данные`);
              let { newSQLString, arrValuesPayload } = generateSQLSelect(nameTable, params)
              // console.log('newSQLString', newSQLString);
              tx.executeSql(newSQLString, (arrValuesPayload as any[]).length ? arrValuesPayload : [], //arrValuesPayload будет если заполнен where
                (tx, res) => { 
                  let values:any[] = [];
                  for (let i = 0; i < res.rows.length; i++) {    values.push(res.rows.item(i))   }
                  if(!values.length){
                    resolve({status: false, values, msg: 'Данных нет в таблице'});  
                  }else{

                    
                    resolve({status: true, values, msg: 'Данные найдены'});                                      
                  }
                },
                (tx, err) => {console.error(err); }//ошибка должна всплыть  
              );
              return;
            }
            resolve({status: false, values: [],  msg: 'Таблицы нет'});                                        
          },
          (tx, err) => console.error(err)
        ); 
      },
      (error) => { console.log('Ошибка транзакции в getDataSqlite: '); reject({status: false, msg: error}); }, 
      () => { console.log('Успех транзакции getDataSqlite');  }
    )
  })
}


/*-------------------------------------------------------------------------------------------------------------------------------------*/


