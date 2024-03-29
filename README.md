## The library is under development and is updated and corrected as needed!


```js
    import { SLStore, Sqlite } from 'cordova-sqlite-react';

```

###### return Promise: Example

```js
    
    Sqlite.openDB()
    Sqlite.closeDB()

    Sqlite.checkTable()//All tables.  { status: true, msg: 'Список найденных таблиц', tables }
    Sqlite.checkTable(nameTable)//checks a specific table.  promise -> { msg: "Таблица Test существует", status: true }
    Sqlite.setData(nameTable, payload, options)
    /* 
      Example payload:
        {name: 'Jon', age: 30, value: [{a: 1},{a: 2}] }
      
      options
      {
        isCreateDate: false //no create column createdAt and updateAt. default: true
        rewriteTable: true; //added request `DROP TABLE IF EXISTS ${nameTable}`
      }
    */  

    Sqlite.updateData(nameTable, payload, { where, stringWhere, condition })

    /*

    Example payload: ()
     
      Sqlite.updateData('test', {value: [{a: 4},{a: 2}]}, {where: {name: 'Jon'}})
      OR
      Sqlite.updateData('test', {value: [{a: 4},{a: 2}]}, {stringWhere: "WHERE name='Jon'"})

      {
        where: {name: 'Jon', age: 30} // generate WHERE name="Jon" AND age="30"
        condition: "AND" | "OR" //edit WHERE name="Jon" OR age="30"

        stringWhere: "WHERE name='Jon'" // manual setup WHERE
      }
    */


    Sqlite.getData(nameTable, { where, whereKey, ignoreWhere, stringWhere, condition }, isParse)

    Sqlite.removeData(nameTable, { where, whereKey, ignoreWhere, stringWhere, condition })

    /*
      {
        whereKey: {name: ['Jon', "Brain"], age: [25, 30]}}
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
        values: [
          {
            id: 1,
            key: "listNames",
            createdAt: "2023-02-07 14:03:23",
            updateAt: "2023-02-13 09:59:03",
            value: "[{\"name\":\"Jon\"}, {\"name\":\"Brain\"}]"
          },
           {
            id: 2,
            key: "listCity",
            createdAt: "2023-02-07 14:03:23",
            updateAt: "2023-02-13 09:59:03",
            value: "[{\"city\":\"New York\"}, {\"city\":\"California\"}]"
          },
          ...
        ]
      } 
    */

    Sqlite.getData('Test', {where: {key: 'listNames'}}, true) //SELECT * FROM Test WHERE key = 'listNames'
    /* 
      promise -> {
        msg: "Данные найдены",
        status: true,
        values: [
          {
            id: 1,
            key: "listNames",
            createdAt: "2023-02-07 14:03:23",
            updateAt: "2023-02-13 09:59:03",
            value: [ {name: "Jon"}, {name: "Brain"} ] <-- isParse
          }
        ]
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