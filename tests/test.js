var assert = require('assert');
var config = require('./config-debug');
var request = require('supertest');

describe('Routing', function() {
    var url = 'http://localhost:3001';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {
        // In our tests we use the test db
        done();
    });
    // use describe to give a title to your test suite, in this case the tile is "Account"
    // and then specify a function in which we are going to declare all the tests
    // we want to run. Each test starts with the function it() and as a first argument
    // we have to provide a meaningful title for it, whereas as the second argument we
    // specify a function that takes a single parameter, "done", that we will use
    // to specify when our test is completed, and that's what makes easy
    // to perform async test!
    describe('Authorize', function() {
        it('should return error trying to authorize duplicate payment', function (done) {
            var payment = {};
            request(url)
                .post('/')
                .send(payment)
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.should.have.status(400);
                    done();
                })
                .post('/')
                .send(payment)
            ;
        });
    });
});