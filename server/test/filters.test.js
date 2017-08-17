var chai      = require('chai');
var expect    = require('chai').expect;
var Filter    = require('../helpers/filters.server.helper');

var TestData    = [
    {
        case : 'Testing eq operator',
        filter: [[{dataField: 'price', condition: 'eq', referenceVal: 10}]],
        data : {price: 10},
        result : true
    },
    {
        case : 'Testing eq operator negetive',
        filter: [[{dataField: 'price', condition: 'eq', referenceVal: 10}]],
        data : {price: 9},
        result : false
    }

]



describe('Testing filter conditions', function(){

    TestData.forEach(function (test) {
        it(test.case, function (done) {
            var filter      = new Filter(test.filter);
            result          = filter.apply(test.data);
            expect(result).to.equal(test.result)
            done()
        })
    })
    
})
    