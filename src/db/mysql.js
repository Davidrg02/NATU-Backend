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
        connection.query(`SELECT * FROM ${table}`, (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    });
}

function one(table, id, idField) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ${idField} = ${id}`, (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    });
}


function insert(table, data){
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function update(table, data, id, idField){
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE ${idField} = ${id}`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function remove(table, id, idField){
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE ${idField} = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        });
    });
    
}

function query(table, query){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (error, data) => {
            return error ? reject(error) : resolve(data[0]);
        });
    });
}

function filter(table, idCategoria, FilteredField) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ${FilteredField} = ${idCategoria}`, (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    });
}

function customQuery(query){
    return new Promise((resolve, reject) => {
        connection.query(query, (error, data) => {
            return error ? reject(error) : resolve(data);
        });
    }
    );
}


module.exports = {
    all,
    one,
    insert,
    update,
    remove,
    query,
    filter,
    customQuery
}

