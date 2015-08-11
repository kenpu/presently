var C = require('../constants');
var util = require('../util');

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
    return {
        New: New.bind(store),
        Source: Source.bind(store),
    };
};
