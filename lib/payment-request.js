/**
 * Обеспечивает интерфейс с парсированными данными о платеже
 *
 * @constructor
 */
var Payment = function(data) {
    this.data = data.request;
};
Payment.prototype.isValid = function() {
    return true;
};
Payment.prototype.requestType = function() {
    if (this.data.requestType == 1) {
        return 'authorize';
    } if (this.data.requestType == 2) {
        return 'payment';
    }
    throw 'Invalid request type';
};
Payment.prototype.terminalId = function() {
    return this.data.terminalId;
};
Payment.prototype.accountNumber = function() {
    return this.data.to.accountNumber;
};
Payment.prototype.paySum = function() {
    return this.data.to.amount.tagValue;
};
Payment.prototype.receiptDate = function() {
    return this.data.receipt.datetime;
};
Payment.prototype.receiptNumber = function() {
    return this.data.receipt.receiptNumber;
};
Payment.prototype.transactionNumber = function() {
    return this.data.transactionNumber;
};

module.exports = Payment;