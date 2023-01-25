## The library is under development and is updated and corrected as needed!

###### Create a .env file in the root of the project
```env

  REACT_APP_SQLITE_DB_NAME = 'arm.db'
  REACT_APP_SQLITE_TABLE_SETTINGS = 'Config'  # for using class SLStore
```


```js
    import { SLStore, Sqlite } from 'cordova-sqlite-react';

```

###### return Promise: Example

```js

    Sqlite.openDB()/*default   (nameDbSqlite = (process.env.REACT_APP_SQLITE_DB_NAME as string) || 'default.db')  */
    Sqlite.closeDB()

    Sqlite.checkTable()//All tables.  { status: true, msg: 'Список найденных таблиц', tables }
    Sqlite.checkTable(nameTable)//checks a specific table.  promise -> { msg: "Таблица Test существует", status: true }
    Sqlite.setData(nameTable, payload, options) 
    /* 
      Example payload:
        {key: 'management', value: [{a: 1},{a: 2}]}
      


      options
      {
        isCreateDate: false //no create column createdAt and updateAt. default: true
        rewriteTable: true; //added request `DROP TABLE IF EXISTS ${nameTable}`
      }
    */  

    Sqlite.updateData(nameTable, payload, { where, stringWhere, condition })

    /*
      {
        where: {name: 'Jon', age: 30} // generate WHERE name="Jon" AND age="30"
        condition: "AND" | "OR" //edit WHERE name="Jon" OR age="30"

        stringWhere: "WHERE name='Jon'" // manual setup WHERE
      }
    */


    Sqlite.getData(nameTable, { where, whereKey, ignoreWhere, stringWhere, condition })

    Sqlite.removeData(nameTable, { where, whereKey, ignoreWhere, stringWhere, condition })

    /*
      {
        whereArrKey: {name: ['Jon', "Brain"], age: [25, 30]}}
      }
      'DELETE FROM ${nameTable} WHERE name = "Jon" OR name = "Brain", age = "17" OR age = "20"'
    */

    Sqlite.query(sql)//any sql query
```
  

```js
  
 
    Sqlite.removeData('Test', {where: {key: 'Jon', age: 20}})
    //DELETE FROM Test WHERE key="Jon" OR age="20"

    Sqlite.removeData('Test', {whereKey: {key: ['Jon', 'Brain']} })
    //DELETE FROM Test WHERE key = "Jon" OR key = "Brain"
    Sqlite.removeData('Test', {whereKey: {key: ['Jon', 'Brain']}, ignoreWhere: {key: ['Jon', 'Alex']}, condition: 'AND'})
    //DELETE FROM Test WHERE key != "Jon" AND key = "Brain" AND key != "Alex"

    Sqlite.removeData('Test', {ignoreWhere: {key: ['Jon']} })
    //DELETE FROM Test WHERE key != "Jon"

    Sqlite.removeData('Test')
    //DELETE FROM Test    

    Sqlite.removeData('Test', {stringWhere: "WHERE name = 'Jon' OR name = 'Brain'"})
    //DELETE FROM Test WHERE name = 'Jon' OR name = 'Brain'

    /*---------------------------------------------------------------------------*/

    Sqlite.getData('Test') //SELECT * FROM Test
    /* 
      promise -> {
        msg: "Данные найдены",
        status: true,
        values: (11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      } 
    */
    

    Sqlite.dropTable(nameTable)

```


#### SLStore

The class aims to save data if cordova in sqlite, if web in localStorage. Most of it repeats the functionality of localStorage.

The table contains the "key" and "value" columns


```js

  SLStore.setItem(key, value, options)// options from Sqlite.setData
  SLStore.getItem(key)//->{ msg:string, status:boolean, data: {[key]: any} }


  SLStore.getItems()//->{ data: {profile: {name: 'Jon', id: 1}, isDarkTheme: true}, msg: "Данные найдены", status: true }

  SLStore.getItems({ignoreKeys: ['profile']})//-> { data: {isDarkTheme: true}, msg: "Данные найдены", status: true }
  
  SLStore.removeItem({ignoreKey: ['Jon']})//remove all !== 'Jon'
  SLStore.removeItem({keys: ['Brain']})//remove all === 'Brain'
  SLStore.dropAllData()
  //for cordova: DROP TABLE IF EXISTS REACT_APP_SQLITE_TABLE_SETTINGS, for web localStorage.clear();


```