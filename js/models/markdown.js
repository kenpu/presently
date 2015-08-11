var html = require('./html');
var Assign = require('object-assign');
var C = require('../constants');

function New(o) {
    return Assign(html(this).New(o), {
        T: C("markdown"),
    });
}

module.exports = function(store) {
    return Assign({}, html(store), {
        New: New.bind(store),
    });
};
