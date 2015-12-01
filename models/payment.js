"use strict";
module.exports = function(sequelize, DataTypes) {
    var TediousTypes = require('tedious').TYPES;
    var Payment = sequelize.define('Payment', {
        //DATA_TYPE: 'uniqueidentifier'
        // txnId
        txnId: {
            type: DataTypes.UUID, field: 'UID', unique: true, primaryKey: true
        },
        terminalId: {
            type: DataTypes.STRING, field: 'PaymentTerminal_UID'
        },
        queryId: {
            type: DataTypes.STRING, field: 'Query_ID'
        },
        accountNumber: {
            type: DataTypes.STRING, field: 'SubscriberAccount'
        },

        paySum: {
            type: DataTypes.REAL, field: 'PaySum',
            validate: {
                isNumeric: true
            }
        },
        statusId: {
            type: DataTypes.INTEGER, field: 'Status_ID'
        },
        processDate: {
            type: DataTypes.DATE, field: 'ProcessDT'
        },
        date: {
            type: DataTypes.DATE, field: 'DT'
        },
        receiptNumber: {
            type: DataTypes.STRING(100), field: 'RN'
        },
        receiptDate: {
            type: DataTypes.STRING(100), field: 'ReceiptDate'
        },
        // given by 1C program
        receiptPack: {
            type: DataTypes.STRING, field: 'PackNum'
        },
        // given by elsom
        transactionNumber: {
            type: DataTypes.STRING(30), field: 'ElsomTransactionNum', unique: true
        },
        // given by 1C program for internal use
       /* encryptedTransactionNum: {
            type: TediousTypes.VarBinary, field: 'TransactionNum', unique: true

        },/**/
        description: {
            type: DataTypes.STRING(30), field: 'Description'
        }
    }, {
        tableName: 'TblPayments'
    });
    return Payment;
};

/*

 */