const mysql = require('mysql');
const { db } = require('../settings.js');

var pool;
module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool = mysql.createPool(db);
      return pool;
    }
};