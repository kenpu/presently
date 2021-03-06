var C = require('../constants');
var util = require('../util');
var R = require('../registry');

function New() {
    return {
        T: C("html"),
        source: "",
    }
}

function Source(markdown, src) {
    return util.getset(markdown, "source", src);
}

module.exports = function(store) {
    return R.Model("html", {
        New: New.bind(store),
        Source: Source.bind(store),
    });
};
