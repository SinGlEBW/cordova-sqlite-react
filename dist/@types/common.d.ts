

export interface returnCommonPropsPromise {
  status: boolean;
  msg: string;
}

// export interface returnGetDataSqliteT extends Partial<Pick<returnCommonPropsPromise, 'msg'>>, Omit<returnCommonPropsPromise, 'msg'>{
export interface returnGetDataSqliteT extends returnCommonPropsPromise{
  values:[] | {}[];
}
export interface returnGetDataSLStoreT extends returnCommonPropsPromise{
  data: {[key: string]: any}
}

export interface SelectWhere{
  sql?: string;
}



export interface Params {
  where?:object;
  whereKey?: {[key:string]: string[] | undefined};
  ignoreWhere?: {[key:string]: string[] | undefined};
  condition?: 'AND' | 'OR';
  stringWhere?:string | undefined;
}

export interface UpdateWhere extends Omit<Params, 'whereKey' | 'ignoreWhere'>{ }

export interface setDataSqliteOptions {
  isCreateDate?: boolean | undefined;
  rewriteTable?: boolean | undefined;
}


export type commonFunctionSqliteT = (connect:SQLitePlugin.Database, nameTable?:string) => Promise<returnCommonPropsPromise & {tables?: string[]}> 
export type getDataSqliteT = (connect:SQLitePlugin.Database, nameTable:string, params:Params) => Promise<returnGetDataSqliteT> 
export type setDataSqliteT = (connect:SQLitePlugin.Database, nameTable:string, payload: object, options?:setDataSqliteOptions) => Promise<returnCommonPropsPromise> 
export type updateDataSqliteT = (connect:SQLitePlugin.Database, nameTable:string, payload: object, {where, condition, stringWhere}: UpdateWhere, isUpdateAt: boolean) => Promise<returnCommonPropsPromise> 
export type remoteDataSqliteT = (connect:SQLitePlugin.Database, nameTable:string, params:Params) => Promise<returnCommonPropsPromise> 

// export type commonFunctionSqliteT = (connect:SQLitePluginInstance, nameTable?:string) => Promise<returnCommonPropsPromise> 
// export type getDataSqliteT = (connect:SQLitePluginInstance, nameTable:string, params:Params) => Promise<returnGetDataSqliteT> 
// export type setDataSqliteT = (connect:SQLitePluginInstance, nameTable:string, payload: object, options?:setDataSqliteOptions) => Promise<returnCommonPropsPromise> 
// export type updateDataSqliteT = (connect:SQLitePluginInstance, nameTable:string, payload: object, {where, condition, stringWhere}: UpdateWhere) => Promise<returnCommonPropsPromise> 
// export type remoteDataSqliteT = (connect:SQLitePluginInstance, nameTable:string, params:Params) => Promise<returnCommonPropsPromise> 

/*#############----------<{ Class Sqlite }>-----------########## */
export type commonMethodSqliteT = (nameTable?:string) => Promise<returnCommonPropsPromise> 
export type getDataT = (nameTable:string, params?:Params) => Promise<returnGetDataSqliteT> 
export type setDataT = (nameTable:string, payload: object, options?:setDataSqliteOptions) => Promise<returnCommonPropsPromise> 
export type updateDataT = (nameTable:string, payload: object, {where, condition, stringWhere}: UpdateWhere) => Promise<returnCommonPropsPromise> 
export type remoteDataT = (nameTable:string, params?:Params) => Promise<returnCommonPropsPromise> 


/*#############----------<{ Class SLStore }>-----------########## */
export interface getItemsI {
  ignoreKeys: string[]
}
// export type commonMethodSqliteT = (nameTable:string) => Promise<returnCommonPropsPromise> 
export type getItemT = (key:string) => Promise<returnGetDataSLStoreT> 
export type getItemsT = (options?:getItemsI) => Promise<returnGetDataSLStoreT> 

export type setItemT = (key:string, value: any, options?:setDataSqliteOptions) => Promise<returnCommonPropsPromise> 
// export type updateDataT = (nameTable:string, payload: object, {where, condition, stringWhere}: UpdateWhere) => Promise<returnCommonPropsPromise> 
export type remoteItemT = ({keys, ignoreKeys}:{keys?:string[], ignoreKeys?:string[]}) => Promise<returnCommonPropsPromise> 
export type dropAllData = () => Promise<returnCommonPropsPromise> 



/*
  INFO: Не забываем переносить файл в ручную в dist/@types
*/
declare global {
  interface Window {
    sqlitePlugin: SQLitePlugin.SQLite;
    cordova:any;
    db:any
  }
}

declare var sqlitePlugin: SQLitePlugin.SQLite;

declare namespace SQLitePlugin {
  type TransactionFunction = (tx: Transaction) => void;

  type SuccessCallback = () => void;
  type DatabaseSuccessCallback = (db: Database) => void;
  type StatementSuccessCallback = (results: Results) => void;
  type TransactionStatementSuccessCallback = (tx: Transaction, results: Results) => void;

  type ErrorCallback = (err: Error) => void;
  type TransactionStatementErrorCallback = (tx: Transaction, err: Error) => boolean | void;

  interface OpenArgs {
      name: string;
      location?: string | undefined;
      iosDatabaseLocation?: string | undefined;
      androidDatabaseImplementation?: number | undefined;
      androidLockWorkaround?: number | undefined;
      createFromLocation?: number | undefined;
      [key: string]: any;
  }
  interface DeleteArgs {
      name: string;
      location?: string | undefined;
      iosDatabaseLocation?: string | undefined;
  }

  interface Results {
      rowsAffected: number;
      insertId?: number | undefined;
      rows: {
          length: number;
          item(i: number): any;
      };
  }

  interface Transaction {
      executeSql(statement: string, params?: any[], success?: TransactionStatementSuccessCallback, error?: TransactionStatementErrorCallback): void;
  }

  interface Database {
      transaction(fn: TransactionFunction, error?: ErrorCallback, success?: SuccessCallback): void;
      readTransaction(fn: TransactionFunction, error?: ErrorCallback, success?: SuccessCallback): void;

      executeSql(statement: string, params?: any[], success?: StatementSuccessCallback, error?: ErrorCallback): void;
      sqlBatch(sqlStatements: Array<string|[string, any[]]>, success?: SuccessCallback, error?: ErrorCallback): void;

      close(success?: SuccessCallback, error?: ErrorCallback): void;
  }

  interface SQLite {
      openDatabase(args: OpenArgs, success?: DatabaseSuccessCallback, error?: ErrorCallback): Database;
      deleteDatabase(args: DeleteArgs, success?: SuccessCallback, error?: ErrorCallback): void;
      selfTest(success?: SuccessCallback, error?: ErrorCallback): void;
      echoTest(ok?: (value: string) => void, error?: (msg: string) => void): void;
  }
}






