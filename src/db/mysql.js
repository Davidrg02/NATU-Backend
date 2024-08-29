const mysql = require('mysql');
const config = require('../config');
const e = require('express');
const { error } = require('../network/response');

const dbconfig = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.name
}

let connection;

function connectionDB(){
    connection = mysql.createConnection(dbconfig);
    connection.connect((err) => {
        if(err){
            console.log('Error connecting to DB:', err);
        }else{
            console.log('Connection to DB established');
        }
    });

    connection.on('error', (err) => {
        console.log('DB error:', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            connectionDB();
        }else{
            throw err;
        }
    });
}

connectionDB();

function all(table){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ??';
        connection.query(query, [table], (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    });
}

function one(table, id, idField) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE ?? = ?';
        connection.query(query, [table, idField, id], (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    });
}


function insert(table, data){
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO ?? SET ?';
        connection.query(query, [table, data], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function update(table, data, id, idField){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE ?? SET ? WHERE ?? = ?';
        connection.query(query, [table, data, idField, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function remove(table, id, idField){
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM ?? WHERE ?? = ?';
        connection.query(query, [table, idField, id], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        });
    });   
}

function query(table, query){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM ?? WHERE ?';
        connection.query(sql, [table, query], (error, data) => {
            return error ? reject(error) : resolve(data[0]);
        });
    });
}

function filter(table, filterValue , FilteredField) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE ?? = ?';
        connection.query(query, [table, FilteredField, filterValue], (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    });
}

function filterMinusOne(table, filterValue , FilteredField, id, idField) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ?? WHERE ?? = ? AND ?? != ?';
        connection.query(query, [table, FilteredField, filterValue, id, idField], (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    });
}

function customQuery(query){
    return new Promise((resolve, reject) => {
        connection.query(query, (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    });
}

function hide(table, id, idField){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE ?? SET Activo = (1 - Activo) WHERE ?? = ?';
        connection.query(query, [table, idField, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function search(table, nameField, name) {
    return new Promise((resolve, reject) => {
        // Utilizamos placeholders para los parámetros de la consulta
        const query = `SELECT * FROM ?? WHERE ?? LIKE ?`;
        const values = [table, nameField, `%${name}%`]; // Los parámetros se pasan como un array

        // connection.query se encarga de escapar los valores correctamente
        connection.query(query, values, (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    });
}

module.exports = {
    all,
    one,
    insert,
    update,
    remove,
    query,
    filter,
    filterMinusOne,
    customQuery,
    hide,
    search
}

