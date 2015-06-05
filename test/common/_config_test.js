'use strict';

var
    assert = require("assert")
    , config = require('../../lib/common/_config.js')
;

module.exports = {
    'test$' : function(test) {
        test.expect(1);
        test.ok($, "Objeto $ existe");
        test.done();
    },
    'testJQuery' : function(test) {
        test.expect(1);
        test.ok(jQuery, "Objeto jQuery existe");
        test.done();
    },
    'testMAG' : function(test) {
        test.expect(1);
        test.ok(MAG, "Objeto MAG existe");
        test.done();
    },
    'testMediator' : function(test) {
        test.expect(1);
        test.ok(MAG.mediator, "Objeto MAG.mediator existe");
        test.done();
    }
};
