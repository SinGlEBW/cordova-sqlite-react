"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLStore = void 0;
const helpers_1 = require("../helpers");
const Sqlite_1 = require("./Sqlite");
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
class SLStore {
}
exports.SLStore = SLStore;
SLStore.nameTable = process.env.REACT_APP_SQLITE_TABLE_SETTINGS;
SLStore.helperTotalData = ({ status, values, totalData }) => {
    if (status && (values === null || values === void 0 ? void 0 : values.length)) {
        for (let i = 0; i < values.length; i++) {
            let item = values[i];
            Object.assign(totalData, { [item.key]: (0, helpers_1.convertByTypeFromDB)(item.value) });
        }
    }
};
SLStore.setNameTableSettings = (nameTable) => SLStore.nameTable = nameTable;
SLStore.setItem = (key, value, options) => {
    return new Promise((resolve, reject) => {
        if (window.cordova) { //INFO: Обновить данные если есть
            let nameTable = SLStore.nameTable;
            Sqlite_1.Sqlite.getData(nameTable, { where: { key } })
                .then(({ status }) => {
                if (status) {
                    Sqlite_1.Sqlite.updateData(nameTable, { key, value, type: typeof value }, { where: { key } })
                        .then(resolve)
                        .catch(reject);
                }
                else {
                    Sqlite_1.Sqlite.setData(nameTable, { key, value, type: typeof value }, options)
                        .then(resolve)
                        .catch(reject);
                }
            })
                .catch(reject);
        }
        else {
            try {
                localStorage.setItem(key, (typeof value === 'object' || typeof value === 'boolean') ? JSON.stringify(value) : value);
                resolve({ status: true, msg: `Данные сохранены в localStorage` });
            }
            catch (err) {
                reject({ status: false, msg: err });
            }
        }
    });
};
/*-----------------------------------------------------------------------------------------------------*/
SLStore.getItem = (key) => {
    return new Promise((resolve, reject) => {
        if (window.cordova) {
            Sqlite_1.Sqlite.getData(SLStore.nameTable, { where: { key } })
                .then(({ status, msg, values }) => {
                let data = {};
                SLStore.helperTotalData({ status, values, totalData: data });
                resolve({ status, msg, data });
            })
                .catch(reject);
        }
        else {
            try {
                let data = {};
                let item = (0, helpers_1.convertByTypeFromDB)(localStorage.getItem(key));
                if (item) {
                    Object.assign(data, { [key]: item });
                    resolve({ status: true, data, msg: 'Данные из localStorage' });
                    return;
                }
                resolve({ status: false, data, msg: 'Данный ключ в localStorage не найден' });
            }
            catch (err) {
                reject({ status: false, msg: err });
            }
        }
    });
};
/*-----------------------------------------------------------------------------------------------------*/
SLStore.getItems = (options) => {
    return new Promise((resolve, reject) => {
        if (window.cordova) {
            Sqlite_1.Sqlite.getData(SLStore.nameTable, {
                ignoreWhere: (options === null || options === void 0 ? void 0 : options.ignoreKeys) ? { key: options === null || options === void 0 ? void 0 : options.ignoreKeys } : {}
            })
                .then(({ status, msg, values }) => {
                let data = {};
                SLStore.helperTotalData({ status, values, totalData: data });
                resolve({ status, data, msg });
            })
                .catch(reject);
        }
        else {
            try {
                let data = {};
                for (let i = 0; i < localStorage.length; i++) {
                    let keyItem = localStorage.key(i);
                    if (keyItem) {
                        let value = (0, helpers_1.convertByTypeFromDB)(localStorage.getItem(keyItem));
                        Object.assign(data, { [keyItem]: value });
                    }
                }
                if (Object.keys(data).length) {
                    resolve({ status: true, data, msg: 'Все данные из localStorage' });
                }
                resolve({ status: false, data, msg: 'localStorage пуст' });
            }
            catch (err) {
                reject({ status: false, msg: err });
            }
        }
    });
};
/*-----------------------------------------------------------------------------------------------------*/
SLStore.removeItem = (options) => {
    return new Promise((resolve, reject) => {
        var _a, _b, _c, _d;
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
        options && Object.entries(options).forEach(([key, value]) => { payloadOptions[init[key]] = { key: Array.isArray(value) ? value : [] }; });
        if (window.cordova) {
            Sqlite_1.Sqlite.removeData(SLStore.nameTable, payloadOptions)
                .then(resolve)
                .catch(reject);
        }
        else {
            try {
                if ((_a = options === null || options === void 0 ? void 0 : options.keys) === null || _a === void 0 ? void 0 : _a.length) {
                    for (let i = 0; i < (options === null || options === void 0 ? void 0 : options.keys.length); i++) {
                        if ((_b = options === null || options === void 0 ? void 0 : options.ignoreKeys) === null || _b === void 0 ? void 0 : _b.length) {
                            let isIgnoreKey = (_c = options === null || options === void 0 ? void 0 : options.ignoreKeys) === null || _c === void 0 ? void 0 : _c.some((key) => key === (options === null || options === void 0 ? void 0 : options.keys[i]));
                            !isIgnoreKey && localStorage.removeItem(options === null || options === void 0 ? void 0 : options.keys[i]);
                        }
                        else {
                            localStorage.removeItem(options === null || options === void 0 ? void 0 : options.keys[i]);
                        }
                    }
                    resolve({ status: true, msg: `Успешное удаление ключей localStorage` });
                }
                else if ((_d = options === null || options === void 0 ? void 0 : options.ignoreKeys) === null || _d === void 0 ? void 0 : _d.length) {
                    for (let i = 0; i < localStorage.length; i++) {
                        let keyLS = localStorage.key(i);
                        let isIgnoreKey = options === null || options === void 0 ? void 0 : options.ignoreKeys.some((key) => key === keyLS);
                        !isIgnoreKey && keyLS && localStorage.removeItem(keyLS);
                    }
                }
                else {
                    localStorage.clear();
                }
            }
            catch (err) {
                reject({ status: false, msg: err });
            }
        }
    });
};
SLStore.dropAllData = () => {
    return new Promise((resolve, reject) => {
        if (window.cordova) {
            Sqlite_1.Sqlite.dropTable(SLStore.nameTable)
                .then(resolve)
                .catch(reject);
        }
        else {
            try {
                localStorage.clear();
                resolve({ status: true, msg: `Успешное полное удаление данных в localStorage` });
            }
            catch (err) {
                reject({ status: false, msg: err });
            }
        }
    });
};
window.SLStore = SLStore;
