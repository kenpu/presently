var C = require('../constants');
var util = require('../util');
var Box = require('./box');
var objectAssign = require('object-assign');

function New(o) {
    return objectAssign(Box.New(), {
        T: C("segment"),
    });
}

module.exports = {
    New: New,
};
