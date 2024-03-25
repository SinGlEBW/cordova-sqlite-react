import { getDataT, setDataT, remoteDataT, updateDataT, commonMethodSqliteT } from './../common';
export declare class Sqlite {
    private static isCreateDate;
    static openDB: () => import("./../common").SQLitePlugin.Database;
    static closeDB: () => any;
    static query: (sql: any) => Promise<unknown>;
    static checkTable: commonMethodSqliteT;
    static setData: setDataT;
    static updateData: updateDataT;
    static getData: getDataT;
    static removeData: remoteDataT;
    static dropTable: commonMethodSqliteT;
}
