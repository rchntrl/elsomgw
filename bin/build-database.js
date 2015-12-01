/*
var sql = require('mssql');
var dbConfig = require('../config/db-config').elsom;

sql.connect(dbConfig, function(err) {
    if (err) {
        console.log(err);
        throw err;
    }
    var request = new sql.Request();
    request.stream = true;
    request.query("SELECT * FROM testable");
    request.on('error', function(err) {
        console.log(err);
    });
    request.on('columns', function(row) {
        console.dir(row);
    });
    request.on('row', function(row) {
        console.dir(row);
    });
    request.on('done', function(returnValue) {
        sql.close();
    });
});/**/

var models = require("./../models");
console.log('start to sequelize');
//models.sequelize.sync({force: true});

var number = '21508040001364908';
var paymentModel = models.Payment;
var loadPayment = function() {
    var sync = true;
    var data = null;
    paymentModel
        .findAll({
           //where: {transactionNumber: number}
        })
        .then(function(record) {
            data = record;
        })
        .catch(function(err){
            console.log("Err", err);
        })
        .finally(function() {
            sync = false;
        })
    ;
    while(sync) {require('deasync').sleep(100);}
    for (var key in data) {
        console.log(data[key].dataValues);
    }
};
loadPayment();
process.exit();