import { Params } from './../common';
declare type chunkSQLT = 'DELETE FROM' | 'SELECT * FROM';
export declare const createGenerateSqlString: (chunkSQL: chunkSQLT) => (nameTable: string, { where, whereKey, stringWhere, ignoreWhere, condition }: Params) => {
    newSQLString: string;
    arrValuesPayload?: any[];
};
export {};
