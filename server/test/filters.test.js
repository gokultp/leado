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
    },

    {
        case : 'Testing ne operator',
        filter: [[{dataField: 'price', condition: 'ne', referenceVal: 10}]],
        data : {price: 1},
        result : true
    },
    {
        case : 'Testing ne operator negetive',
        filter: [[{dataField: 'price', condition: 'ne', referenceVal: 10}]],
        data : {price: 10},
        result : false
    },
    {
        case : 'Testing gt operator',
        filter: [[{dataField: 'price', condition: 'gt', referenceVal: 5}]],
        data : {price: 10},
        result : true
    },
    {
        case : 'Testing gt operator negetive',
        filter: [[{dataField: 'price', condition: 'gt', referenceVal: 5}]],
        data : {price: 1},
        result : false
    },



    {
        case : 'Testing gte operator gt',
        filter: [[{dataField: 'price', condition: 'gte', referenceVal: 5}]],
        data : {price: 10},
        result : true
    },
    {
        case : 'Testing gte operator eq',
        filter: [[{dataField: 'price', condition: 'gte', referenceVal: 5}]],
        data : {price: 5},
        result : true
    },
    {
        case : 'Testing gte operator negetive',
        filter: [[{dataField: 'price', condition: 'gte', referenceVal: 5}]],
        data : {price: 3},
        result : false
    },



    {
        case : 'Testing lt operator',
        filter: [[{dataField: 'price', condition: 'lt', referenceVal: 5}]],
        data : {price: 1},
        result : true
    },
    {
        case : 'Testing lt operator negetive',
        filter: [[{dataField: 'price', condition: 'lt', referenceVal: 5}]],
        data : {price: 10},
        result : false
    },


    {
        case : 'Testing lte operator lt',
        filter: [[{dataField: 'price', condition: 'lte', referenceVal: 5}]],
        data : {price: 1},
        result : true
    },
    {
        case : 'Testing lte operator eq',
        filter: [[{dataField: 'price', condition: 'lte', referenceVal: 5}]],
        data : {price: 5},
        result : true
    },
    {
        case : 'Testing lte operator negetive',
        filter: [[{dataField: 'price', condition: 'lte', referenceVal: 5}]],
        data : {price: 10},
        result : false
    },




    {
        case : 'Testing in operator ',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}]],
        data : {item: 'Item1'},
        result : true
    },
    {
        case : 'Testing in operator negetive',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}]],
        data : {item: 'Item'},
        result : false
    },

    {
        case : 'Testing nin operator ',
        filter: [[{dataField: 'item', condition: 'nin', referenceVal: ['Item1', 'Item2', 'Item3']}]],
        data : {item: 'Item'},
        result : true
    },
    {
        case : 'Testing nin operator negetive',
        filter: [[{dataField: 'item', condition: 'nin', referenceVal: ['Item1', 'Item2', 'Item3']}]],
        data : {item: 'Item1'},
        result : false
    },

    {
        case : 'Testing subStrOf operator ',
        filter: [[{dataField: 'item', condition: 'subStrOf', referenceVal: 'Item1'}]],
        data : {item: 'Item'},
        result : true
    },
    {
        case : 'Testing subStrOf operator negetive',
        filter: [[{dataField: 'item', condition: 'subStrOf', referenceVal: 'Item1'}]],
        data : {item: 'asdf'},
        result : false
    },

    {
        case : 'Testing nSubStrOf operator ',
        filter: [[{dataField: 'item', condition: 'nSubStrOf', referenceVal: 'Item1'}]],
        data : {item: 'asdf'},
        result : true
    },
    {
        case : 'Testing nSubStrOf operator negetive',
        filter: [[{dataField: 'item', condition: 'nSubStrOf', referenceVal: 'Item1'}]],
        data : {item: 'Item'},
        result : false
    },

    {
        case : 'Testing And Operation',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}, {dataField: 'price', condition: 'gte', referenceVal: 500}]],
        data : {item: 'Item1', price: 500},
        result : true
    },

    {
        case : 'Testing And Operation negetive 1',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}, {dataField: 'price', condition: 'gte', referenceVal: 500}]],
        data : {item: 'Item', price: 500},
        result : false
    },

    {
        case : 'Testing And Operation negetive 2',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}, {dataField: 'price', condition: 'gte', referenceVal: 500}]],
        data : {item: 'Item1', price: 400},
        result : false
    },

    {
        case : 'Testing And Operation negetive 3',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}, {dataField: 'price', condition: 'gte', referenceVal: 500}]],
        data : {item: 'Item', price: 400},
        result : false
    },

    {
        case : 'Testing Or & And Operations positive 1',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}, {dataField: 'price', condition: 'gte', referenceVal: 500}], [{dataField: 'price', condition: 'gte', referenceVal: 1000}]],
        data : {item: 'Item1', price: 500},
        result : true
    },

    {
        case : 'Testing Or & And Operations positive 2',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}, {dataField: 'price', condition: 'gte', referenceVal: 500}], [{dataField: 'price', condition: 'gte', referenceVal: 1000}]],
        data : {item: 'Item', price: 1000},
        result : true
    },

    {
        case : 'Testing Or & And Operations negetive 1',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}, {dataField: 'price', condition: 'gte', referenceVal: 500}], [{dataField: 'price', condition: 'gte', referenceVal: 1000}]],
        data : {item: 'Item', price: 500},
        result : false
    },

    {
        case : 'Testing Or & And Operations negetive 2',
        filter: [[{dataField: 'item', condition: 'in', referenceVal: ['Item1', 'Item2', 'Item3']}, {dataField: 'price', condition: 'gte', referenceVal: 500}], [{dataField: 'price', condition: 'gte', referenceVal: 1000}]],
        data : {item: 'Item1', price: 400},
        result : false
    },




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
    