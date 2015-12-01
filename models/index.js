"use strict";

var path      = require("path");
var env       = process.env.NODE_ENV || "mysql";
var config    = require('../config/db-config')[env];
var Sequelize = require("sequelize");
var sequelize = new Sequelize(config.database, config.user, config.password, config);
if (config.dialect == 'mssql') {

}

var list = [
    'payment',
    'subscriber',
    'testable'
];
var db = {};
for (var i = 0; i <= list.length - 1; i++) {
    (function(i) {
        var model = sequelize.import(path.join(__dirname, list[i]));
        db[model.name] = model;
    })(i);
}

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
/**
 * @type {{Payment: object, Subscriber: object}}
 */
module.exports = db;