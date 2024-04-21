const db = require('../../db/mysql');

const table = 'MUNICIPIO';
const idField = 'ID_Municipio';
const FilteredField = 'ID_Departamento';

function all() {
    return db.all(table);
}

function one(id) { 
    return db.one(table, id, idField);
}

function insert(data) {
    return db.insert(table, data);
}

function update(id, data) {
    return db.update(table, data, id, idField);
}

function remove(id) {
    return db.remove(table, id, idField);
}

function filter(filterValue) {
    return db.filter(table, filterValue, FilteredField);
}

module.exports = {
    all,
    one,
    insert,
    update,
    remove,
    filter
}
