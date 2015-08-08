var C = require('../constants');
var util = require('../util');

function New(o) {
    return {
        T: C("section"),
        title: "",
        prelude: "",
        children: [],       // array of segments
    };
}

function Children(section, child) {
    return util.children(section, child, C("segment"));
}

module.exports = {
    New: New,
    Children: Children,
};
