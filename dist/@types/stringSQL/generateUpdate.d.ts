import { UpdateWhere } from './../common';
export declare const generateSQLUpdate: (nameTable: string, payload: any, { where, condition, stringWhere }: UpdateWhere, isUpdateAt: boolean) => {
    arrValuesPayload: any[];
    newSQLUpdate: string;
};
