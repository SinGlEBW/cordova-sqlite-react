import { dropAllData } from './../common.d';
import { convertByTypeFromDB } from '../helpers';
import { setItemT, getItemT, remoteItemT, getItemsT } from './../common';

import { Sqlite } from './Sqlite';
//INFO: Возможно в будущем localStorage переделать на sqlite3 для pc
  /*
    Структура хранения настроек как в Sqlite так и в localeStorage
    1й вариант. name: 'config' value: "{}", name: 'DarkMode', value: 'true'. В localStorage "config": "{}"
        При каждом внесении изменений придётся доставать, парсить, изменять, закидывать в string и обратно сохранять пачку.
        При выходе удалить ключ config, не затрагивая DarkMode, закинуть default config в state 
    2й вариант. 
      Сохранять каждый ключ   name: "isAuth", value: "true"  в sqlite.  в localeStorage будет так "isAuth": "true"
      Неудобства: 
        Первоначальное получение данных и преобразование в структуру state
        Для поддержания одинаковых ключей в sqlite и localStorage придётся, при удалении ненужных ключей иметь массив нужных
        ключей которые ненужно удалять.  
      
    В любом случае выборка данных для sqlite и localStorage разные

  */

  /*-----------------------------------------------------------------------------------------------------*/



//LocalStorage но на sqlite
export class SLStore {
  static nameTable = process.env.REACT_APP_SQLITE_TABLE_SETTINGS as string | 'localStorage';
  private static helperTotalData = ({status, values, totalData}) => {

    if(status && values?.length){
      for(let i = 0; i < values.length; i++){
        let item = values[i];
        Object.assign(totalData, {[item.key]: convertByTypeFromDB(item.value)});
      }  
    }
  }

  static setNameTableSettings = (nameTable) => SLStore.nameTable = nameTable


  static setItem:setItemT = (key,  value, options) => {
    return new Promise((resolve, reject) => {
      if(window.cordova){ //INFO: Обновить данные если есть
        let nameTable = SLStore.nameTable;
        Sqlite.getData(nameTable, {where: {key}})
        .then(({status}) => {
          if(status){
            Sqlite.updateData(nameTable, {key, value, type: typeof value}, {where: {key}})
            .then(resolve)
            .catch(reject)
         
          }else{
            Sqlite.setData(nameTable, {key, value, type: typeof value}, options)
            .then(resolve)
            .catch(reject)
          }
        })
        .catch(reject);
        
      }else{
        try{
          
          localStorage.setItem(
            key, 
            (typeof value === 'object' || typeof value === 'boolean') ? JSON.stringify(value) : value
          );
  
          resolve({status: true, msg: `Данные сохранены в localStorage`})
        }catch(err){
          reject({status: false, msg: err})
        }
      }
    })
  }
  
  /*-----------------------------------------------------------------------------------------------------*/

  static getItem:getItemT = (key:string) => {
    return new Promise((resolve, reject) => {
      if(window.cordova){
        Sqlite.getData(SLStore.nameTable, {where: {key}})
        .then(({status, msg, values}) => {
          let data: {[key: string]: any} = {};
          SLStore.helperTotalData({status, values, totalData: data})
          resolve({status, msg, data});
        })
        .catch(reject)
      }else{
        try {
          let data: {[key: string]: any} = {};

          let item = convertByTypeFromDB(localStorage.getItem(key as string));
          // console.log(item);
          if(item){
            Object.assign(data, {[key]: item});
            resolve({status: true, data, msg: 'Данные из localStorage'});
            return;
          }

          resolve({status: false, data, msg: 'Данный ключ в localStorage не найден'});
        } catch (err) {
          reject({status: false,  msg: err});
        }
      }
    })
  }

  /*-----------------------------------------------------------------------------------------------------*/

  static getItems:getItemsT = (options) => {
    
    return new Promise((resolve, reject) => {
      
      if(window.cordova){
        Sqlite.getData(SLStore.nameTable, {
          ignoreWhere: options?.ignoreKeys ? {key: options?.ignoreKeys} : {}
        })   
        .then(({status, msg, values}) => {
          let data: {[key: string]: any} = {};
          SLStore.helperTotalData({status, values, totalData: data});
          resolve({status, data, msg});
        })
        .catch((err) => {
          console.log('catch SLStore.getItems: ', err);
          reject(err)
        })
      }else{
        try {
          let data: {[key: string]: any} = {};

          for(let i = 0; i < localStorage.length; i++) {
            let keyItem = localStorage.key(i);
            if(keyItem){
              let value = convertByTypeFromDB(localStorage.getItem(keyItem));
              Object.assign(data, {[keyItem]: value});
            }
          }

          if(Object.keys(data).length){
            resolve({status: true, data, msg: 'Все данные из localStorage'});
          }
          resolve({status: false, data, msg: 'localStorage пуст'});
        } catch (err) {
          reject({status: false,  msg: err});
        }
      }
    })
  
  }
 
  

  /*-----------------------------------------------------------------------------------------------------*/
  
  static removeItem:remoteItemT = (options) => {
   
    return new Promise((resolve, reject) => {
      let payloadOptions = {};
      let init = {
        keys: "whereKey",
        ignoreKeys: "ignoreWhere"
      };
      // if(options && Object.entries(options).length){
      //   for(let arr in options){
      //     let [key, value] = arr;
      //     payloadOptions[init[key]] = {key: Array.isArray(value) ? value : []} 
      //   }
      // }
      options && Object.entries(options).forEach(([key, value]) => { payloadOptions[init[key]] = {key: Array.isArray(value) ? value : []} })
      // console.log('options', options);
      // console.log('payloadOptions', payloadOptions);
      if(window.cordova){
        Sqlite.removeData( SLStore.nameTable, payloadOptions )
        .then(resolve)
        .catch(reject)
  
      }else{
        try {

          if(options?.keys?.length){
            for(let i = 0; i < options?.keys.length; i++){
              if(options?.ignoreKeys?.length){
                let isIgnoreKey = options?.ignoreKeys?.some((key) => key === options?.keys[i]);
                !isIgnoreKey && localStorage.removeItem(options?.keys[i]);
              }else{
                
                  localStorage.removeItem(options?.keys[i]);
                
                  
                
              }
            }
            resolve({status: true, msg: `Успешное удаление ключей localStorage`})
          }else if(options?.ignoreKeys?.length){
            for(let i = 0; i < localStorage.length; i++){
              let keyLS = localStorage.key(i);

              let isIgnoreKey = options?.ignoreKeys.some((key) => key === keyLS);
              !isIgnoreKey && keyLS && localStorage.removeItem(keyLS);
            }
          }else{
            localStorage.clear();
          }
      
        } catch (err) {
          reject({status: false, msg: err})
        }
      }
    })
  };
  
  static dropAllData:dropAllData = () => {
    return new Promise((resolve, reject) => {
      if(window.cordova){
        Sqlite.dropTable(SLStore.nameTable)
        .then(resolve)
        .catch(reject)
      }else{
        try {
          localStorage.clear();
          resolve({status: true, msg: `Успешное полное удаление данных в localStorage`})
        } catch (err) {
          reject({status: false, msg: err})
        }
      }
    })
  };

}


(window as any).SLStore = SLStore


