import { dropAllData } from './../common.d';
import { setItemT, getItemT, remoteItemT, getItemsT } from './../common';
export declare class SLStore {
    static nameTable: string;
    private static helperTotalData;
    static setNameTableSettings: (nameTable: any) => any;
    static setItem: setItemT;
    static getItem: getItemT;
    static getItems: getItemsT;
    static removeItem: remoteItemT;
    static dropAllData: dropAllData;
}
