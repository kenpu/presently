var C = require('../constants');
var util = require('../util');
var R = require('../registry');

function New(o) {
    return {
        T: C("variant"),
        source: "",
        uuid: util.uuid(),
    };
}

module.exports = function(store) {
    return R.Model(C("variant"), {
        New: New.bind(store),
    });
}
