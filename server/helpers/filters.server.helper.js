
var Filter    = function (filter) {
    var self        = this;
    self.filter     = filter;
}

// format of filter object is a 2D array
// eg : [[], [], [], []]
// inner array will be array of objects
// eg: [[{}, {}, {}], [{}, {}], [{}]] like this
// it will be evaluated as [[{} and {} and {}] or [{} and {}] or [{}]]
// each object will have one condition and a reference value

Filter.prototype.apply  = function (value) {
    var self    = this;
    var boolFinal = false;

    self.filter.forEach(function(innerArray) {
        var innerVal  = true;
        innerArray.forEach(function (filter) {
            innerVal = innerVal && evalFilter[filter.condition](filter, val);
        });
        boolFinal = boolFinal || innerVal;
    });
    return boolFinal;
}


var evalFilter  = {
    eq : function(filter, val){
        return filter.referenceVal == val;
    },

    gt : function(filter, val){
        return val > filter.referenceVal;
    },

    gte : function(filter, val){
        return val >= filter.referenceVal;
    },

    lt : function(filter, val){
        return val < filter.referenceVal;
    },

    lte : function(filter, val){
        return val <= filter.referenceVal;
    },

    ne : function(filter, val){
        return val != filter.referenceVal;
    },

    in : function(filter, val){
        return filter.referenceVal.indexOf(val) != -1;
    },

    nin : function(filter, val){
        return filter.referenceVal.indexOf(val) == 1;
    },

    subStrOf : in : function(filter, val){
        var regex = new RegExp(val, "i");
        return regex.test(filter.referenceVal)
    },

    nSubStrOf : in : function(filter, val){
        var regex = new RegExp(val, "i");
        return !regex.test(filter.referenceVal)
    },


}