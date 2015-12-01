var merge = require('merge');
var xmlStructure = require('../config/xml-structure');
var models = require("./../models");
var Payment = require("./payment-request");

/**
 *
 * @param number
 * @returns {{get: Function}}
 * @constructor
 */
function FindThisTxnRecord(number) {
    this.record = null;
    var that = this;
    var paymentModel = models.Payment;
    paymentModel
        .findAll({
            where: {transactionNumber: number}
        })
        .then(function(record) {
            that.record = record;
            console.log('где транзакционный нормер? ', dataValues.transactionNumber);
        })
        .finally(function() {
            console.log('Init FindThisTxnRecord');
            return that;
        })
    ;
    //console.log('found: ', number, record);
}
FindThisTxnRecord.prototype.get = function() {
    console.log('get FindThisTxnRecord');
    return this.record;
};

/**
 * Обработчик платежей
 *
 * @constructor
 */
var PaymentProcessor = (function(data) {
    this.data = data;
    this.payment = new Payment(data);
    var that = this;
    /*
     1) Этап авторизации платежа
     пробить транзакционный номер платежа по базе
     проверка лицевого счета
     проверка на лимит суммы
     добавление оплаты в таблицу TblPayments
     {BALANCE} вернуть баланс абонента из справочника абонентов
     вернуть имя владельца лиц. счета
     вернуть лиц. счет
     вернуть remote address
     */
    function authorizePayment() {
        var found = new FindThisTxnRecord(that.payment.transactionNumber());
        if (found.get()) {
            console.log("Запись уже существует");
            that.data.response = {
                errorCode: 'duplicate transaction number'
            };
        } else {
            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }

            var uuid = guid().toUpperCase();
            var paymentData = {
                txnId: uuid,
                accountNumber: that.payment.accountNumber(),
                paySum: that.payment.paySum(),
                receiptDate: that.payment.receiptDate(),
                receiptNumber: that.payment.receiptNumber(),
                terminalId: that.payment.terminalId(),
                statusId: 0,
                transactionNumber: that.payment.transactionNumber()
            };
            models.Payment.
                create(paymentData)
                .catch(function(err) {
                })
                .finally(function() {
                    that.next();
                })
            ;
        }


    }
    authorizePayment();

    /*
     2) Этап проведения платежа (подтверждение)
     Найти платеж по транзакционному номеру
     {BALANCE} вернуть баланс из поля записи, которую установила программа 1С
     вернуть лиц. счет
     вернуть имя владельца лиц. счета
     вернуть статус платежа
     вернуть remote address
     */
    function makePayment() {
    }
});

PaymentProcessor.prototype.complete = function(callback) {
    this.next = callback;
};
PaymentProcessor.prototype.response = function() {
    return this.data.response ? this.data.response : this.data.request;
};

module.exports = PaymentProcessor;
//тебе же знакома такая кострукция
function Foo(text) {
    var that = this;
    this.text = text;
    return {
        get: function() {
            return that.text;
        }
    }
}