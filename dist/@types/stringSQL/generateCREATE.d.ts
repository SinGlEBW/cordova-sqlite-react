export declare enum E_SQLitePayloadType {
    ID = "INTEGER PRIMARY KEY",
    TEXT = "TEXT NOT NULL",
    INTEGER = "INTEGER NOT NULL",
    createdAt = "datetime default (datetime('now','localtime'))",
    updateAt = "datetime default (datetime('now','localtime'))"
}
export declare const generateSQLCreateTable: (nameTable: string, payload: object, isCreateDate?: boolean) => {
    newSQLCreate: string;
};
