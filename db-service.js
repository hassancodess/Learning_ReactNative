import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

const tableName = 'Products';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'products.db', location: 'default'});
};

export const createTable = async db => {
  const query = `CREATE TABLE IF NOT EXISTS Products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price INTEGER NOT NULL, company TEXT NOT NULL, unit TEXT NOT NULL)`;
  await db.executeSql(query);
  console.log('table created');
};

export const getProducts = async db => {
  try {
    const products = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        products.push(result.rows.item(index));
      }
    });
    return products;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get products !!!');
  }
};

export const saveProduct = async (db, product) => {
  const insertQuery = `INSERT INTO Products(name, price, company, unit) 
  VALUES(${product.name}, ${product.price},${product.company},${product.unit})`;

  return db.executeSql(insertQuery);
};

export const deleteProduct = async (db, id) => {
  const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async db => {
  const query = `drop table ${tableName}`;
  await db.executeSql(query);
};
