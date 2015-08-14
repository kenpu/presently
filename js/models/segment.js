var C = require('../constants');
var util = require('../util');
var Box = require('./box');
var objectAssign = require('object-assign');
var R = require('../registry');

function New(o) {
    var box = Box(this).New();
    box.T = C("segment");
    box.orient = C("vertical");

    return box;
}

module.exports = function(store) {
    return R.Model("segment", objectAssign({}, Box(store), {
        New: New.bind(store),
    }));
};
