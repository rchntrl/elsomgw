var express = require('express');
var router = express.Router();
var PaymentXmlWrapper = require('../lib/payment-xml-wrapper');
var PaymentProcessor = require('../lib/payment-module');
var models = require("./../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Subscriber.findOne()
      .error(function(err){
        res.json(err);
      })
      .then(function(row) {
        res.json(row.dataValues);
      })
  ;
});

router.post('/', function(req, res, next) {
  var xmlWrapper = new PaymentXmlWrapper();
  var paymentRequest = xmlWrapper.parseRequest(req); // парсим xml запрос в удобный для нас объект
  var processor = new PaymentProcessor(paymentRequest); // обработчик платежа
  processor.complete(function() {
      var paymentResponse = xmlWrapper.buildResponse(processor.response()); // ответ обработчика платежа конвертируем в xml
      res.send(paymentResponse); // посылаем ответ
  });

});

router.post('/json-request', function(req, res, next) {
    var xmlWrapper = new PaymentXmlWrapper();
    var paymentRequest = xmlWrapper.parseRequest(req); // парсим xml запрос в удобный для нас объект
    res.json(paymentRequest); // посылаем ответ
});

router.post('/json-response', function(req, res, next) {
    var xmlWrapper = new PaymentXmlWrapper();
    var paymentRequest = xmlWrapper.parseRequest(req); // парсим xml запрос в удобный для нас объект
    var processor = new PaymentProcessor(paymentRequest); // обработчик платежа
    processor.complete(function() {
        var paymentResponse = processor.response();
        res.send(paymentResponse); // посылаем ответ
    });
});

module.exports = router;
