var C = require('../constants');
var util = require('../util');
var Box = require('./box');
var objectAssign = require('object-assign');

function New(o) {
    var box = Box(this).New();
    box.T = C("segment");

    return box;
}

module.exports = function(store) {
    return objectAssign({}, Box(store), {
        New: New.bind(store),
    });
};
