"use strict";
module.exports = function(sequelize, DataTypes) {
    var TediousTypes = require('tedious').TYPES;
    var Subscriber = sequelize.define('Subscriber', {
        accountNumber: {
            type: DataTypes.STRING(100), field: 'SubscriberAccount', unique: true, primaryKey: true,
            validate: {
                isNumeric: true
            }
        },
        accountName: {
            type: DataTypes.STRING(500), field: 'SubscriberName'
        },
        type: {
            type: DataTypes.BOOLEAN, field: 'SubscriberType'
        },
        state: {
            type: DataTypes.BOOLEAN, field: 'SubscriberState'
        },
        phone: {
            type: DataTypes.STRING, field: 'PhoneNumber'
        },
        region: {
            type: DataTypes.STRING, field: 'Region'
        },
        regionCode: {
            type: DataTypes.INTEGER, field: 'ResCode'
        },
        description: {
            type: DataTypes.STRING, field: 'Description'
        },
        balance: {
            type: DataTypes.REAL, field: 'Balance'
        },
        balanceDate: {
            type: DataTypes.DATE, field: 'BalanceDT'
        },
        lastOperationType: {
            type: DataTypes.INTEGER, field: 'type_oper'
        },
        lastPaySum: {
            type: DataTypes.REAL, field: 'summa'
        }
    }, {
        tableName: 'TblSubscribers'
    });
    return Subscriber;
};

/**
s = [
    {
        COLUMN_NAME: 'SubscriberAccount',
        COLUMN_DEFAULT: null,
        IS_NULLABLE: 'NO',
        DATA_TYPE: 'nvarchar',
        CHARACTER_MAXIMUM_LENGTH: 100,
        CHARACTER_OCTET_LENGTH: 200,
    }
    {
        COLUMN_NAME: 'SubscriberName',
        IS_NULLABLE: 'NO',
        DATA_TYPE: 'nvarchar',
        CHARACTER_MAXIMUM_LENGTH: 500,
        CHARACTER_OCTET_LENGTH: 1000,
    }
    {
        TABLE_NAME: 'TblSubscribers',
        COLUMN_NAME: 'Balance',
        COLUMN_DEFAULT: '((0))',
        IS_NULLABLE: 'NO',
        DATA_TYPE: 'money',
    }
    {
        COLUMN_NAME: 'Description',
        IS_NULLABLE: 'NO',
        DATA_TYPE: 'nvarchar',
        CHARACTER_MAXIMUM_LENGTH: 500,
        CHARACTER_OCTET_LENGTH: 1000,
    }
    {
        COLUMN_NAME: 'Region',
        DATA_TYPE: 'nvarchar',
        CHARACTER_MAXIMUM_LENGTH: 500,
        CHARACTER_OCTET_LENGTH: 1000,
    }
    {
        COLUMN_NAME: 'ResCode',
        IS_NULLABLE: 'NO',
        DATA_TYPE: 'tinyint',
    }
    {
        COLUMN_NAME: 'SubscriberType',
        IS_NULLABLE: 'NO',
        DATA_TYPE: 'tinyint',
    }
    {
        COLUMN_NAME: 'SubscriberState',
        COLUMN_DEFAULT: '((0))',
        IS_NULLABLE: 'NO',
        DATA_TYPE: 'tinyint',
    }
    {
        COLUMN_NAME: 'PhoneNumber',
        COLUMN_DEFAULT: '(\'\')',
        IS_NULLABLE: 'NO',
        DATA_TYPE: 'varchar',
        CHARACTER_MAXIMUM_LENGTH: 20,
        CHARACTER_OCTET_LENGTH: 20,
    }
    {
        COLUMN_NAME: 'BalanceDT',
        IS_NULLABLE: 'YES',
        DATA_TYPE: 'datetime',
    }
    {
        COLUMN_NAME: 'type_oper',
        IS_NULLABLE: 'YES',
        DATA_TYPE: 'int',
    }
    {
        COLUMN_NAME: 'summa',
        IS_NULLABLE: 'YES',
        DATA_TYPE: 'money',
    }
];
/**/